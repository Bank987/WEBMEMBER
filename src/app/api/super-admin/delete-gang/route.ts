import { isSuperAdminAuthenticated } from "@/lib/auth";
import { deleteGangInDB } from "@/lib/db";

export async function POST(request: Request) {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { gangId?: string };
  if (!body.gangId) return Response.json({ error: "Missing gangId" }, { status: 400 });

  try {
    await deleteGangInDB(body.gangId);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Delete gang failed", error);
    return Response.json({ error: "ไม่สามารถลบแก๊งได้" }, { status: 500 });
  }
}
