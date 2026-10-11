"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Smooth animated number counter hook
function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
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

// Minimalist, sleek & glowing GANGS ONLINE Badge
export function GangsOnlineBadge({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="group inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-[#050505]/90 border border-[#0084ff]/30 backdrop-blur-2xl shadow-[0_0_25px_rgba(0,132,255,0.18)] hover:border-[#0084ff]/60 hover:shadow-[0_0_35px_rgba(0,132,255,0.3)] transition-all duration-300"
    >
      {/* Live Glowing Radar Pulse */}
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0084ff] opacity-80" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#0084ff] shadow-[0_0_12px_#0084ff]" />
        </span>
        <span className="text-[11px] font-[900] tracking-[2px] text-[#0084ff] uppercase font-mono">
          GANGS ONLINE
        </span>
      </div>

      {/* Divider */}
      <div className="h-3.5 w-px bg-white/10" />

      {/* Counter & Label */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-[18px] font-[900] text-white tracking-tight leading-none group-hover:text-white transition-colors">
          <Counter value={count} />
        </span>
        <span className="text-[11px] font-bold text-[#89909b] uppercase">แก๊ง</span>
      </div>
    </motion.div>
  );
}

// Alias for backwards compatibility
export const GangHeroBadge = GangsOnlineBadge;
