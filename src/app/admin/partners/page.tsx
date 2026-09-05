import { Users, AlertCircle } from "lucide-react";
import { getAuthenticatedGang } from "@/lib/auth";
import { savePartners } from "@/actions/partners";
import { redirect } from "next/navigation";
import { PartnerSettingsClient } from "@/components/PartnerSettingsClient";
import Link from "next/link";

export default async function PartnersPage() {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");

  const isVip = gang.isVip;

  return (
    <div className="max-w-4xl">
      <div className="border-b border-[#111111] pb-[18px] mb-[36px]">
        <h2 className="text-[28px] font-[900] tracking-[-0.5625px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888888]">
          ระบบพันธมิตร
        </h2>
        <p className="text-[10.5px] text-[#999999] tracking-[3px] uppercase mt-[6px]">
          จัดการพันธมิตรและเครือข่ายของแก๊งคุณ
        </p>
      </div>

      {!isVip ? (
        <div className="bg-[#050505] border border-[#111111] rounded-[18px] p-[36px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#0084ff] blur-[150px] opacity-10 pointer-events-none" />
          <div className="w-[64px] h-[64px] bg-[#111111] rounded-full flex items-center justify-center mb-[24px]">
            <AlertCircle className="w-[32px] h-[32px] text-[#555555]" />
          </div>
          <h3 className="text-[18px] font-[900] text-white tracking-wide mb-[12px]">ฟีเจอร์นี้เฉพาะ VIP เท่านั้น</h3>
          <p className="text-[13px] text-[#888888] max-w-md mx-auto mb-[24px] leading-relaxed">
            อัปเกรดเป็น VIP เพื่อปลดล็อคระบบพันธมิตร เชื่อมโยงแก๊งของคุณกับเครือข่ายอื่นๆ และดึงดูดสมาชิกใหม่ๆ ได้อย่างมีประสิทธิภาพ
          </p>
          <Link href="/admin/vip" className="bg-white text-black px-[24px] py-[12px] rounded-full text-[13px] font-[800] hover:bg-[#dddddd] transition-colors">
            อัปเกรดเป็น VIP
          </Link>
        </div>
      ) : (
        <PartnerSettingsClient 
          initialEnabled={gang.partnersEnabled || false} 
          initialPartners={gang.partners || []} 
          action={savePartners} 
        />
      )}
    </div>
  );
}
