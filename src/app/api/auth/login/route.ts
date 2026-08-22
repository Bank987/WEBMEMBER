import { cookies } from "next/headers";
import { getGangBySubdomainWithTokenHash } from "@/lib/db";
import { createSignedOwnerSession, hashAdminToken, SESSION_COOKIE } from "@/lib/auth";
import { checkRateLimit, getRequestIp } from "@/lib/security";

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  if (!checkRateLimit(`owner-login:${ip}`, 8, 10 * 60 * 1000)) return Response.json({ error: "พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 10 นาที" }, { status: 429 });
  const body = (await request.json().catch(() => ({}))) as { subdomain?: string; token?: string };
  const subdomain = body.subdomain?.trim().toLowerCase() ?? "";
  const token = body.token?.trim() ?? "";
  const gang = await getGangBySubdomainWithTokenHash(subdomain);

  if (!gang || !token || hashAdminToken(token) !== gang.adminTokenHash) {
    return Response.json({ error: "ชื่อ slug หรือรหัสลับผู้ดูแลระบบไม่ถูกต้อง" }, { status: 401 });
  }

  const session = createSignedOwnerSession(subdomain, gang.adminTokenHash);
  (await cookies()).set(SESSION_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ subdomain });
}
