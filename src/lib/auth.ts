import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getGangBySubdomainWithSession, type Gang } from "@/lib/db";

export const SESSION_COOKIE = "gang_session";
export const SUPER_ADMIN_SESSION_COOKIE = "super_admin_session";

export function createAdminToken() {
  return randomBytes(32).toString("hex");
}

export function hashAdminToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function createSessionValue(subdomain: string, token: string) {
  return `${subdomain}.${token}`;
}

export function createOwnerSession(subdomain: string) {
  const sessionId = randomBytes(32).toString("hex");
  return { value: `${subdomain}.${sessionId}`, hash: hashAdminToken(sessionId) };
}

export async function getAuthenticatedGang(): Promise<Gang | null> {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;

  const separator = session.indexOf(".");
  if (separator < 1) return null;

  const subdomain = session.slice(0, separator).toLowerCase();
  const token = session.slice(separator + 1);
  if (!token) return null;

  const gang = await getGangBySubdomainWithSession(subdomain);
  if (!gang || !gang.adminSessionHash || hashAdminToken(token) !== gang.adminSessionHash) return null;
  return gang;
}

function getSuperAdminConfig() {
  const username = process.env.SUPER_ADMIN_USERNAME;
  const password = process.env.SUPER_ADMIN_PASSWORD;
  const secret = process.env.SUPER_ADMIN_SESSION_SECRET;
  if (!username || !password || !secret) throw new Error("Super admin environment variables are not configured.");
  return { username, password, secret };
}

function createSuperAdminSignature(username: string, secret: string) {
  return createHmac("sha256", secret).update(`super-admin:${username}`).digest("hex");
}

export function verifySuperAdminCredentials(username: string, password: string) {
  const config = getSuperAdminConfig();
  return username === config.username && password === config.password;
}

export function createSuperAdminSession() {
  const config = getSuperAdminConfig();
  return `${config.username}.${createSuperAdminSignature(config.username, config.secret)}`;
}

export async function isSuperAdminAuthenticated() {
  const session = (await cookies()).get(SUPER_ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;
  const expected = createSuperAdminSession();
  const received = Buffer.from(session);
  const expectedValue = Buffer.from(expected);
  return received.length === expectedValue.length && timingSafeEqual(received, expectedValue);
}
