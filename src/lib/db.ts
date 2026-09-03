import mongoose from 'mongoose';
import { unstable_cache } from 'next/cache';

export type Role = "FOUNDER" | "LEADER" | "MEMBER";

export interface Gang {
  id: string;
  subdomain: string; // The URL slug e.g. "thunder"
  customDomain?: string; // Optional custom domain e.g. "xxx.com"
  faviconUrl: string;
  youtubeMusicUrl: string;
  musicPlayerStyle?: string;
  announcementEnabled?: boolean;
  announcementMessage?: string;
  buttonText: string;
  buttonImage: string;
  pageTitle: string;
  pageSubtitle: string;
  adminTokenHash?: string;
  adminSessionHash?: string;
  theme?: string;
  backgroundImageUrl?: string;
  membersBackgroundImageUrl?: string;
  textColor?: string;
  fontFamily?: string;
  particleEffect?: string;
  customAccentColor?: string;
  customCursor?: string;
  logoUrl?: string;
  discordUrl?: string;
  facebookUrl?: string;
  entryAnimation?: string;
  buttonShape?: string;
  createdAt?: string;
  creatorIp?: string;
  recoveryPin?: string;
  isVip?: boolean;
  renewedAt?: string;
  renewalNotifiedAt?: string;
  renewalAnnouncementSeen?: boolean;
  seoImageUrl?: string;
  announcementImages?: string[];
  announcementTheme?: string;
}

export interface Member {
  id: string;
  gangId: string; // The Gang this member belongs to
  name: string;
  role: Role;
  avatar: string;
  facebookUrl?: string;
}

export interface SuperAdminGang extends Gang {
  memberCount: number;
  createdAt: string;
}

export type ActivityAction = "member_add" | "member_edit" | "member_delete" | "settings_update" | "announcement_update";

export interface ActivityLog {
  id: string;
  gangId: string;
  action: ActivityAction;
  label: string;
  detail?: string;
  createdAt: string;
}

const MONGODB_URI = process.env.MONGODB_URI;

const gangSchema = new mongoose.Schema({
  subdomain: { type: String, required: true, unique: true },
  customDomain: { type: String, unique: true, sparse: true },
  faviconUrl: { type: String, default: "" },
  youtubeMusicUrl: { type: String, default: "" },
  musicPlayerStyle: { type: String, default: "classic", enum: ["classic", "premium"] },
  announcementEnabled: { type: Boolean, default: false },
  announcementMessage: { type: String, default: "" },
  buttonText: { type: String, default: "ENTER" },
  buttonImage: { type: String, default: "" },
  pageTitle: { type: String, required: true },
  pageSubtitle: { type: String, default: "EST. 2024" },
  adminTokenHash: { type: String, required: true, select: false },
  adminSessionHash: { type: String, select: false },
  theme: { type: String, default: "default" },
  backgroundImageUrl: { type: String, default: "" },
  membersBackgroundImageUrl: { type: String, default: "" },
  textColor: { type: String, default: "" },
  fontFamily: { type: String, default: "sans" },
  particleEffect: { type: String, default: "none" },
  customAccentColor: { type: String, default: "" },
  customCursor: { type: String, default: "default" },
  logoUrl: { type: String, default: "" },
  discordUrl: { type: String, default: "" },
  facebookUrl: { type: String, default: "" },
  entryAnimation: { type: String, default: "fade" },
  buttonShape: { type: String, default: "square" },
  isVip: { type: Boolean, default: false },
  creatorIp: { type: String, default: "" },
  recoveryPin: { type: String, default: "" },
  renewedAt: { type: Date },
  renewalNotifiedAt: { type: Date },
  renewalAnnouncementSeen: { type: Boolean, default: false },
}, { timestamps: true });

const memberSchema = new mongoose.Schema({
  gangId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gang', required: true, index: true },
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ["FOUNDER", "LEADER", "MEMBER"] },
  avatar: { type: String, required: true },
  facebookUrl: { type: String }
}, { timestamps: true });

