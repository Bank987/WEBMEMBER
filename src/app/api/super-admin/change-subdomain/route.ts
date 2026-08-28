import { isSuperAdminAuthenticated } from "@/lib/auth";
import { changeGangSubdomain } from "@/lib/db";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function POST(request: Request) {
  try {
    await assertTrustedMutationOrigin();
  } catch {
    return Response.json({ error: "คำขอไม่ปลอดภัย" }, { status: 403 });
  }

  if (!(await isSuperAdminAuthenticated())) {
    return Response.json({ error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { gangId?: string; newSubdomain?: string };
  const { gangId, newSubdomain } = body;

  if (!gangId || !newSubdomain) {
    return Response.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
  }

  const cleanedSubdomain = newSubdomain.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
  
  if (cleanedSubdomain.length < 3 || cleanedSubdomain.length > 32) {
    return Response.json({ error: "ชื่อโดเมนต้องมีความยาว 3-32 ตัวอักษร" }, { status: 400 });
  }

  if (cleanedSubdomain === "www" || cleanedSubdomain === "admin" || cleanedSubdomain === "api") {
    return Response.json({ error: "ไม่อนุญาตให้ใช้ชื่อโดเมนนี้" }, { status: 400 });
  }

  try {
    await changeGangSubdomain(gangId, cleanedSubdomain);
    return Response.json({ success: true, newSubdomain: cleanedSubdomain });
  } catch (error: any) {
    return Response.json({ error: error.message || "เกิดข้อผิดพลาดในการเปลี่ยนโดเมน" }, { status: 500 });
  }
}
