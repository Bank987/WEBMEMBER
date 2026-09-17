import { getGangBySubdomain } from "@/lib/db";
import { notFound } from "next/navigation";
import { BackgroundMedia } from "@/components/BackgroundMedia";
import { ApplyFormClient } from "./ApplyFormClient";
import { getGangTheme } from "@/lib/themes";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ApplyPage({ params, searchParams }: { params: Promise<{ domain: string }>, searchParams: Promise<{ token?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  
  if (!gang) notFound();

  // Validate Token if gang has one configured
  const hasValidToken = !gang.inviteToken || gang.inviteToken === resolvedSearchParams.token;

  return (
    <div className={`min-h-screen bg-[#050505] flex items-center justify-center p-6 ${getGangTheme(gang.theme).className} selection:bg-[#0084ff]/30`}>
      {gang.backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={gang.backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/80 backdrop-blur-sm" />
        </div>
      )}
      <div className="relative z-10 w-full max-w-md">
        {gang.isRecruitmentOpen === false ? (
          <div className="bg-[#0c1017]/90 border border-white/10 rounded-[32px] p-10 text-center backdrop-blur-2xl shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-white/50" />
            </div>
            <h2 className="text-2xl font-[900] text-white tracking-wide mb-2">ปิดรับสมัครชั่วคราว</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              แก๊ง {gang.pageTitle} ยังไม่เปิดรับสมาชิกใหม่ในขณะนี้<br />โปรดติดตามการเปิดรับสมัครในภายหลัง
            </p>
            <Link href={`//${gang.subdomain}.lastname.site`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl py-3.5 px-6 text-sm font-bold transition-all w-full">
              <ArrowLeft className="w-4 h-4" /> กลับไปหน้าแก๊ง
            </Link>
          </div>
        ) : !hasValidToken ? (
          <div className="bg-[#0c1017]/90 border border-white/10 rounded-[32px] p-10 text-center backdrop-blur-2xl shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-[900] text-white tracking-wide mb-2">ลิงก์ไม่ถูกต้องหรือหมดอายุ</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              คุณไม่มีสิทธิ์เข้าถึงหน้านี้<br />โปรดสแกน QR Code หรือใช้ลิงก์ใหม่จากแอดมิน
            </p>
            <Link href={`//${gang.subdomain}.lastname.site`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl py-3.5 px-6 text-sm font-bold transition-all w-full">
              <ArrowLeft className="w-4 h-4" /> กลับไปหน้าแก๊ง
            </Link>
          </div>
        ) : (
          <ApplyFormClient gangName={gang.pageTitle} domain={gang.subdomain} />
        )}
      </div>
    </div>
  );
}
