"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone } from "lucide-react";

export function GangAnnouncementModal({ message, gangId }: { message: string; gangId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hideForHour, setHideForHour] = useState(false);

  useEffect(() => {
    if (!message) return;
    
    // Check localStorage for mute
    const mutedUntil = localStorage.getItem('mute_announcement_modal_' + gangId);
    if (mutedUntil && parseInt(mutedUntil) > Date.now()) {
      return; // Still muted
    }

    // Delay a bit before showing so it does not jump immediately
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, [message, gangId]);

  function handleClose() {
    if (hideForHour) {
      const oneHourFromNow = Date.now() + 60 * 60 * 1000;
      localStorage.setItem('mute_announcement_modal_' + gangId, oneHourFromNow.toString());
    }
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[99999] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[500px] max-h-[90vh] bg-[#0c1018] border border-[#0084ff]/30 rounded-[28px] shadow-[0_20px_80px_rgba(0,132,255,0.2)] flex flex-col text-left overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5 relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-[#0084ff]/20 text-[#0084ff]">
                  <Megaphone className="size-5" />
                </div>
                <div>
                  <h2 className="text-[16px] font-[900] text-white tracking-wide">ประกาศจากแอดมิน</h2>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="grid size-8 place-items-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto custom-scrollbar relative z-10">
              <div className="p-6">
                <div className="text-[14px] leading-relaxed text-[#a0b2c3] whitespace-pre-wrap">
                  {message}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-5 border-t border-white/10 bg-black/40 relative z-10 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={'grid size-5 place-items-center rounded-md border transition-colors ' + (hideForHour ? 'bg-[#0084ff] border-[#0084ff]' : 'bg-black/50 border-white/20 group-hover:border-white/40')}>
                  {hideForHour && <svg viewBox="0 0 24 24" fill="none" className="size-3 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={hideForHour} 
                  onChange={(e) => setHideForHour(e.target.checked)} 
                />
                <span className="text-[11px] font-bold text-[#8ca3b8] group-hover:text-white transition-colors">
                  ปิดประกาศ 1 ชั่วโมง
                </span>
              </label>

              <button 
                onClick={handleClose}
                className="px-6 py-3 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-xl text-[12px] font-[900] tracking-[1px] transition-all"
              >
                รับทราบ
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}