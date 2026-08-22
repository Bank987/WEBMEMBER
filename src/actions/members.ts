"use server";

import { createMemberInDB, updateMemberInDB, deleteMemberInDB, Role, getMember } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function createMember(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try { await assertTrustedMutationOrigin(); } catch { return { ok: false, error: "คำขอไม่ปลอดภัย กรุณารีเฟรชหน้าแล้วลองใหม่" }; }
  const gang = await getAuthenticatedGang();
  if (!gang) return { ok: false, error: "เซสชันหมดอายุ" };

  try {
    await createMemberInDB({
      gangId: gang.id,
      name: formData.get("name") as string,
      role: formData.get("role") as Role,
      avatar: formData.get("avatar") as string || "https://i.pravatar.cc/150",
      facebookUrl: formData.get("facebookUrl") as string,
    });
  } catch (error) {
    console.error("Create member failed", error);
    return { ok: false, error: "ไม่สามารถบันทึกสมาชิกได้ กรุณาตรวจสอบข้อมูลแล้วลองใหม่" };
  }
  
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateMember(id: string, formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try { await assertTrustedMutationOrigin(); } catch { return { ok: false, error: "คำขอไม่ปลอดภัย กรุณารีเฟรชหน้าแล้วลองใหม่" }; }
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) return { ok: false, error: !gang ? "เซสชันหมดอายุ" : "ไม่มีสิทธิ์แก้ไขสมาชิกนี้" };
  try {
    await updateMemberInDB(id, {
      name: formData.get("name") as string,
      role: formData.get("role") as Role,
      avatar: formData.get("avatar") as string,
      facebookUrl: formData.get("facebookUrl") as string,
    });
  } catch (error) {
    console.error("Update member failed", error);
    return { ok: false, error: "ไม่สามารถแก้ไขข้อมูลสมาชิกได้ กรุณาลองใหม่" };
  }
  
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteMember(id: string) {
  await assertTrustedMutationOrigin();
  const gang = await getAuthenticatedGang();
  const member = await getMember(id);
  if (!gang || !member || member.gangId !== gang.id) throw new Error("Unauthorized");
  await deleteMemberInDB(id);
  
  revalidatePath("/", "layout");
}
