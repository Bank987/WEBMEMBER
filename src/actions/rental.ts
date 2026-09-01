"use server";

import { getAuthenticatedGang } from "@/lib/auth";
import { renewGang, markRenewalNotified, logActivity } from "@/lib/db";
import { getRentalStatus } from "@/lib/rental";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function confirmRenewal(): Promise<{ success: boolean; error?: string }> {
  try {
    await assertTrustedMutationOrigin();
    const gang = await getAuthenticatedGang();
    if (!gang) return { success: false, error: "ไม่ได้เข้าสู่ระบบ" };

    // VIP gangs don't need renewal
    if (gang.isVip) return { success: false, error: "แก๊ง VIP ไม่จำเป็นต้องต่อสัญญา" };

    const rental = getRentalStatus(gang);
    if (rental.status === "active") return { success: false, error: "สัญญายังไม่หมดอายุ" };

    await renewGang(gang.id);
    await logActivity(gang.id, "settings_update", "ต่อสัญญาเช่าเว็บไซต์", `ต่อสัญญาสำเร็จ — ${gang.subdomain}.lastname.site`);

    // Send Discord webhook notification
    try {
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [{
              title: "🔄 ต่อสัญญาเช่าเว็บ",
              description: `**${gang.pageTitle}** (${gang.subdomain}.lastname.site) ได้ต่อสัญญาเช่าเว็บไซต์แล้ว`,
              color: 0x00bfff,
              timestamp: new Date().toISOString(),
            }],
          }),
        });
      }
    } catch {
      // Webhook failure should not block renewal
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "เกิดข้อผิดพลาดในการต่อสัญญา" };
  }
}

export async function dismissRenewalNotification(): Promise<{ success: boolean }> {
  try {
    await assertTrustedMutationOrigin();
    const gang = await getAuthenticatedGang();
    if (!gang) return { success: false };

    await markRenewalNotified(gang.id);
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function dismissRenewalAnnouncement(): Promise<{ success: boolean }> {
  try {
    await assertTrustedMutationOrigin();
    const gang = await getAuthenticatedGang();
    if (!gang) return { success: false };

    const { markRenewalAnnouncementSeen } = await import("@/lib/db");
    await markRenewalAnnouncementSeen(gang.id);
    return { success: true };
  } catch {
    return { success: false };
  }
}
