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
  };

  await updateGang(gang.id, data);
  revalidatePath("/", "layout");
}
