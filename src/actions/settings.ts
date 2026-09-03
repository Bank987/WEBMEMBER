"use server";

import { updateGang, logActivity } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath, updateTag } from "next/cache";
import { assertTrustedMutationOrigin, sanitizeUrl } from "@/lib/security";

export async function saveSettings(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  const data = {
    faviconUrl: sanitizeUrl(formData.get("faviconUrl") as string),
    youtubeMusicUrl: sanitizeUrl(formData.get("youtubeMusicUrl") as string),
    buttonText: formData.get("buttonText") as string,
    buttonImage: sanitizeUrl(formData.get("buttonImage") as string),
    pageTitle: formData.get("pageTitle") as string,
    pageSubtitle: formData.get("pageSubtitle") as string,
    theme: formData.get("theme") as string || "default",
    backgroundImageUrl: sanitizeUrl(formData.get("backgroundImageUrl") as string),
    membersBackgroundImageUrl: sanitizeUrl(formData.get("membersBackgroundImageUrl") as string),
    seoImageUrl: sanitizeUrl(formData.get("seoImageUrl") as string),
    textColor: formData.get("textColor") as string,
    fontFamily: formData.get("fontFamily") as string || "sans",
    particleEffect: formData.get("particleEffect") as string || "none",
    customAccentColor: formData.get("customAccentColor") as string,
    customCursor: formData.get("customCursor") as string || "default",
    logoUrl: sanitizeUrl(formData.get("logoUrl") as string),
    discordUrl: sanitizeUrl(formData.get("discordUrl") as string),
    facebookUrl: sanitizeUrl(formData.get("facebookUrl") as string),
    entryAnimation: formData.get("entryAnimation") as string || "fade",
    buttonShape: formData.get("buttonShape") as string || "square",
  } as any;

  if (gang.isVip && formData.has("musicPlayerStyle")) {
    data.musicPlayerStyle = formData.get("musicPlayerStyle") as string;
  }

  await updateGang(gang.id, data);
  await logActivity(gang.id, "settings_update", "ตั้งค่าเว็บไซต์");
  const { revalidateTag } = await import("next/cache");
  revalidatePath("/admin", "layout");
  updateTag(`gang-${gang.subdomain}`); if (gang.customDomain) { updateTag(`gang-${gang.customDomain}`); }
}

export async function deleteGangAction() {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  
  if (!gang.createdAt) {
    throw new Error("Cannot determine creation date");
  }
  
  const createdDate = new Date(gang.createdAt);
  const now = new Date();
  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays < 3) {
    throw new Error(`ไม่สามารถลบเว็บไซต์ได้ ต้องมีอายุการใช้งานอย่างน้อย 3 วัน (ปัจจุบัน: ${diffDays} วัน)`);
  }
  
  const { deleteGangInDB } = await import("@/lib/db");
  await deleteGangInDB(gang.id);
  
  updateTag(`gang-${gang.subdomain}`); if (gang.customDomain) { updateTag(`gang-${gang.customDomain}`); }
  updateTag(`members-${gang.id}`);
  
  const { cookies } = await import("next/headers");
  const { SESSION_COOKIE } = await import("@/lib/auth");
  (await cookies()).delete(SESSION_COOKIE);
}

export async function saveAnnouncementSettings(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  if (!gang.isVip) throw new Error("VIP Only");
  
  const announcementEnabled = formData.get("announcementEnabled") === "true";
  const announcementMessage = formData.get("announcementMessage") as string;
  const announcementTheme = formData.get("announcementTheme") as string || "chromium";
  
  // Parse images (newline separated)
  const imagesRaw = formData.get("announcementImages") as string || "";
  const announcementImages = imagesRaw
    .split("\n")
    .map(url => url.trim())
    .filter(url => url.length > 0);
  
  await updateGang(gang.id, {
    announcementEnabled,
    announcementMessage,
    announcementTheme,
    announcementImages
  });
  await logActivity(gang.id, "announcement_update", announcementEnabled ? "เปิดประกาศ" : "ปิดประกาศ");
  
  const { revalidateTag } = await import("next/cache");
  revalidatePath("/admin", "layout");
  updateTag(`gang-${gang.subdomain}`); if (gang.customDomain) { updateTag(`gang-${gang.customDomain}`); }
}

