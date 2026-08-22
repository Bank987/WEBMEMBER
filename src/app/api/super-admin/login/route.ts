import { cookies } from "next/headers";
import { createSuperAdminSession, SUPER_ADMIN_SESSION_COOKIE, verifySuperAdminCredentials } from "@/lib/auth";
import { checkRateLimit, getRequestIp } from "@/lib/security";

export async function POST(request: Request) {
  if (!checkRateLimit(`super-login:${getRequestIp(request)}`, 5, 10 * 60 * 1000)) return Response.json({ error: "พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 10 นาที" }, { status: 429 });
  const body = (await request.json().catch(() => ({}))) as { username?: string; password?: string };
  if (!verifySuperAdminCredentials(body.username?.trim() ?? "", body.password ?? "")) {
    return Response.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }
  (await cookies()).set(SUPER_ADMIN_SESSION_COOKIE, createSuperAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return Response.json({ ok: true });
}