export const GangModel = mongoose.models.Gang || mongoose.model("Gang", gangSchema);
if (!GangModel.schema.path("buttonShape")) {
  GangModel.schema.add({ buttonShape: { type: String, default: "square" } });
}
if (!GangModel.schema.path("musicPlayerStyle")) {
  GangModel.schema.add({ musicPlayerStyle: { type: String, default: "classic", enum: ["classic", "premium"] } });
}
if (!GangModel.schema.path("theme")) {
  GangModel.schema.add({ theme: { type: String, default: "default" } });
}
if (!GangModel.schema.path("adminSessionHash")) {
  GangModel.schema.add({ adminSessionHash: { type: String, select: false } });
}
if (!GangModel.schema.path("backgroundImageUrl")) {
  if (!GangModel.schema.path("membersBackgroundImageUrl")) { GangModel.schema.add({ membersBackgroundImageUrl: { type: String, default: "" } }); }
  GangModel.schema.add({ 
    backgroundImageUrl: { type: String, default: "" },
  membersBackgroundImageUrl: { type: String, default: "" }, 
    textColor: { type: String, default: "" }, 
    fontFamily: { type: String, default: "sans" },
    particleEffect: { type: String, default: "none" },
    customAccentColor: { type: String, default: "" },
    customCursor: { type: String, default: "default" },
    logoUrl: { type: String, default: "" },
    discordUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
    entryAnimation: { type: String, default: "fade" }
  });
}
if (!GangModel.schema.path("recoveryPin")) {
  GangModel.schema.add({ recoveryPin: { type: String, default: "" } });
}
if (!GangModel.schema.path("isVip")) {
  GangModel.schema.add({ isVip: { type: Boolean, default: false } });
}
if (!GangModel.schema.path("renewedAt")) {
  GangModel.schema.add({ renewedAt: { type: Date }, renewalNotifiedAt: { type: Date } });
}
if (!GangModel.schema.path("renewalAnnouncementSeen")) {
  GangModel.schema.add({ renewalAnnouncementSeen: { type: Boolean, default: false } });
}
if (!GangModel.schema.path("seoImageUrl")) {
  GangModel.schema.add({ seoImageUrl: { type: String, default: "" } });
}
if (!GangModel.schema.path("announcementImages")) {
  GangModel.schema.add({ announcementImages: { type: [String], default: [] } });
}
if (!GangModel.schema.path("announcementTheme")) {
  GangModel.schema.add({ announcementTheme: { type: String, default: "chromium" } });
}

const vipKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  isUsed: { type: Boolean, default: false },
  usedByGangId: { type: mongoose.Schema.Types.ObjectId, ref: "Gang" },
  usedAt: { type: Date }
}, { timestamps: true });

const VipKeyModel = mongoose.models.VipKey || mongoose.model("VipKey", vipKeySchema);

const activityLogSchema = new mongoose.Schema({
  gangId: { type: mongoose.Schema.Types.ObjectId, ref: "Gang", required: true, index: true },
  action: { type: String, required: true },
  label: { type: String, required: true },
  detail: { type: String, default: "" },
}, { timestamps: true });

const ActivityLogModel = mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);

const MemberModel = mongoose.models.Member || mongoose.model("Member", memberSchema);
// Dev hot reload can retain the pre-migration schema where department was required.
const departmentPath = MemberModel.schema.path("department");
if (departmentPath) departmentPath.required(false);

// Cache connection state
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

// Maps
type GangDocument = {
  _id: { toString(): string };
  subdomain: string;
  customDomain?: string;
  faviconUrl?: string;
  youtubeMusicUrl?: string;
  announcementEnabled?: boolean;
  announcementMessage?: string;
  buttonText?: string;
  buttonImage?: string;
  pageTitle: string;
  pageSubtitle?: string;
  adminTokenHash?: string;
  adminSessionHash?: string;
  theme?: string;
  backgroundImageUrl?: string;
  membersBackgroundImageUrl?: string;
  textColor?: string;
  fontFamily?: string;
  particleEffect?: string;
  customAccentColor?: string;
  customCursor?: string;
  logoUrl?: string;
  discordUrl?: string;
  facebookUrl?: string;
  entryAnimation?: string;
  buttonShape?: string;
  recoveryPin?: string;
  isVip?: boolean;
  renewedAt?: Date;
  renewalNotifiedAt?: Date;
  renewalAnnouncementSeen?: boolean;
};

type MemberDocument = {
  _id: { toString(): string };
  gangId: { toString(): string };
  name: string;
  role: Role;
  avatar: string;
  facebookUrl?: string;
};

