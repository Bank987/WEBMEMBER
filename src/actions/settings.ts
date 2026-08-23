"use server";

import { updateGang } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function saveSettings(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  const data = {
    faviconUrl: formData.get("faviconUrl") as string,
    youtubeMusicUrl: formData.get("youtubeMusicUrl") as string,
    buttonText: formData.get("buttonText") as string,
    buttonImage: formData.get("buttonImage") as string,
    pageTitle: formData.get("pageTitle") as string,
    pageSubtitle: formData.get("pageSubtitle") as string,
    theme: formData.get("theme") as string || "default",
    backgroundImageUrl: formData.get("backgroundImageUrl") as string,
    textColor: formData.get("textColor") as string,
    fontFamily: formData.get("fontFamily") as string || "sans",
    particleEffect: formData.get("particleEffect") as string || "none",
    customAccentColor: formData.get("customAccentColor") as string,
    customCursor: formData.get("customCursor") as string || "default",
    logoUrl: formData.get("logoUrl") as string,
    discordUrl: formData.get("discordUrl") as string,
    facebookUrl: formData.get("facebookUrl") as string,
    entryAnimation: formData.get("entryAnimation") as string || "fade",
  };

  await updateGang(gang.id, data);
  revalidatePath("/", "layout");
}
