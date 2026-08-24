import { isSuperAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function GET(request: Request) {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const pin = url.searchParams.get("pin");
  
  if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    return Response.json({ error: "Invalid PIN format" }, { status: 400 });
  }

  await connectDB();
  const GangModel = mongoose.models.Gang;
  const gangs = await GangModel.find({ recoveryPin: pin }, "subdomain pageTitle createdAt creatorIp").lean();

  return Response.json({ gangs });
}
