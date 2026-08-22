import { createAdminToken, hashAdminToken, isSuperAdminAuthenticated } from "@/lib/auth";
import { resetGangAdminToken } from "@/lib/db";
import { assertTrustedMutationOrigin } from "@/lib/security";

export async function POST(request: Request) {
  try { await assertTrustedMutationOrigin(); } catch { return Response.json({ error: "คำขอไม่ปลอดภัย" }, { status: 403 }); }
  if (!(await isSuperAdminAuthenticated())) return Response.json({ error: "ไม่มีสิทธิ์เข้าถึง" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { gangId?: string };
  if (!body.gangId) return Response.json({ error: "ไม่พบข้อมูลแก๊ง" }, { status: 400 });
  const token = createAdminToken();
  const updated = await resetGangAdminToken(body.gangId, hashAdminToken(token));
  if (!updated) return Response.json({ error: "ไม่พบข้อมูลแก๊ง" }, { status: 404 });
  return Response.json({ token });
}
