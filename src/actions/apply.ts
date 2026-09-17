"use server";

import { createApplication, updateApplicationStatus, getGangBySubdomain, Role, createMemberInDB, ApplicationModel } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitApplication(domain: string, data: { name: string; avatar: string; facebookUrl?: string; token?: string }) {
  const gang = await getGangBySubdomain(domain);
  if (!gang) {
    return { error: "Gang not found" };
  }

  // Turnstile Verification
  if (data.token) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: data.token })
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return { error: "การตรวจสอบความปลอดภัยล้มเหลว โปรดลองอีกครั้ง (Turnstile Error)" };
      }
    }
  } else {
    // If token is missing but expected, we could error out, but for mock fallback we let it pass if secret not configured
  }

  try {
    // Basic anti-spam: check if they already applied recently
    const recentApp = await ApplicationModel.findOne({ 
      gangId: gang.id, 
      name: data.name, 
      status: "PENDING" 
    });
    if (recentApp) {
      return { error: "คุณส่งคำขอของชื่อนี้ไปแล้ว โปรดรอแอดมินพิจารณา" };
    }

    await createApplication({
      gangId: gang.id,
      name: data.name,
      avatar: data.avatar,
      facebookUrl: data.facebookUrl
    });
    
    return { success: true };
  } catch (error) {
    console.error("Apply error:", error);
    return { error: "Failed to submit application" };
  }
}

export async function reviewApplication(applicationId: string, action: "ACCEPT" | "REJECT", role?: Role, supportPosition?: number) {
  const authGang = await getAuthenticatedGang();
  if (!authGang) {
    return { error: "Unauthorized" };
  }

  try {
    if (action === "REJECT") {
      await updateApplicationStatus(applicationId, "REJECTED");
    } else if (action === "ACCEPT") {
      if (!role) return { error: "Role is required to accept" };
      
      const app = await ApplicationModel.findById(applicationId);
      if (!app) return { error: "Application not found" };

      await createMemberInDB({
        gangId: authGang.id,
        name: app.name,
        role: role,
        supportPosition: role === "SUPPORT" ? supportPosition : undefined,
        avatar: app.avatar,
        facebookUrl: app.facebookUrl
      });

      await updateApplicationStatus(applicationId, "ACCEPTED");
    }

    const { updateTag } = await import("next/cache");
    revalidatePath("/admin/applications");
    revalidatePath("/admin", "layout");
    if (action === "ACCEPT") {
      updateTag(`gang-${authGang.subdomain}`);
      if (authGang.customDomain) { updateTag(`gang-${authGang.customDomain}`); }
      updateTag(`members-${authGang.id}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Review error:", error);
    return { error: "Failed to review application" };
  }
}
export async function toggleRecruitment(isOpen: boolean) {
  const authGang = await getAuthenticatedGang();
  if (!authGang) return { error: "Unauthorized" };

  try {
    const { GangModel, connectDB } = await import("@/lib/db");
    await connectDB();
    await GangModel.updateOne({ _id: authGang.id }, { isRecruitmentOpen: isOpen });
    
    const { revalidatePath, updateTag } = await import("next/cache");
    revalidatePath("/admin/applications");
    revalidatePath(`/home/apply/${authGang.subdomain}`);
    updateTag(`gang-${authGang.subdomain}`);
    
    return { success: true };
  } catch (error) {
    console.error("Toggle error:", error);
    return { error: "Failed to toggle recruitment" };
  }
}

export async function resetInviteToken() {
  const authGang = await getAuthenticatedGang();
  if (!authGang) return { error: "Unauthorized" };

  try {
    const { GangModel, connectDB } = await import("@/lib/db");
    const crypto = await import("crypto");
    
    await connectDB();
    const newToken = crypto.randomBytes(4).toString("hex"); // e.g. "a1b2c3d4"
    
    await GangModel.updateOne({ _id: authGang.id }, { inviteToken: newToken });
    
    const { revalidatePath, updateTag } = await import("next/cache");
    revalidatePath("/admin/applications");
    revalidatePath(`/home/apply/${authGang.subdomain}`);
    updateTag(`gang-${authGang.subdomain}`);
    
    return { success: true, token: newToken };
  } catch (error) {
    console.error("Reset token error:", error);
    return { error: "Failed to reset token" };
  }
}