function mapGang(doc: GangDocument): Gang {
  return {
    id: doc._id.toString(),
    subdomain: doc.subdomain,
    customDomain: doc.customDomain,
    faviconUrl: doc.faviconUrl || "",
    youtubeMusicUrl: doc.youtubeMusicUrl || "",
    musicPlayerStyle: doc.musicPlayerStyle || "classic",
    announcementEnabled: !!doc.announcementEnabled,
    announcementMessage: doc.announcementMessage || "",
    buttonText: doc.buttonText || "ENTER",
    buttonImage: doc.buttonImage || "",
    pageTitle: doc.pageTitle,
    pageSubtitle: doc.pageSubtitle || "EST. 2024",
    theme: doc.theme || "default",
    backgroundImageUrl: doc.backgroundImageUrl || "",
    membersBackgroundImageUrl: doc.membersBackgroundImageUrl || "",
    textColor: doc.textColor || "",
    fontFamily: doc.fontFamily || "sans",
    particleEffect: doc.particleEffect || "none",
    customAccentColor: doc.customAccentColor || "",
    customCursor: doc.customCursor || "default",
    logoUrl: doc.logoUrl || "",
    discordUrl: doc.discordUrl || "",
    facebookUrl: doc.facebookUrl || "",
    entryAnimation: doc.entryAnimation || "fade",
    buttonShape: doc.buttonShape || "square",
    recoveryPin: doc.recoveryPin || "",
    isVip: doc.isVip || false,
    renewedAt: (doc as any).renewedAt instanceof Date ? (doc as any).renewedAt.toISOString() : (doc as any).renewedAt || undefined,
    renewalNotifiedAt: (doc as any).renewalNotifiedAt instanceof Date ? (doc as any).renewalNotifiedAt.toISOString() : (doc as any).renewalNotifiedAt || undefined,
    renewalAnnouncementSeen: doc.renewalAnnouncementSeen || false,
    seoImageUrl: (doc as any).seoImageUrl || "",
    announcementImages: (doc as any).announcementImages || [],
    announcementTheme: (doc as any).announcementTheme || "chromium",
    createdAt: (doc as any).createdAt instanceof Date ? (doc as any).createdAt.toISOString() : (doc as any).createdAt,
  };
}

function mapMember(doc: MemberDocument): Member {
  return {
    id: doc._id.toString(),
    gangId: doc.gangId.toString(),
    name: doc.name,
    role: doc.role,
    avatar: doc.avatar,
    facebookUrl: doc.facebookUrl,
  };
}

// Gang Operations
export async function countRecentGangsByIp(ip: string): Promise<number> {
  if (!ip || ip === "unknown") return 0;
  await connectDB();
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return await GangModel.countDocuments({ 
    creatorIp: ip, 
    createdAt: { $gte: twentyFourHoursAgo } 
  });
}
export const getGangBySubdomain = async (domain: string): Promise<Gang | null> => {
  const fetchCached = unstable_cache(
    async (sd: string) => {
      await connectDB();
      const doc = await GangModel.findOne({ 
        $or: [{ subdomain: sd }, { customDomain: sd }] 
      }).lean();
      if (!doc) return null;
      return mapGang(doc as any);
    },
    [`gang-${domain}`],
    { tags: [`gang-${domain}`], revalidate: 3600 }
  );
  return fetchCached(domain);
}

export async function getGangBySubdomainWithTokenHash(domain: string) {
  await connectDB();
  const doc = await GangModel.findOne({ 
    $or: [{ subdomain: domain }, { customDomain: domain }] 
  }).select("+adminTokenHash").lean();
  if (!doc) return null;
  return { ...mapGang(doc as GangDocument), adminTokenHash: doc.adminTokenHash as string };
}

export async function getGangBySubdomainWithSession(domain: string) {
  await connectDB();
  const doc = await GangModel.findOne({ 
    $or: [{ subdomain: domain }, { customDomain: domain }] 
  }).select("+adminTokenHash +adminSessionHash").lean();
  if (!doc) return null;
  return { ...mapGang(doc as GangDocument), adminTokenHash: doc.adminTokenHash as string, adminSessionHash: doc.adminSessionHash as string | undefined };
}

export async function createGang(data: Partial<Gang>): Promise<Gang> {
  await connectDB();
  const doc = await GangModel.create(data);
  return mapGang(doc);
}

export async function updateGang(id: string, data: Partial<Gang>) {
  await connectDB();
  await GangModel.findByIdAndUpdate(id, data);
}

export async function deleteGangInDB(id: string) {
  await connectDB();
  await GangModel.findByIdAndDelete(id);
  await MemberModel.deleteMany({ gangId: id });
}

