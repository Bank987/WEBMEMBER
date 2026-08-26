import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnnouncementForm } from "./AnnouncementForm";
import { Crown } from "lucide-react";

export default async function AnnouncementPage() {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");
  if (!gang.isVip) redirect("/admin/vip");

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-[28px] font-[900] tracking-tight text-white flex items-center gap-3">
          ระบบประกาศ (Announcement)
          <Crown className="w-6 h-6 text-yellow-500" />
        </h2>
        <p className="text-[13px] text-[#888] mt-2 leading-relaxed">
          แสดงข้อความประกาศแจ้งเตือนสมาชิกในหน้าหลัก (Gate) และหน้าสมาชิก (Members) ของแก๊งคุณ
          พร้อมระบบปุ่มปิดประกาศชั่วคราว (1 ชั่วโมง)
        </p>
      </div>

      <AnnouncementForm 
        enabled={!!gang.announcementEnabled} 
        message={gang.announcementMessage || ""} 
      />
    </div>
  );
}
