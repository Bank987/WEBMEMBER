"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Marquee({ text }: { text: string }) {
  return (
    <div className="relative flex w-full overflow-hidden bg-[#0084ff] py-3 text-black">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 text-xs font-[900] tracking-[0.3em] uppercase">
            {text} <span className="mx-4 opacity-50">✦</span>
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 text-xs font-[900] tracking-[0.3em] uppercase">
            {text} <span className="mx-4 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  const handleMouseLeave = () => { setOpacity(0); };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,132,255,.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export function StickyScroll({ content }: { content: { title: string; description: string; content?: React.ReactNode }[] }) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardLength = content.length;

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) return index;
        return acc;
      }, 0);
      setActiveCard(closestBreakpointIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, cardLength, content]);

  return (
    <motion.div ref={ref} className="h-[300vh] relative w-full flex justify-center">
      <div className="sticky top-0 flex h-screen w-full max-w-7xl items-center justify-between gap-10 px-6">
        <div className="w-1/2 flex flex-col justify-center">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCard === index ? 1 : 0.2 }}
              className="my-10"
            >
              <h2 className="text-4xl md:text-5xl font-[900] text-white tracking-tight uppercase mb-4">{item.title}</h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,132,255,0.2)] bg-[#050505] border border-white/10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              {content[activeCard].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Ensure AnimatePresence is imported
import { AnimatePresence } from "framer-motion";
