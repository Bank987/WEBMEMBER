import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getGangBySubdomainWithTokenHash, type Gang } from "@/lib/db";
import { cache } from "react";

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
  return { sessionId, value: `${subdomain}.${sessionId}` };
}

function ownerSessionSecret() {
  return process.env.OWNER_SESSION_SECRET || process.env.SUPER_ADMIN_SESSION_SECRET || "development-owner-session-secret";
}

function ownerSessionSignature(subdomain: string, sessionId: string, adminTokenHash: string) {
  return createHmac("sha256", ownerSessionSecret()).update(`${subdomain}.${sessionId}.${adminTokenHash}`).digest("hex");
}

export function createSignedOwnerSession(subdomain: string, adminTokenHash: string) {
  const sessionId = randomBytes(32).toString("hex");
  return `${subdomain}.${sessionId}.${ownerSessionSignature(subdomain, sessionId, adminTokenHash)}`;
}

export const getAuthenticatedGang = cache(async (): Promise<Gang | null> => {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;

  const parts = session.split(".");
  if (parts.length < 2) return null;
  const subdomain = parts[0].toLowerCase();
  const sessionId = parts[1];
  const gang = await getGangBySubdomainWithTokenHash(subdomain);
  if (!gang) return null;

  // New sessions are stateless, signed, and tied to the current admin token hash.
  if (parts.length === 3 && gang.adminTokenHash) {
    const expected = ownerSessionSignature(subdomain, sessionId, gang.adminTokenHash);
    const received = Buffer.from(parts[2]);
    const expectedBuffer = Buffer.from(expected);
    if (received.length === expectedBuffer.length && timingSafeEqual(received, expectedBuffer)) return gang;
  }

  // Temporary compatibility for sessions created before the signed-cookie migration.
  if (parts.length === 2 && gang.adminTokenHash && hashAdminToken(sessionId) === gang.adminTokenHash) return gang;
  if (parts.length === 2 && gang.adminSessionHash && hashAdminToken(sessionId) === gang.adminSessionHash) return gang;
  return null;
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

