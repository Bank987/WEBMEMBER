import { headers } from "next/headers";

type RateEntry = { count: number; resetAt: number };
const attempts = new Map<string, RateEntry>();

export function getRequestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export async function assertTrustedMutationOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") || requestHeaders.get("referer");
  const host = requestHeaders.get("host");
  if (!origin || !host) throw new Error("Invalid request origin");
  const originUrl = new URL(origin).origin;
  const expectedOrigin = `${requestHeaders.get("x-forwarded-proto") || "http"}://${host}`;
  if (originUrl !== expectedOrigin && originUrl !== `https://${host}` && originUrl !== `http://${host}`) throw new Error("Invalid request origin");
}
