"use server";

import { updateGang, logActivity } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath, updateTag } from "next/cache";
import { assertTrustedMutationOrigin, sanitizeUrl } from "@/lib/security";

export async function savePartners(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");
  if (!gang.isVip) throw new Error("VIP Only");

  const partnersEnabled = formData.get("partnersEnabled") === "true";

  const partners: { name: string; url: string }[] = [];
  for (let i = 0; i < 5; i++) {
    const pName = formData.get(`partnerName_${i}`) as string;
    const pUrl = formData.get(`partnerUrl_${i}`) as string;
    if (pName && pName.trim() !== "") {
      partners.push({ name: pName.trim(), url: sanitizeUrl(pUrl || "#") });
    }
  }

  await updateGang(gang.id, { partners, partnersEnabled });
  await logActivity(gang.id, "partners_update", "อัพเดทพันธมิตร");
  
  revalidatePath("/admin/partners");
  updateTag(`gang-${gang.subdomain}`);
  if (gang.customDomain) {
    updateTag(`gang-${gang.customDomain}`);
  }
}

