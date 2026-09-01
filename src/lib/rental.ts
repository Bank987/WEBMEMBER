import type { Gang } from "@/lib/db";

export type RentalStatus = "active" | "grace" | "expired";

export interface RentalInfo {
  status: RentalStatus;
  expiresAt: Date;
  graceEndsAt: Date;
  daysRemaining: number;
}

const GRACE_PERIOD_DAYS = 3;

/**
 * Calculate the rental status of a gang.
 * VIP gangs are always "active".
 * Non-VIP gangs get 1 month from creation (or last renewal), then 3 days grace.
 */
export function getRentalStatus(gang: Gang): RentalInfo {
  // VIP gangs never expire
  if (gang.isVip) {
    const far = new Date("2099-12-31");
    return { status: "active", expiresAt: far, graceEndsAt: far, daysRemaining: 99999 };
  }

  const now = new Date();

  // Base date: renewedAt if available, otherwise createdAt
  const baseDate = gang.renewedAt
    ? new Date(gang.renewedAt)
    : gang.createdAt
      ? new Date(gang.createdAt)
      : now;

  // Expiry = base date + 1 month (same day next month)
  const expiresAt = new Date(baseDate);
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  // Grace end = expiry + 3 days
  const graceEndsAt = new Date(expiresAt);
  graceEndsAt.setDate(graceEndsAt.getDate() + GRACE_PERIOD_DAYS);

  // Calculate days remaining until grace period ends
  const msRemaining = graceEndsAt.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

  let status: RentalStatus;
  if (now < expiresAt) {
    status = "active";
  } else if (now < graceEndsAt) {
    status = "grace";
  } else {
    status = "expired";
  }

  return { status, expiresAt, graceEndsAt, daysRemaining };
}
