"use client";

import { useState, useEffect } from "react";
import { Megaphone, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GangAnnouncement({ 
  message, 
  gangId,
  images = [],
  theme = "chromium"
}: { 
  message: string; 
  gangId: string;
  images?: string[];
  theme?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hideForHour, setHideForHour] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (!message && (!images || images.length === 0)) return;
    const hideUntilStr = localStorage.getItem("mute_announcement_gate_" + gangId);
    if (hideUntilStr) {
      const hideUntil = parseInt(hideUntilStr, 10);
      if (Date.now() < hideUntil) {
        return; 
      } else {
        localStorage.removeItem("mute_announcement_gate_" + gangId);
      }
    }
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [message, images, gangId]);

  const handleClose = () => {
    setIsVisible(false);
    if (hideForHour) {
      localStorage.setItem("mute_announcement_gate_" + gangId, (Date.now() + 3600000).toString());
    }
  };

  if (!message && (!images || images.length === 0)) return null;

  // Determine if it should be big or small
  const isLarge = images.length > 0 || message.length > 150 || message.split('\n').length > 3;

  // Theme styling (only used for Large mode)
  let containerStyles = "";
  let textStyles = "";
  let accentStyles = "";
  
  if (theme === "light") {
    containerStyles = "bg-white border-black/10 text-black shadow-2xl";
    textStyles = "text-black/80";
    accentStyles = "text-black bg-black/5 border-black/10";
  } else if (theme === "dark") {
    containerStyles = "bg-[#111111] border-white/10 text-white shadow-2xl";
    textStyles = "text-white/80";
    accentStyles = "text-white bg-white/5 border-white/10";
  } else {
    // Chromium
    containerStyles = "bg-[#060d1a]/80 backdrop-blur-2xl border-[#0084ff]/30 text-white shadow-[0_20px_80px_rgba(0,132,255,0.25)]";
    textStyles = "text-white/90";
    accentStyles = "text-[#4db0ff] bg-[#0084ff]/20 border-[#0084ff]/40";
  }

  // Next/Prev image
  const nextImg = () => setCurrentImgIndex(i => (i + 1) % images.length);
  const prevImg = () => setCurrentImgIndex(i => (i - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {isLarge ? (
            // BIG ANNOUNCEMENT (MODAL)
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-[24px] border ${containerStyles}`}
              >
                {theme === "chromium" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <div className="absolute -left-20 -top-20 size-48 rounded-full bg-[#0084ff]/20 blur-[50px] pointer-events-none" />
                  </>
                )}
                
                <button 
                  onClick={handleClose} 
                  className={`absolute right-4 top-4 z-50 p-2 rounded-full backdrop-blur-md transition-all ${theme === 'light' ? 'bg-black/5 hover:bg-black/10 text-black' : 'bg-black/20 hover:bg-black/40 text-white'}`}
                >
                  <X className="size-5" />
                </button>

                <div className="overflow-y-auto overflow-x-hidden flex-1 no-scrollbar relative z-10">
                  {images.length > 0 && (
                    <div className="relative w-full bg-black/10 aspect-video group">
                      <img 
                        src={images[currentImgIndex]} 
                        alt="Announcement" 
                        className="w-full h-full object-cover"
                      />
                      {images.length > 1 && (
                        <>
                          <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-md">
                            <ChevronLeft className="size-5" />
                          </button>
                          <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-md">
                            <ChevronRight className="size-5" />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, idx) => (
                              <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${accentStyles}`}>
                        <Megaphone className="size-5" />
                      </div>
                      <h4 className="text-[13px] font-[900] uppercase tracking-[2px]">ประกาศจากแอดมิน</h4>
                    </div>
                    
                    {message && (
                      <p className={`text-[14px] leading-relaxed whitespace-pre-wrap ${textStyles}`}>
                        {message}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`p-4 sm:px-8 sm:py-5 border-t ${theme === 'light' ? 'border-black/5 bg-black/5' : 'border-white/10 bg-black/20'} flex items-center justify-between shrink-0 relative z-10`}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`grid size-4 place-items-center rounded border transition-colors ${hideForHour ? (theme === 'light' ? 'bg-black border-black' : 'bg-[#0084ff] border-[#0084ff]') : (theme === 'light' ? 'bg-black/5 border-black/20' : 'bg-black/50 border-white/20')}`}>
                      {hideForHour && <svg viewBox="0 0 24 24" fill="none" className={`size-2.5 ${theme === 'light' ? 'text-white' : 'text-white'}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={hideForHour} 
                      onChange={(e) => setHideForHour(e.target.checked)} 
                    />
                    <span className={`text-[11px] font-bold transition-colors ${theme === 'light' ? 'text-black/60 group-hover:text-black' : 'text-white/60 group-hover:text-white'}`}>
                      ซ่อนประกาศนี้ 1 ชั่วโมง
                    </span>
                  </label>
                  
                  <button 
                    onClick={handleClose}
                    className={`px-6 py-2.5 rounded-full text-[12px] font-[900] tracking-widest uppercase transition-all ${theme === 'light' ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-white/90'}`}
                  >
                    รับทราบ
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            // SMALL ANNOUNCEMENT (ORIGINAL STYLE)
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden rounded-2xl border border-[#0084ff]/30 bg-[#060d1a]/90 p-5 shadow-[0_20px_50px_rgba(0,132,255,0.2)] backdrop-blur-xl"
              >
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
        </>
      )}
    </AnimatePresence>
  );
}