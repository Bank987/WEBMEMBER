"use server";

import { createSuggestion } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitSuggestion(data: { topic: string; description: string; senderName: string; contactInfo?: string }) {
  try {
    if (!data.topic || !data.description || !data.senderName) {
      return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    }

    await createSuggestion(data);
    revalidatePath("/adminsite");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit suggestion:", error);
    return { error: "เกิดข้อผิดพลาดในการส่งข้อเสนอ กรุณาลองใหม่อีกครั้ง" };
  }
}
