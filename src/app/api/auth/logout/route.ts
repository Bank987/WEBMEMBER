import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET(request: Request) {
  (await cookies()).delete(SESSION_COOKIE);
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    (await cookies()).set(SESSION_COOKIE, "", { expires: new Date(0), path: "/" });
  }
  return NextResponse.redirect(new URL("/#auth", request.url));
}
