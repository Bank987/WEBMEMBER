"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Globe2, Zap, Flame, ShieldCheck, Activity, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { LandingPlatformStats } from "@/lib/db";

// Smooth animated number counter hook
function Counter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView || value === 0) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out expo
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));
      const current = Math.round(start + (end - start) * progress);

      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// Hero Mini Badge Component (Social Proof inside Hero)
export function GangHeroBadge({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,132,255,0.08)] hover:border-[#0084ff]/40 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0084ff] opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#0084ff] shadow-[0_0_10px_#0084ff]" />
        </span>
        <span className="text-[10px] font-[900] tracking-[1.5px] text-[#0084ff] uppercase">LIVE NETWORK</span>
      </div>

      <div className="h-3 w-px bg-white/10" />

      <div className="text-[12px] font-medium text-[#89909b]">
        มีแก๊งเปิดเว็บไซต์แล้ว{" "}
        <span className="font-[900] text-white tracking-wide">
          <Counter value={count} duration={1.2} />+ แก๊ง
        </span>
      </div>
    </motion.div>
  );
}

// Main Stats Showcase Component
export function GangStatsShowcase({ stats }: { stats: LandingPlatformStats }) {
  return (
    <section className="relative px-6 py-20 md:px-10 border-t border-white/5 bg-[#030303]/90 overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0084ff]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#004b99]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-[1380px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[700px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0084ff]/30 bg-black/60 px-4 py-1.5 mb-5 backdrop-blur-md">
            <Activity className="size-3 text-[#0084ff] animate-pulse" />
            <span className="text-[10px] font-[900] tracking-[2px] text-[#0084ff] uppercase">
              สถิติระบบเรียลไทม์ • PLATFORM STATS
            </span>
          </div>

          <h2 className="text-[36px] font-[900] tracking-tight text-white sm:text-[48px] leading-[1.1] mb-4">
            ได้รับความไว้วางใจจากกว่า{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#70b8ff] to-[#0084ff]">
              <Counter value={stats.totalGangs} /> แก๊ง
            </span>
          </h2>

          <p className="text-[14px] sm:text-[16px] text-[#89909b] font-light leading-relaxed max-w-[560px]">
            โครงสร้างระบบ Multi-tenant ระดับโปรดักชัน รองรับการเข้าชมพร้อมกัน จัดการสมาชิก และสร้างหน้าเว็บสำหรับแก๊ง FiveM ทั่วประเทศ
          </p>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Gangs Count (Grand Highlight) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl border border-[#0084ff]/30 bg-[linear-gradient(145deg,rgba(0,132,255,0.08),rgba(0,0,0,0.6)_70%)] p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(0,132,255,0.12)] hover:border-[#0084ff]/60 hover:shadow-[0_0_50px_rgba(0,132,255,0.22)] transition-all duration-500 overflow-hidden"
          >
            {/* HUD Corner Ticks */}
            <div className="absolute top-3 left-3 size-2 border-t border-l border-[#0084ff]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 size-2 border-t border-r border-[#0084ff]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 size-2 border-b border-l border-[#0084ff]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 size-2 border-b border-r border-[#0084ff]/60 pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="size-12 rounded-2xl bg-[#0084ff]/20 border border-[#0084ff]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,132,255,0.3)] group-hover:scale-105 transition-transform">
                <Flame className="size-6 text-[#0084ff]" />
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0084ff]/10 border border-[#0084ff]/30 text-[10px] font-[900] text-[#0084ff] tracking-wider uppercase">
                <span className="size-1.5 rounded-full bg-[#0084ff] animate-ping" />
                ACTIVE GANGS
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[52px] font-[900] text-white tracking-tighter leading-none">
                <Counter value={stats.totalGangs} />
              </span>
              <span className="text-[28px] font-[900] text-[#0084ff] ml-1.5">+</span>
            </div>

            <h3 className="text-[17px] font-[900] text-white tracking-wide mb-2">
              เว็บไซต์แก๊งที่เปิดใช้งาน
            </h3>
            <p className="text-[12px] text-[#89909b] leading-relaxed">
              ครอบคลุมทุกเซิร์ฟเวอร์ พร้อมระบบ Gate และหลังบ้านแยกอิสระ 100%
            </p>
          </motion.div>

          {/* Card 2: Registered Members */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative rounded-3xl border border-white/10 bg-[#070707]/80 p-7 backdrop-blur-xl hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="size-6 text-white/80" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                COMMUNITY
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[52px] font-[900] text-white tracking-tighter leading-none">
                <Counter value={stats.totalMembers} />
              </span>
              <span className="text-[24px] font-[900] text-white/40 ml-1.5">+</span>
            </div>

            <h3 className="text-[17px] font-[900] text-white tracking-wide mb-2">
              สมาชิกที่ถูกลงทะเบียน
            </h3>
            <p className="text-[12px] text-[#89909b] leading-relaxed">
              จัดยศ Founder, Leader, Support พร้อมลิ้งก์โซเชียลและโปรไฟล์
            </p>
          </motion.div>

          {/* Card 3: Instant Subdomains */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-3xl border border-white/10 bg-[#070707]/80 p-7 backdrop-blur-xl hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe2 className="size-6 text-[#00bfff]" />
              </div>
              <span className="text-[10px] font-bold text-[#00bfff] tracking-widest uppercase">
                INSTANT DNS
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[52px] font-[900] text-white tracking-tighter leading-none">
                100%
              </span>
            </div>

            <h3 className="text-[17px] font-[900] text-white tracking-wide mb-2">
              ซับโดเมนเฉพาะแก๊ง
            </h3>
            <p className="text-[12px] text-[#89909b] leading-relaxed">
              สร้างปุ๊บได้ <code className="text-[#0084ff] font-mono text-[11px]">[แก๊ง].lastname.site</code> ทันที ไม่ต้องตั้งค่าเอง
            </p>
          </motion.div>

          {/* Card 4: High Uptime & 3D Audio */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative rounded-3xl border border-white/10 bg-[#070707]/80 p-7 backdrop-blur-xl hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="size-6 text-[#22c55e]" />
              </div>
              <span className="text-[10px] font-bold text-[#22c55e] tracking-widest uppercase">
                SLA UPTIME
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[52px] font-[900] text-white tracking-tighter leading-none">
                99.9%
              </span>
            </div>

            <h3 className="text-[17px] font-[900] text-white tracking-wide mb-2">
              ความเสถียรของระบบ
            </h3>
            <p className="text-[12px] text-[#89909b] leading-relaxed">
              เซิร์ฟเวอร์ความเร็วสูง พร้อมระบบเพลง YouTube 3D และเอฟเฟกต์หิมะ
            </p>
          </motion.div>

        </div>

        {/* Recent Active Gangs Live Pills (Social Proof Stream) */}
        {stats.recentGangs && stats.recentGangs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 shrink-0">
              <Sparkles className="size-4 text-[#0084ff]" />
              <span className="text-[11px] font-[900] text-white tracking-wider uppercase">
                แก๊งล่าสุดที่เปิดใช้งาน:
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 overflow-x-auto">
              {stats.recentGangs.slice(0, 6).map((gang, idx) => (
                <a
                  key={idx}
                  href={`//${gang.subdomain}.lastname.site`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 hover:border-[#0084ff]/50 hover:bg-[#0084ff]/10 transition-all text-[11px] font-bold text-white/90"
                >
                  {gang.faviconUrl ? (
                    <img
                      src={gang.faviconUrl}
                      alt={gang.pageTitle}
                      className="size-4 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="size-1.5 rounded-full bg-[#0084ff]" />
                  )}
                  <span>{gang.pageTitle}</span>
                  <span className="text-[9px] font-mono text-[#0084ff]/80">.{gang.subdomain}</span>
                  <ArrowUpRight className="size-3 text-white/40 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
