import { ShieldCheck } from "lucide-react";
import { isSuperAdminAuthenticated } from "@/lib/auth";
import { getAllGangsForSuperAdmin } from "@/lib/db";
import { SuperAdminDashboard } from "@/components/SuperAdminDashboard";
import { SuperAdminLogin } from "@/components/SuperAdminLogin";

import { getAnnouncement } from "@/actions/announcement";
import { AnnouncementSettings } from "@/components/AnnouncementSettings";

export const dynamic = "force-dynamic";

export default async function SuperAdminPage() {
  const isAuthenticated = await isSuperAdminAuthenticated();
  if (!isAuthenticated) return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#070a0f] px-5"><div className="absolute -left-28 -top-28 size-[460px] rounded-full bg-[#157fd3]/20 blur-[130px]" /><div className="absolute -bottom-40 -right-28 size-[460px] rounded-full bg-[#8b48ba]/15 blur-[140px]" /><SuperAdminLogin /></main>;
  
  const gangs = await getAllGangsForSuperAdmin();
  const announcement = await getAnnouncement();

  return <main className="relative min-h-screen overflow-hidden bg-[#080a0e] px-5 py-8 text-white md:px-10 md:py-12">
    <div className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[#157fd3]/10 blur-[130px]" />
    <div className="pointer-events-none absolute -bottom-60 -left-40 size-[520px] rounded-full bg-[#8b48ba]/10 blur-[140px]" />
    <div className="relative mx-auto max-w-[1240px]">
      <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-[900] tracking-[1.7px] text-[#83c8ff]"><ShieldCheck className="size-4" /> LASTNAME.SITE / SUPER ADMIN</p>
          <h1 className="mt-4 text-[38px] font-[900] leading-[1.05] md:text-[56px]">ศูนย์ควบคุมแก๊ง</h1>
          <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed text-[#9aa7b7]">ดูแลเว็บไซต์ ตรวจสอบสมาชิก และจัดการสิทธิ์เจ้าของแก๊งทุกแห่งจากจุดเดียว</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="rounded-full border border-white/10 bg-transparent px-5 py-3 text-[11px] font-[900] text-[#aeb9c8] transition hover:border-white/20 hover:bg-white/5 hover:text-white">กลับหน้าแรก</a>
          <form action="/api/super-admin/logout" method="post"><button className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-[900] text-[#aeb9c8] transition hover:border-[#ef7777] hover:bg-[#ef4444]/10 hover:text-[#ffabab]">ออกจากระบบ</button></form>
        </div>
      </header>
      
      <AnnouncementSettings initialData={announcement} />
      <SuperAdminDashboard gangs={gangs} />
    </div>
  </main>;
}
