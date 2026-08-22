"use client";

import { Check, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function GangPreview() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[480px] rounded-[32px] border border-white/15 bg-[#10151c]/90 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
      initial={false}
      animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotateY: 2, transition: { duration: 0.25 } }}
      style={{ perspective: "1000px" }}
    >
      <motion.div className="absolute -top-px left-10 right-10 h-px bg-[#0084ff] shadow-[0_0_20px_#0084ff]" animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.2, repeat: Infinity }} />
      <div className="rounded-[24px] border border-white/10 bg-[#0b0d11] p-5">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] font-[900] tracking-[2px] text-[#777]">ตัวอย่างหน้าเว็บไซต์</span>
          <span className="flex items-center gap-1.5 text-[10px] text-[#22c55e]"><motion.span className="size-1.5 rounded-full bg-[#22c55e]" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} /> ONLINE</span>
        </div>
        <motion.div className="rounded-[18px] border border-[#0084ff]/30 bg-[linear-gradient(135deg,rgba(0,132,255,0.16),transparent_60%)] p-5" animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }} transition={{ duration: 9, repeat: Infinity }}>
          <p className="text-[10px] font-[900] tracking-[2px] text-[#78baff]">THUNDER.LOCALHOST</p>
          <p className="mt-8 text-[31px] font-[900] leading-none text-white">THUNDER<br />GANG</p>
          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4 text-[11px] text-[#aaa]"><Users className="size-4 text-[#0084ff]" /> รายชื่อสมาชิก <motion.span className="ml-auto text-white" animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2, repeat: Infinity }}>24</motion.span></div>
        </motion.div>
        <div className="mt-4 grid grid-cols-3 gap-2">{["ผู้ก่อตั้ง", "หัวหน้า", "สมาชิก"].map((item, index) => <motion.div key={item} className="rounded-xl border border-white/10 bg-[#11151b] px-2 py-3 text-center" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 + index * 0.1 }}><p className="text-[16px] font-[900] text-white">{[1, 3, 20][index]}</p><p className="mt-1 text-[8px] text-[#777]">{item}</p></motion.div>)}</div>
      </div>
      <motion.div className="absolute -bottom-5 -left-5 hidden rounded-full border border-[#22c55e]/30 bg-[#07120b] px-4 py-3 text-[10px] font-[900] text-[#8df3af] shadow-xl md:block" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>พร้อมเผยแพร่เว็บไซต์</motion.div>
    </motion.div>
  );
}

export function AnimatedPlanCard({ name, price, features, featured = false }: { name: string; price: string; features: string[]; featured?: boolean }) {
  return <motion.div whileHover={{ y: -8, transition: { duration: 0.22 } }} className={`relative flex min-h-[360px] flex-col border p-7 md:p-9 ${featured ? "border-[#0084ff]/50 bg-[linear-gradient(145deg,rgba(0,132,255,0.13),#080808_45%)] shadow-[0_0_50px_rgba(0,132,255,0.12)]" : "border-white/10 bg-[#0a0a0a]"}`}>
    {featured && <div className="absolute right-6 top-6 flex items-center gap-1.5 bg-[#0084ff] px-3 py-1.5 text-[9px] font-[900] tracking-[1px] text-white"><Sparkles className="size-3" /> แนะนำ</div>}
    <p className={`text-[12px] font-[900] tracking-[1.5px] ${featured ? "text-[#76baff]" : "text-[#888]"}`}>{name}</p>
    <div className="mt-5 flex items-baseline gap-2"><span className="text-[48px] font-[900] text-white">{price}</span>{featured && <span className="text-[12px] text-[#777]">/ เดือน</span>}</div>
    <div className="mt-8 space-y-4 border-t border-white/10 pt-7">{features.map((feature) => <div key={feature} className="flex items-center gap-3 text-[13px] text-[#c8c8c8]"><Check className={`size-4 ${featured ? "text-[#0084ff]" : "text-[#22c55e]"}`} />{feature}</div>)}</div>
    <a href="#auth" className={`mt-auto flex items-center justify-center gap-2 border py-3 text-[11px] font-[900] tracking-[1px] transition-colors ${featured ? "border-[#0084ff] bg-[#0084ff] text-white hover:bg-[#187fdf]" : "border-white/15 text-white hover:border-white hover:bg-white/5"}`}>เริ่มใช้งาน</a>
  </motion.div>;
}
