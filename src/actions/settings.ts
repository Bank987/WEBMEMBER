"use server";

import { updateGang } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";
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
  };

  await updateGang(gang.id, data);
  revalidatePath("/", "layout");
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
    throw new Error(`ต้องสร้างแก๊งมาแล้วอย่างน้อย 3 วันจึงจะสามารถยุบได้ (ปัจจุบัน: ${diffDays} วัน)`);
  }
  
  // Need to import deleteGangInDB and cookies
  const { deleteGangInDB } = await import("@/lib/db");
  await deleteGangInDB(gang.id);
  
  const { cookies } = await import("next/headers");
  (await cookies()).delete("admin_session");
}

export async function saveAnnouncementSettings(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  if (!gang.isVip) throw new Error("VIP Only");
  
  const announcementEnabled = formData.get("announcementEnabled") === "true";
  const announcementMessage = formData.get("announcementMessage") as string;
  
  await updateGang(gang.id, {
    announcementEnabled,
    announcementMessage
  });
  
  revalidatePath("/", "layout");
}
