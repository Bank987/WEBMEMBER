import { getGangBySubdomain } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ domain: string }> },
) {
  const { domain } = await params;
  const gang = await getGangBySubdomain(domain);
  if (!gang?.faviconUrl) return new Response(null, { status: 404 });

  try {
    const response = await fetch(gang.faviconUrl, { cache: "no-store" });
    if (!response.ok) return new Response(null, { status: 404 });
    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/png",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
