"use client";

import { CheckCircle2, Globe2, Layers3, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function WebsiteComposer({ name, slug }: { name: string; slug: string }) {
  const safeSlug = slug || "your-gang";
  const title = name || "เว็บไซต์แก๊งของคุณ";
  const mark = safeSlug.slice(0, 2).toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-[#1c3549] bg-[#081018] p-4">
      <div className="absolute right-0 top-0 size-28 rounded-full bg-[#1784d7]/20 blur-[45px]" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-[900] tracking-[1px] text-[#9bcfff]"><Sparkles className="size-3.5" /> กำลังประกอบเว็บไซต์</div>
        <span className="flex items-center gap-1.5 text-[9px] text-[#7fe0a0]"><span className="size-1.5 rounded-full bg-[#44cf78]" /> พร้อมใช้งาน</span>
      </div>
      <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 overflow-hidden rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-[11px]">
        <Globe2 className="size-3.5 shrink-0 text-[#70bdff]" />
        <span className="text-[#b9c8d5]">https://</span>
        <AnimatePresence mode="popLayout" initial={false}><motion.span key={safeSlug} initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="truncate font-[900] text-white flex-shrink">{safeSlug}</motion.span></AnimatePresence>
        <span className="text-[#70bdff]">.lastname.site</span>
      </div>
      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 rounded-xl bg-white/[0.045] p-3">
        <motion.div layout className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#ddecfa] text-[11px] sm:text-[12px] font-[900] text-[#17486e]">{mark}</motion.div>
        <div className="min-w-0 flex flex-col justify-center"><p className="truncate text-[11px] sm:text-[12px] font-[900] text-white">{title}</p><p className="mt-0.5 text-[8px] sm:text-[9px] text-[#8493a1]">หน้าหลักพร้อมรายชื่อสมาชิก</p></div>
        <div className="col-span-2 flex flex-wrap sm:flex-nowrap items-center justify-between border-t border-white/10 pt-3 text-[8.5px] sm:text-[9px] text-[#8999a7] gap-2"><span className="flex items-center gap-1.5"><Layers3 className="size-3 text-[#77bfff]" /> 3 ส่วนพร้อมใช้งาน</span><span className="flex items-center gap-1.5 text-[#8ee8ab]"><CheckCircle2 className="size-3" /> ตั้งค่าได้ภายหลัง</span></div>
      </div>
    </div>
  );
}
