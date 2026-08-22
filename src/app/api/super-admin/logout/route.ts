import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPER_ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  (await cookies()).set(SUPER_ADMIN_SESSION_COOKIE, "", {
    expires: new Date(0),
    path: "/",
  });
  return NextResponse.redirect(new URL("/adminsite", request.url));
}
