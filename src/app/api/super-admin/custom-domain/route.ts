import { isSuperAdminAuthenticated } from "@/lib/auth";
import { GangModel, connectDB } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { gangId?: string; customDomain?: string };
  if (!body.gangId) return Response.json({ error: "Missing gangId" }, { status: 400 });

  try {
    await connectDB();
    
    // Normalize custom domain (remove http, www, trailing slashes)
    let normalizedDomain = undefined;
    if (body.customDomain && body.customDomain.trim() !== "") {
      normalizedDomain = body.customDomain
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "")
        .toLowerCase()
        .trim();
        
      // Check for uniqueness
      const existing = await GangModel.findOne({ customDomain: normalizedDomain, _id: { $ne: body.gangId } });
      if (existing) {
        return Response.json({ error: "โดเมนนี้ถูกใช้งานโดยแก๊งอื่นแล้ว" }, { status: 400 });
      }
    }

    const gang = await GangModel.findByIdAndUpdate(
      body.gangId, 
      { $set: { customDomain: normalizedDomain } }, // use $set to ensure it's updated, if undefined it might throw? wait. If undefined, we want to $unset it.
    );

    if (!gang) return Response.json({ error: "ไม่พบแก๊งนี้" }, { status: 404 });

    // Actual update logic
    if (normalizedDomain) {
      await GangModel.findByIdAndUpdate(body.gangId, { $set: { customDomain: normalizedDomain } });
    } else {
      await GangModel.findByIdAndUpdate(body.gangId, { $unset: { customDomain: 1 } });
    }

    // Revalidate cache for this gang
    // We must invalidate the original subdomain, and if there's a custom domain, maybe that too?
    revalidateTag(`gang-${gang.subdomain}`, { expire: 0 });
    if (normalizedDomain) revalidateTag(`gang-${normalizedDomain}`, { expire: 0 });
    if (gang.customDomain && gang.customDomain !== normalizedDomain) {
       revalidateTag(`gang-${gang.customDomain}`, { expire: 0 });
    }
    revalidateTag(`members-${body.gangId}`, { expire: 0 });

    return Response.json({ success: true, customDomain: normalizedDomain });
  } catch (error: any) {
    console.error("Set custom domain failed", error);
    return Response.json({ error: error.message || "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
