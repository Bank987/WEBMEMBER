import { NextResponse } from "next/server";
import { isSuperAdminAuthenticated } from "@/lib/auth";
import { updateSuggestionStatus } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await isSuperAdminAuthenticated();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    if (!["NEW", "REVIEWED", "IMPLEMENTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await updateSuggestionStatus(id, status as any);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Failed to update suggestion status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
