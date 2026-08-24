"use server";

import { updateGang } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function setupRecoveryPin(pin: string) {
  const gang = await getAuthenticatedGang();
  if (!gang) return { success: false, error: "Unauthorized" };
  
  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    return { success: false, error: "Invalid PIN format" };
  }

  await updateGang(gang.id, { recoveryPin: pin });
  revalidatePath("/", "layout");
  return { success: true };
}
