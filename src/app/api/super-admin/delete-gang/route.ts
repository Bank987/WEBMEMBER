import { isSuperAdminAuthenticated } from "@/lib/auth";
import { deleteGangInDB } from "@/lib/db";

export async function POST(request: Request) {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { gangId?: string };
  if (!body.gangId) return Response.json({ error: "Missing gangId" }, { status: 400 });

  try {
    const { GangModel, connectDB } = await import("@/lib/db");
    await connectDB();
    const gang = await GangModel.findById(body.gangId);
    
    if (gang) {
      await deleteGangInDB(body.gangId);
      
      const { revalidateTag } = await import("next/cache");
      revalidateTag(`gang-${gang.subdomain}`, { expire: 0 });
      revalidateTag(`members-${body.gangId}`, { expire: 0 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete gang failed", error);
    return Response.json({ error: "ไม่สามารถลบแก๊งได้" }, { status: 500 });
  }
}
