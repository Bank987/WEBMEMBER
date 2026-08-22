import { getGangBySubdomain } from "@/lib/db";
import { checkRateLimit, getRequestIp } from "@/lib/security";

const RESERVED_SUBDOMAINS = new Set(["www", "admin", "api", "home"]);
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export async function GET(request: Request) {
  if (!checkRateLimit(`availability:${getRequestIp(request)}`, 60, 60 * 1000)) {
    return Response.json({ available: false, error: "ตรวจสอบบ่อยเกินไป กรุณาลองใหม่ภายหลัง" }, { status: 429 });
  }
  const value = new URL(request.url).searchParams.get("subdomain")?.trim().toLowerCase() ?? "";

  if (!SUBDOMAIN_PATTERN.test(value)) {
    return Response.json(
      { available: false, error: "Use 1-63 lowercase letters, numbers, or hyphens." },
      { status: 400 },
    );
  }

  if (RESERVED_SUBDOMAINS.has(value)) {
    return Response.json({ available: false, reason: "reserved" });
  }

  try {
    const gang = await getGangBySubdomain(value);
    return Response.json({ available: !gang, subdomain: value });
  } catch (error) {
    console.error("Domain availability check failed", error);
    return Response.json(
      { available: false, error: "Availability service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
