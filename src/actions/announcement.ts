"use server";

import { isSuperAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { sanitizeUrl } from "@/lib/security";

const globalConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: false },
  imageUrl: { type: String, default: "" },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
});

const getGlobalConfigModel = () => mongoose.models.GlobalConfig || mongoose.model("GlobalConfig", globalConfigSchema);

export async function getAnnouncement() {
  await connectDB();
  const GlobalConfigModel = getGlobalConfigModel();
  const doc = await GlobalConfigModel.findOne({ key: "MAIN_ANNOUNCEMENT" }).lean();
  if (!doc) {
    return { isActive: false, imageUrl: "", title: "", content: "" };
  }
  return {
    isActive: doc.isActive,
    imageUrl: doc.imageUrl || "",
    title: doc.title || "",
    content: doc.content || "",
  };
}

export async function updateAnnouncement(data: { isActive: boolean; imageUrl: string; title: string; content: string }) {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return { success: false, error: "Unauthorized" };

  const sanitizedData = {
    ...data,
    imageUrl: sanitizeUrl(data.imageUrl),
  };

  await connectDB();
  const GlobalConfigModel = getGlobalConfigModel();
  await GlobalConfigModel.findOneAndUpdate(
    { key: "MAIN_ANNOUNCEMENT" },
    { $set: sanitizedData },
    { upsert: true }
  );

  revalidatePath("/", "layout");
  return { success: true };
}
