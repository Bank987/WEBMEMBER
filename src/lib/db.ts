import mongoose from 'mongoose';

export type Role = "FOUNDER" | "LEADER" | "MEMBER";

export interface Gang {
  id: string;
  subdomain: string; // The URL slug e.g. "thunder"
  faviconUrl: string;
  youtubeMusicUrl: string;
  buttonText: string;
  buttonImage: string;
  pageTitle: string;
  pageSubtitle: string;
  adminTokenHash?: string;
  adminSessionHash?: string;
  theme?: string;
  backgroundImageUrl?: string;
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

const MONGODB_URI = process.env.MONGODB_URI;

const gangSchema = new mongoose.Schema({
  subdomain: { type: String, required: true, unique: true },
  faviconUrl: { type: String, default: "" },
  youtubeMusicUrl: { type: String, default: "" },
  buttonText: { type: String, default: "ENTER" },
  buttonImage: { type: String, default: "" },
  pageTitle: { type: String, required: true },
  pageSubtitle: { type: String, default: "EST. 2024" },
  adminTokenHash: { type: String, required: true, select: false },
  adminSessionHash: { type: String, select: false },
  theme: { type: String, default: "default" },
  backgroundImageUrl: { type: String, default: "" },
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
  creatorIp: { type: String, default: "" },
}, { timestamps: true });

const memberSchema = new mongoose.Schema({
  gangId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gang', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ["FOUNDER", "LEADER", "MEMBER"] },
  avatar: { type: String, required: true },
  facebookUrl: { type: String }
}, { timestamps: true });

const GangModel = mongoose.models.Gang || mongoose.model("Gang", gangSchema);
if (!GangModel.schema.path("buttonShape")) {
  GangModel.schema.add({ buttonShape: { type: String, default: "square" } });
}
if (!GangModel.schema.path("theme")) {
  GangModel.schema.add({ theme: { type: String, default: "default" } });
}
if (!GangModel.schema.path("adminSessionHash")) {
  GangModel.schema.add({ adminSessionHash: { type: String, select: false } });
}
if (!GangModel.schema.path("backgroundImageUrl")) {
  GangModel.schema.add({ 
    backgroundImageUrl: { type: String, default: "" }, 
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
const MemberModel = mongoose.models.Member || mongoose.model("Member", memberSchema);
// Dev hot reload can retain the pre-migration schema where department was required.
const departmentPath = MemberModel.schema.path("department");
if (departmentPath) departmentPath.required(false);

// Cache connection state
let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Maps
type GangDocument = {
  _id: { toString(): string };
  subdomain: string;
  faviconUrl?: string;
  youtubeMusicUrl?: string;
  buttonText?: string;
  buttonImage?: string;
  pageTitle: string;
  pageSubtitle?: string;
  adminTokenHash?: string;
  adminSessionHash?: string;
  theme?: string;
  backgroundImageUrl?: string;
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
    faviconUrl: doc.faviconUrl || "",
    youtubeMusicUrl: doc.youtubeMusicUrl || "",
    buttonText: doc.buttonText || "ENTER",
    buttonImage: doc.buttonImage || "",
    pageTitle: doc.pageTitle,
    pageSubtitle: doc.pageSubtitle || "EST. 2024",
    theme: doc.theme || "default",
    backgroundImageUrl: doc.backgroundImageUrl || "",
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
export async function getGangBySubdomain(subdomain: string): Promise<Gang | null> {
  await connectDB();
  const doc = await GangModel.findOne({ subdomain }).lean();
  if (!doc) return null;
  return mapGang(doc);
}

export async function getGangBySubdomainWithTokenHash(subdomain: string) {
  await connectDB();
  const doc = await GangModel.findOne({ subdomain }).select("+adminTokenHash").lean();
  if (!doc) return null;
  return { ...mapGang(doc as GangDocument), adminTokenHash: doc.adminTokenHash as string };
}

export async function getGangBySubdomainWithSession(subdomain: string) {
  await connectDB();
  const doc = await GangModel.findOne({ subdomain }).select("+adminTokenHash +adminSessionHash").lean();
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

// Member Operations (Now filtered by gangId)
export async function getMembersByGang(gangId: string): Promise<Member[]> {
  await connectDB();
  const docs = await MemberModel.find({ gangId }).lean();
  return docs.map(mapMember);
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
