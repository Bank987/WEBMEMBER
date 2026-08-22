import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  
  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const target = new URL(url);
    if (target.protocol !== "https:" || target.username || target.password) {
      return new NextResponse("Only public HTTPS images are allowed", { status: 400 });
    }
    const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "metadata.google.internal"]);
    if (blockedHosts.has(target.hostname) || target.hostname.endsWith(".internal") || target.hostname.endsWith(".local")) {
      return new NextResponse("Private image hosts are not allowed", { status: 400 });
    }
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": target.origin + "/",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      }
    });

    if (!res.ok) {
      return new NextResponse("Failed to fetch image", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) {
      return new NextResponse("URL did not return an image", { status: 415 });
    }
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
