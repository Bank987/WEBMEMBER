"use client";

import { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GangAnnouncement({ message, gangId }: { message: string, gangId: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hideForHour, setHideForHour] = useState(false);

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
    if (hideForHour) {
      // Hide for 1 hour (3600000 ms)
      localStorage.setItem("hide_announcement_" + gangId, (Date.now() + 3600000).toString());
    }
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
            className="relative overflow-hidden rounded-2xl border border-[#0084ff]/30 bg-[#060d1a]/90 p-5 shadow-[0_20px_50px_rgba(0,132,255,0.2)] backdrop-blur-xl"
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

                {/* Checkbox for 1 hour mute */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-2 cursor-pointer group w-fit">
                    <div className={'grid size-4 place-items-center rounded border transition-colors ' + (hideForHour ? 'bg-[#0084ff] border-[#0084ff]' : 'bg-black/50 border-white/20 group-hover:border-white/40')}>
                      {hideForHour && <svg viewBox="0 0 24 24" fill="none" className="size-2.5 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={hideForHour} 
                      onChange={(e) => setHideForHour(e.target.checked)} 
                    />
                    <span className="text-[10px] font-bold text-[#8ca3b8] group-hover:text-white transition-colors">
                      ไม่แสดงอีกใน 1 ชั่วโมง
                    </span>
                  </label>
                </div>
              </div>
              
              <button 
                onClick={handleClose} 
                className="absolute right-0 top-0 p-1.5 text-white/30 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full"
                title="ปิด"
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