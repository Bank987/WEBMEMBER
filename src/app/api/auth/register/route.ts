import { createGang, getGangBySubdomain, countRecentGangsByIp } from "@/lib/db";
import { createAdminToken, hashAdminToken } from "@/lib/auth";
import { checkRateLimit, getRequestIp, verifyTurnstile } from "@/lib/security";

const RESERVED = new Set(["www", "admin", "api", "home"]);
const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  if (!checkRateLimit(`register:${ip}`, 5, 15 * 60 * 1000)) {
    return Response.json({ error: "คุณทำรายการบ่อยเกินไป กรุณารอ 15 นาที" }, { status: 429 });
  }

  const recentGangsCount = await countRecentGangsByIp(ip);
  if (recentGangsCount >= 3) {
    return Response.json({ error: "คุณสร้างเว็บไซต์ครบ 3 เว็บไซต์แล้วใน 24 ชั่วโมงที่ผ่านมา" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as { pageTitle?: string; subdomain?: string; recoveryPin?: string; cfTurnstileResponse?: string };
  const subdomain = body.subdomain?.trim().toLowerCase() ?? "";
  const pageTitle = body.pageTitle?.trim() ?? "";
  const recoveryPin = body.recoveryPin?.replace(/\D/g, '').slice(0, 6) ?? "";

  const isHuman = await verifyTurnstile(body.cfTurnstileResponse, ip);
  if (!isHuman) {
    return Response.json({ error: "ไม่ผ่านการตรวจสอบ กรุณารีเฟรชแล้วลองใหม่" }, { status: 400 });
  }

  if (!pageTitle || pageTitle.length > 80) {
    return Response.json({ error: "กรุณาระบุชื่อเว็บไซต์ และต้องมีความยาวไม่เกิน 80 ตัวอักษร" }, { status: 400 });
  }
  if (!SLUG_PATTERN.test(subdomain) || RESERVED.has(subdomain)) {
    return Response.json({ error: "ชื่อ slug ไม่ถูกต้อง อนุญาตเฉพาะตัวอักษรภาษาอังกฤษและตัวเลข" }, { status: 400 });
  }
  if (recoveryPin.length !== 6) {
    return Response.json({ error: "กรุณาตั้งค่า Recovery PIN ให้ครบ 6 ตัวเลข" }, { status: 400 });
  }

  const existing = await getGangBySubdomain(subdomain);
  if (existing) return Response.json({ error: "ชื่อ slug นี้ถูกใช้งานไปแล้ว" }, { status: 409 });

  const token = createAdminToken();
  try {
    await createGang({ subdomain, pageTitle, pageSubtitle: "EST. 2026", adminTokenHash: hashAdminToken(token), creatorIp: ip, recoveryPin });
    
    // Send Discord Webhook
    try {
      if (DISCORD_WEBHOOK_URL) await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚀 มีการสร้างแก๊งใหม่!",
              color: 3447003, // Blue color
              fields: [
                { name: "ชื่อแก๊ง", value: pageTitle, inline: true },
                { name: "Slug (URL)", value: subdomain, inline: true },
              ],
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    } catch (whError) {
      console.error("Failed to send webhook for new gang", whError);
    }

    return Response.json({ subdomain, token }, { status: 201 });
  } catch (error) {
    console.error("Gang registration failed", error);
    return Response.json({ error: "ไม่สามารถสร้างเว็บไซต์ได้ ชื่อ slug นี้อาจถูกใช้งานไปแล้ว" }, { status: 409 });
  }
}
