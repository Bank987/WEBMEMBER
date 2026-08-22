"use server";

import { createMemberInDB, updateMemberInDB, deleteMemberInDB, Role, getMember } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function createMember(formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  if (!gang) throw new Error("Unauthorized");

  await createMemberInDB({
    gangId: gang.id,
    name: formData.get("name") as string,
    role: formData.get("role") as Role,
    avatar: formData.get("avatar") as string || "https://i.pravatar.cc/150",
    facebookUrl: formData.get("facebookUrl") as string,
  });
  
  revalidatePath("/", "layout");
}

export async function updateMember(id: string, formData: FormData) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) throw new Error("Unauthorized");
  await updateMemberInDB(id, {
    name: formData.get("name") as string,
    role: formData.get("role") as Role,
    avatar: formData.get("avatar") as string,
    facebookUrl: formData.get("facebookUrl") as string,
  });
  
  revalidatePath("/", "layout");
}

export async function deleteMember(id: string) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) throw new Error("Unauthorized");
  await deleteMemberInDB(id);
  
  revalidatePath("/", "layout");
}
