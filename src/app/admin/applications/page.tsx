import { getAuthenticatedGang } from "@/lib/auth";
import { getApplicationsByGang } from "@/lib/db";
import { ApplicationListClient } from "./ApplicationListClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "คำขอเข้าแก๊ง | Admin Panel",
};

export default async function ApplicationsAdminPage() {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");

  const applications = await getApplicationsByGang(gang.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-[900] text-white tracking-wide">คำขอเข้าแก๊ง (Applications)</h1>
        <p className="text-[#888] text-sm mt-1 font-medium">จัดการผู้ที่สแกน QR Code สมัครเข้าแก๊งของคุณ</p>
      </div>
      
      <ApplicationListClient 
        initialApplications={applications} 
        domain={gang.subdomain} 
        logoUrl={gang.logoUrl || gang.faviconUrl || "https://ui-avatars.com/api/?name=" + gang.pageTitle} 
        isRecruitmentOpen={gang.isRecruitmentOpen !== false}
      />
    </div>
  );
}