"use server";

import { createMemberInDB, updateMemberInDB, deleteMemberInDB, Role, getMember, getMembersByGang, logActivity } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { assertTrustedMutationOrigin, sanitizeUrl } from "@/lib/security";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function createMember(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try { await assertTrustedMutationOrigin(); } catch { return { ok: false, error: "คำขอไม่ถูกต้องหรือหมดอายุ" }; }
  const gang = await getAuthenticatedGang();
  if (!gang) return { ok: false, error: "ไม่พบเซสชัน" };

  try {
    const memberName = formData.get("name") as string;
    await createMemberInDB({
      gangId: gang.id,
      name: memberName,
      role: formData.get("role") as Role,
      avatar: sanitizeUrl(formData.get("avatar") as string) || "https://i.pravatar.cc/150",
      facebookUrl: sanitizeUrl(formData.get("facebookUrl") as string),
    });

    // Send Discord Webhook
    try {
      const members = await getMembersByGang(gang.id);
      const memberCount = members.length;
      const gangName = gang.pageTitle || gang.subdomain;
      
      if (DISCORD_WEBHOOK_URL) await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              color: 3447003,
              fields: [
                { name: "แก๊ง", value: gangName, inline: true },
                { name: "เพิ่มรายชื่อ", value: memberName, inline: true },
                { name: "คนที่", value: memberCount.toString(), inline: true }
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    } catch (whError) {
      console.error("Failed to send webhook", whError);
    }

  } catch (error) {
    console.error("Create member failed", error);
    return { ok: false, error: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่" };
  }
  
  const { revalidateTag } = await import("next/cache");
  revalidatePath("/admin", "layout");
  revalidateTag(`gang-${gang.subdomain}`);
  revalidateTag(`members-${gang.id}`);
  return { ok: true };
}

export async function updateMember(id: string, formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try { await assertTrustedMutationOrigin(); } catch { return { ok: false, error: "คำขอไม่ถูกต้องหรือหมดอายุ" }; }
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) return { ok: false, error: !gang ? "ไม่พบเซสชัน" : "ข้อมูลไม่ถูกต้อง" };
  try {
    await updateMemberInDB(id, {
      name: formData.get("name") as string,
      role: formData.get("role") as Role,
      avatar: sanitizeUrl(formData.get("avatar") as string),
      facebookUrl: sanitizeUrl(formData.get("facebookUrl") as string),
    });
  } catch (error) {
    console.error("Update member failed", error);
    return { ok: false, error: "แก้ไขข้อมูลไม่สำเร็จ กรุณาลองใหม่" };
  }
  
  const { revalidateTag } = await import("next/cache");
  revalidatePath("/admin", "layout");
  revalidateTag(`gang-${gang.subdomain}`);
  revalidateTag(`members-${gang.id}`);
  return { ok: true };
}

export async function deleteMember(id: string) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) throw new Error("Unauthorized");
  await deleteMemberInDB(id);
  
  const { revalidateTag } = await import("next/cache");
  revalidatePath("/admin", "layout");
  revalidateTag(`gang-${gang.subdomain}`);
  revalidateTag(`members-${gang.id}`);
}