export async function getAllGangsForSuperAdmin(): Promise<SuperAdminGang[]> {
  await connectDB();
  const docs = await GangModel.find().sort({ createdAt: -1 }).lean();
  const counts = await MemberModel.aggregate<{ _id: mongoose.Types.ObjectId; count: number }>([
    { $match: { gangId: { $ne: null } } },
    { $group: { _id: "$gangId", count: { $sum: 1 } } },
  ]);
  const countByGang = new Map(
    counts.filter((item) => item._id).map((item) => [item._id.toString(), item.count]),
  );
  return docs.map((doc) => ({
    ...mapGang(doc as GangDocument),
    memberCount: countByGang.get(doc._id.toString()) ?? 0,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : "",
  }));
}

export async function resetGangAdminToken(id: string, adminTokenHash: string) {
  await connectDB();
  const result = await GangModel.findByIdAndUpdate(id, { adminTokenHash, $unset: { adminSessionHash: 1 } });
  return Boolean(result);
}


export async function changeGangSubdomain(id: string, newSubdomain: string) {
  await connectDB();
  const existing = await GangModel.findOne({ subdomain: newSubdomain }).lean();
  if (existing && existing._id.toString() !== id) {
    throw new Error("โดเมนนี้มีผู้ใช้งานแล้ว");
  }
  await GangModel.findByIdAndUpdate(id, { subdomain: newSubdomain });
}

// Member Operations (Now filtered by gangId)
export const getMembersByGang = async (gangId: string): Promise<Member[]> => {
  const fetchCached = unstable_cache(
    async (id: string) => {
      await connectDB();
      const docs = await MemberModel.find({ gangId: id }).lean();
      return docs.map(doc => mapMember(doc as any));
    },
    [`members-${gangId}`],
    { tags: [`members-${gangId}`], revalidate: 3600 }
  );
  return fetchCached(gangId);
}

export async function getMember(id: string): Promise<Member | null> {
  await connectDB();
  const doc = await MemberModel.findById(id).lean();
  if (!doc) return null;
  return mapMember(doc);
}

export async function createMemberInDB(data: Omit<Member, "id">) {
  await connectDB();
  await MemberModel.create(data);
}

export async function updateMemberInDB(id: string, data: Partial<Member>) {
  await connectDB();
  await MemberModel.findByIdAndUpdate(id, data);
}

export async function deleteMemberInDB(id: string) {
  await connectDB();
  await MemberModel.findByIdAndDelete(id);
}





// VIP Operations
export async function generateVipKey(key: string) {
  await connectDB();
  await VipKeyModel.create({ key });
}

export async function getAllVipKeys() {
  await connectDB();
  return await VipKeyModel.find().populate("usedByGangId", "subdomain pageTitle").sort({ createdAt: -1 }).lean();
}

export async function checkVipKey(key: string) {
  await connectDB();
  return await VipKeyModel.findOne({ key, isUsed: false }).lean();
}

export async function redeemVipKey(key: string, gangId: string) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const vipKey = await VipKeyModel.findOneAndUpdate(
      { key, isUsed: false },
      { isUsed: true, usedByGangId: gangId, usedAt: new Date() },
      { session, new: true }
    );
    if (!vipKey) throw new Error("Key invalid or already used");
    await GangModel.findByIdAndUpdate(gangId, { isVip: true }, { session });
    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// Activity Log Operations
export async function logActivity(gangId: string, action: ActivityAction, label: string, detail?: string) {
  try {
    await connectDB();
    await ActivityLogModel.create({ gangId, action, label, detail: detail || "" });
  } catch (err) {
    console.error("Failed to log activity", err);
  }
}

export async function getActivityLogs(gangId: string, limit = 20): Promise<ActivityLog[]> {
  await connectDB();
  const docs = await ActivityLogModel.find({ gangId }).sort({ createdAt: -1 }).limit(limit).lean();
  return docs.map((d: any) => ({
    id: d._id.toString(),
    gangId: d.gangId.toString(),
    action: d.action,
    label: d.label,
    detail: d.detail || "",
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : String(d.createdAt),
  }));
}

export async function renewGang(id: string) {
  await connectDB();
  await GangModel.findByIdAndUpdate(id, {
    renewedAt: new Date(),
    $unset: { renewalNotifiedAt: 1 },
  });
}

export async function markRenewalNotified(id: string) {
  await connectDB();
  await GangModel.findByIdAndUpdate(id, {
    renewalNotifiedAt: new Date(),
  });
}

export async function markRenewalAnnouncementSeen(id: string) {
  await connectDB();
  await GangModel.findByIdAndUpdate(id, {
    renewalAnnouncementSeen: true,
  });
}

