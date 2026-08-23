"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { Users, Globe2, Sparkles, LayoutDashboard, Fingerprint, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function GlowingButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-black tracking-widest text-xs uppercase"
      >
        <span className="relative z-10 flex items-center gap-2">
          {text}
          <motion.span 
            className="inline-block"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0084ff] to-[#7a00ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white">
          {text}
          <motion.span 
            className="inline-block"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </Link>
  );
}

export function FloatingHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if(!mounted) return <div className="h-[500px]" />;

  return (
    <div className="relative h-[400px] sm:h-[500px] w-full perspective-[1000px] hidden md:block">
      {/* Center Main Card */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4 shadow-[0_0_50px_rgba(0,132,255,0.15)] z-20"
        initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.8 }}
        animate={{ opacity: 1, rotateY: -10, rotateX: 5, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ y: y1 }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02, transition: { duration: 0.4 } }}
      >
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0084ff] opacity-20 blur-[50px]" />
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 relative z-10">
            <span className="text-[9px] font-[900] tracking-widest text-slate-500 uppercase">System Status</span>
            <span className="flex items-center gap-2 text-[10px] text-[#22c55e] tracking-widest font-bold">
              <span className="size-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_10px_#22c55e]" /> ONLINE
            </span>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="h-8 w-1/3 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-20 w-full rounded-xl bg-gradient-to-br from-[#0084ff]/20 to-transparent border border-[#0084ff]/30 p-4 flex flex-col justify-center">
              <span className="text-[8px] tracking-[0.3em] text-[#0084ff] uppercase font-bold">Roster Count</span>
              <span className="text-3xl font-[900] text-white">42/100</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 1 */}
      <motion.div 
        className="absolute top-10 right-0 w-48 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-4 shadow-2xl z-10"
        initial={{ opacity: 0, x: 50, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{ y: y2 }}
      >
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Globe2 className="size-4 text-[#7a00ff]" />
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Domain</p>
            <p className="text-xs font-bold text-white">neon.site</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 2 */}
      <motion.div 
        className="absolute bottom-10 left-10 w-56 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-4 shadow-2xl z-30"
        initial={{ opacity: 0, x: -50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ 
          opacity: { duration: 1.2, delay: 0.5 },
          x: { duration: 1.2, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
             <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Latest Joined</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-tr from-[#0084ff] to-[#00ffcc] p-[1px]">
              <div className="size-full rounded-full bg-black flex items-center justify-center">
                <Users className="size-3 text-white" />
              </div>
            </div>
            <div className="h-2 w-20 rounded bg-white/10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function BentoGrid() {
  const features = [
    {
      title: "Custom Domain Mapping",
      description: "Claim your territory. Use a personalized subdomain instantly without configuration.",
      icon: <Globe2 className="size-5 text-[#0084ff]" />,
      className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-black to-[#001a33]",
      illustration: <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#0084ff] opacity-10 blur-2xl rounded-full" />
    },
    {
      title: "Member Roster",
      description: "Track hierarchy and roles.",
      icon: <Users className="size-5 text-[#7a00ff]" />,
      className: "md:col-span-1 md:row-span-2 bg-[#050505]",
      illustration: (
        <div className="mt-8 space-y-2">
          {[1,2,3].map(i => (
             <div key={i} className="h-8 rounded-md bg-white/5 border border-white/5 flex items-center px-3 gap-2">
               <div className="size-4 rounded-full bg-white/10" />
               <div className="h-1.5 w-12 rounded-full bg-white/10" />
             </div>
          ))}
        </div>
      )
    },
    {
      title: "Cyber Aesthetics",
      description: "Advanced particles, CRT scanlines, and glowing cursors. Stand out.",
      icon: <Sparkles className="size-5 text-[#00ffcc]" />,
      className: "md:col-span-1 md:row-span-1 bg-[#050505]",
      illustration: <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ffcc0a,transparent)] pointer-events-none" />
    },
    {
      title: "Central Dashboard",
      description: "Manage everything from a sleek, dark-mode command center.",
      icon: <LayoutDashboard className="size-5 text-white" />,
      className: "md:col-span-1 md:row-span-1 bg-white/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[220px]">
      {features.map((feature, i) => (
        <Reveal key={i} delay={i * 0.1} className={feature.className + " group relative rounded-3xl border border-white/10 p-8 overflow-hidden hover:border-white/20 transition-colors"}>
          <div className="relative z-10 flex flex-col h-full">
            <div className="size-10 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-[900] text-white tracking-wide uppercase mb-2 mt-auto">{feature.title}</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">{feature.description}</p>
          </div>
          {feature.illustration}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </Reveal>
      ))}
    </div>
  );
}
