import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET(request: Request) {
  (await cookies()).delete(SESSION_COOKIE);
  return NextResponse.redirect(new URL("/#auth", request.url));
}
