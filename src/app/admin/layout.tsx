import Link from "next/link";
import { Users, LayoutDashboard, Settings, LogOut, Palette } from "lucide-react";
import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");

  return (
    <div className="min-h-screen bg-[#080a0e] text-text-primary flex font-sans">
        {/* Sidebar */}
        <aside className="relative flex w-[280px] shrink-0 flex-col overflow-hidden border-r border-white/10 bg-[#0b0e13]">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-[260px] rounded-full bg-[#1689df]/15 blur-[80px]" />

          <div className="relative z-10 border-b border-white/10 p-7 pb-6">
            <h1 className="flex items-center gap-3 text-[18px] font-[900] tracking-[1px] text-white">
              <span className="grid size-9 place-items-center rounded-2xl bg-[#dceeff] text-[11px] text-[#145b8f] shadow-[0_0_24px_rgba(118,186,255,0.25)]">AP</span>
              ADMIN PANEL
            </h1>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-3"><p className="truncate text-[12px] font-[900] text-white">{gang.pageTitle}</p><p className="mt-1 truncate text-[10px] text-[#75bfff]">{gang.subdomain}.lastname.site</p><span className="mt-3 flex items-center gap-1.5 text-[9px] text-[#7de5a5]"><span className="size-1.5 rounded-full bg-[#4cdb86] shadow-[0_0_8px_#4cdb86]" /> เว็บไซต์ออนไลน์</span></div>
          </div>

          <nav className="relative z-10 flex-1 space-y-2 p-5">
            <p className="px-3 pb-2 text-[9px] font-[900] tracking-[1.8px] text-[#637284]">จัดการเว็บไซต์</p>
            <Link href="/admin" className="group flex items-center gap-3 rounded-2xl border border-[#238ddd]/25 bg-[#238ddd]/10 px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-white transition hover:bg-[#238ddd]/20">
              <LayoutDashboard className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
              ภาพรวมเว็บไซต์
            </Link>
            <Link href="/admin/members" className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#8996a5] transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white">
              <Users className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
              รายชื่อสมาชิก
            </Link>
            <Link href="/admin/settings" className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#8996a5] transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white">
              <Settings className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
              ตั้งค่าเว็บไซต์
            </Link>
            <Link href="/admin/settings#theme" className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#8996a5] transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white">
              <Palette className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
              ธีมเว็บไซต์
            </Link>
          </nav>

          <div className="relative z-10 border-t border-white/10 p-5">
            <Link 
              href="/api/auth/logout" 
              className="group flex items-center justify-center gap-2 rounded-2xl border border-[#ef4444]/20 px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#ef7777] transition hover:border-[#ef4444]/50 hover:bg-[#ef4444]/10"
            >
              <LogOut className="w-[14px] h-[14px] group-hover:-translate-x-1 transition-transform" />
              ออกจากระบบ
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 overflow-auto bg-[#080a0e] p-5 md:p-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
    </div>
  );
}
