"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, LayoutDashboard, Settings, LogOut, Palette, Crown, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminSidebar({ gang }: { gang: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/admin", label: "ภาพรวมเว็บไซต์", icon: LayoutDashboard, exact: true },
    { href: "/admin/members", label: "รายชื่อสมาชิก", icon: Users },
    { href: "/admin/settings", label: "ตั้งค่าเว็บไซต์", icon: Settings },
    { href: "/admin/vip", label: "VIP Upgrade", icon: Crown, isVipLink: true },
    { href: "/admin/settings#theme", label: "ปรับแต่งธีม", icon: Palette },
  ];

  const SidebarContent = () => (
    <>
      <div className="pointer-events-none absolute -left-20 -top-20 size-[260px] rounded-full bg-[#1689df]/15 blur-[80px]" />

      <div className="relative z-10 border-b border-white/10 p-7 pb-6">
        <h1 className="flex items-center gap-3 text-[18px] font-[900] tracking-[1px] text-white">
          <span className="grid size-9 place-items-center rounded-2xl bg-[#dceeff] text-[11px] text-[#145b8f] shadow-[0_0_24px_rgba(118,186,255,0.25)]">AP</span>
          ADMIN PANEL
        </h1>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
          <p className="truncate text-[12px] font-[900] text-white">{gang.pageTitle}</p>
          <p className="mt-1 truncate text-[10px] text-[#75bfff]">{gang.subdomain}.lastname.site</p>
          <span className="mt-3 flex items-center gap-1.5 text-[9px] text-[#7de5a5]">
            <span className="size-1.5 rounded-full bg-[#4cdb86] shadow-[0_0_8px_#4cdb86]" /> เว็บไซต์ออนไลน์
          </span>
        </div>
      </div>

      <nav className="relative z-10 flex-1 space-y-2 p-5 overflow-y-auto custom-scrollbar">
        <p className="px-3 pb-2 text-[9px] font-[900] tracking-[1.8px] text-[#637284]">จัดการเว็บไซต์</p>
        
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/admin/settings#theme";
          const Icon = item.icon;
          
          if (item.isVipLink) {
            return (
              <Link key={item.href} href={item.href} className={`group flex items-center gap-3 rounded-2xl border ${isActive ? 'border-[#eab308]/50 bg-[#eab308]/20 text-yellow-400' : 'border-transparent px-4 py-3.5 text-[#eab308] hover:border-[#eab308]/20 hover:bg-[#eab308]/10 hover:text-yellow-400'} px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] transition`}>
                <Icon className="w-[16px] h-[16px] text-[#eab308] group-hover:scale-110 transition-transform" />
                {item.label}
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={`group flex items-center gap-3 rounded-2xl border ${isActive ? 'border-[#238ddd]/25 bg-[#238ddd]/10 text-white' : 'border-transparent text-[#8996a5] hover:border-white/10 hover:bg-white/[0.05] hover:text-white'} px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] transition`}>
              <Icon className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          );
        })}

        {gang.isVip ? (
          <Link href="/admin/announcement" className={`group flex items-center gap-3 rounded-2xl border ${pathname === '/admin/announcement' ? 'border-[#238ddd]/25 bg-[#238ddd]/10 text-white' : 'border-transparent text-[#8996a5] hover:border-white/10 hover:bg-white/[0.05] hover:text-white'} px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] transition`}>
            <Bell className="w-[16px] h-[16px] text-[#0084ff] group-hover:scale-110 transition-transform" />
            ระบบประกาศ
          </Link>
        ) : (
          <div className="group cursor-not-allowed flex items-center gap-3 rounded-2xl border border-[#eab308]/20 bg-[#eab308]/5 px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-yellow-500/50 opacity-70">
            <Bell className="w-[16px] h-[16px] text-yellow-500/50" />
            ระบบประกาศ <Crown className="ml-auto w-3 h-3 text-yellow-500" />
          </div>
        )}

        <div className="pt-2 mt-2 border-t border-white/10">
          <a href={`//${gang.subdomain}.lastname.site`} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#c9d8e5] transition hover:bg-white/10 hover:text-white">
            เปิดหน้าเว็บไซต์
          </a>
        </div>
      </nav>

      <div className="relative z-10 border-t border-white/10 p-5 mt-auto">
        <a 
          href="/api/auth/logout" 
          className="group flex items-center justify-center gap-2 rounded-2xl border border-[#ef4444]/20 px-4 py-3.5 text-[11px] font-[900] tracking-[0.5px] text-[#ef7777] transition hover:border-[#ef4444]/50 hover:bg-[#ef4444]/10"
        >
          <LogOut className="w-[14px] h-[14px] group-hover:-translate-x-1 transition-transform" />
          ออกจากระบบ
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-[60] p-3 rounded-xl bg-[#0b0e13] border border-white/10 text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-hidden border-r border-white/10 bg-[#0b0e13] shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex relative w-[280px] shrink-0 flex-col overflow-hidden border-r border-white/10 bg-[#0b0e13]">
        <SidebarContent />
      </aside>
    </>
  );
}
