"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Smooth animated number counter hook
function Counter({ value, duration = 1.4 }: { value: number; duration?: number }) {
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

// Clean & Distinct GANGS ONLINE Badge positioned right on top of Auth Box
export function GangsOnlineBadge({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#06080c]/90 border border-[#0084ff]/35 backdrop-blur-xl shadow-[0_0_25px_rgba(0,132,255,0.15)] hover:border-[#0084ff]/60 transition-all duration-300"
    >
      {/* Live Glowing Radar Pulse */}
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0084ff] opacity-80" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#0084ff] shadow-[0_0_10px_#0084ff]" />
        </span>
        <span className="text-[11px] font-[900] tracking-[2px] text-[#0084ff] uppercase font-mono">
          GANGS ONLINE
        </span>
      </div>

      {/* Subtle Divider */}
      <div className="h-3.5 w-px bg-white/10" />

      {/* Counter & Label */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-[17px] font-[900] text-white tracking-tight leading-none">
          <Counter value={count} />
        </span>
        <span className="text-[11px] font-bold text-[#89909b]">แก๊ง</span>
      </div>
    </motion.div>
  );
}

export const GangHeroBadge = GangsOnlineBadge;
