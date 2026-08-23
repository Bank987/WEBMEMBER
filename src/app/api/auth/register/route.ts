import { createGang, getGangBySubdomain } from "@/lib/db";
import { createAdminToken, hashAdminToken } from "@/lib/auth";
import { checkRateLimit, getRequestIp, verifyTurnstile } from "@/lib/security";

const RESERVED = new Set(["www", "admin", "api", "home"]);
const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  if (!checkRateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
    return Response.json({ error: "สมัครบ่อยเกินไป กรุณารอ 15 นาที" }, { status: 429 });
  }
  const body = (await request.json().catch(() => ({}))) as { pageTitle?: string; subdomain?: string; cfTurnstileResponse?: string };
  const subdomain = body.subdomain?.trim().toLowerCase() ?? "";
  const pageTitle = body.pageTitle?.trim() ?? "";

  const isHuman = await verifyTurnstile(body.cfTurnstileResponse, ip);
  if (!isHuman) {
    return Response.json({ error: "ไม่ผ่านการตรวจสอบบอท กรุณาลองใหม่อีกครั้ง" }, { status: 400 });
  }

  if (!pageTitle || pageTitle.length > 80) {
    return Response.json({ error: "กรุณาระบุชื่อเว็บไซต์ และต้องมีความยาวไม่เกิน 80 ตัวอักษร" }, { status: 400 });
  }
  if (!SLUG_PATTERN.test(subdomain) || RESERVED.has(subdomain)) {
    return Response.json({ error: "ชื่อ slug นี้ไม่ถูกต้องหรือเป็นชื่อที่สงวนไว้" }, { status: 400 });
  }

  const existing = await getGangBySubdomain(subdomain);
  if (existing) return Response.json({ error: "ชื่อ slug นี้ถูกใช้งานแล้ว" }, { status: 409 });

  const token = createAdminToken();
  try {
    await createGang({ subdomain, pageTitle, pageSubtitle: "EST. 2026", adminTokenHash: hashAdminToken(token) });
    return Response.json({ subdomain, token }, { status: 201 });
  } catch (error) {
    console.error("Gang registration failed", error);
    return Response.json({ error: "ไม่สามารถสร้างเว็บไซต์ได้ ชื่อ slug นี้อาจเพิ่งถูกใช้งาน" }, { status: 409 });
  }
}
