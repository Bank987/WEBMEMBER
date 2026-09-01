import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  // รหัสผ่านง่ายๆ เพื่อป้องกันไม่ให้คนอื่นสุ่มกด
  if (token !== "reset123") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ล้าง Cache ทั้งหมดของเว็บไซต์
  revalidatePath("/", "layout");
  
  return Response.json({ 
    success: true, 
    message: "ล้างความจำ (Cache) ของระบบทั้งหมดเรียบร้อยแล้ว! เว็บผีหายไปแล้วครับ" 
  });
}
