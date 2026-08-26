"use client";

import { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GangAnnouncement({ message, gangId }: { message: string, gangId: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    // Check localStorage if hidden recently
    const hideUntilStr = localStorage.getItem("hide_announcement_" + gangId);
    if (hideUntilStr) {
      const hideUntil = parseInt(hideUntilStr, 10);
      if (Date.now() < hideUntil) {
        return; // still hidden
      } else {
        localStorage.removeItem("hide_announcement_" + gangId);
      }
    }
    
    // Slight delay for effect
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [message, gangId]);

  const handleClose = () => {
    setIsVisible(false);
    // Hide for 1 hour (3600000 ms)
    localStorage.setItem("hide_announcement_" + gangId, (Date.now() + 3600000).toString());
  };

  if (!message) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative overflow-hidden rounded-2xl border border-[#0084ff]/30 bg-[#060d1a]/90 p-4 shadow-[0_20px_50px_rgba(0,132,255,0.2)] backdrop-blur-xl"
          >
            {/* Glossy highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -left-10 -top-10 size-32 rounded-full bg-[#0084ff]/20 blur-[40px] pointer-events-none" />

            <div className="flex gap-4 relative z-10 items-start">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0084ff]/20 border border-[#0084ff]/40">
                <Megaphone className="size-4 text-[#4db0ff]" />
              </div>
              
              <div className="flex-1 min-w-0 pr-6">
                <h4 className="text-[11px] font-bold text-[#4db0ff] uppercase tracking-widest mb-1.5">ประกาศจากแอดมิน</h4>
                <p className="text-[13px] text-white/90 leading-relaxed whitespace-pre-wrap">
                  {message}
                </p>
              </div>
              
              <button 
                onClick={handleClose} 
                className="absolute right-0 top-0 p-1 text-white/30 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                title="ปิดประกาศ 1 ชั่วโมง"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

