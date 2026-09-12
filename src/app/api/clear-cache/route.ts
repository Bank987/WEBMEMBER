import { revalidatePath } from "next/cache";
import { isSuperAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ล้าง Cache ทั้งหมดของเว็บไซต์
  revalidatePath("/", "layout");
  
  return Response.json({ 
    success: true, 
    message: "ล้างความจำ (Cache) ของระบบทั้งหมดเรียบร้อยแล้ว!" 
  });
}
