"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeen = localStorage.getItem("whats-new-seen-update-1");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("whats-new-seen-update-1", "true");
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0084ff]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0084ff]" />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">มีอะไรใหม่ในอัปเดตนี้?</h2>
                <p className="text-white/50 text-[12px]">ฟีเจอร์ใหม่ที่เพิ่งเพิ่มเข้ามาล่าสุด</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <h3 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                  🎬 รูปแบบเปลี่ยนหน้าแบบภาพยนตร์
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">NEW!</span>
                </h3>
                <p className="text-white/60 text-[12px]">เปลี่ยนฉากแบบ Cinematic สไลด์จอดำ พร้อมโลโก้เรืองแสงและชื่อแก๊งพิมพ์ดีด</p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <h3 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                  ⚪ ปุ่มสไตล์ Minimal (ทึบ)
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">NEW!</span>
                </h3>
                <p className="text-white/60 text-[12px]">ปุ่มทรงแคปซูลโค้งมน สีเทาคลีนๆ สไตล์มินิมอลไม่มีแสงฟุ้ง</p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                <h3 className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
                  ⭕ สวิตช์เปิด-ปิดวงแหวนโลโก้
                  <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">NEW!</span>
                </h3>
                <p className="text-white/60 text-[12px]">เลือกซ่อนหรือแสดงเอฟเฟกต์วงแหวนหมุนรอบโลโก้หน้า Gate ได้ตามใจชอบ</p>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-full bg-[#0084ff] hover:bg-[#0073e6] text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(0,132,255,0.3)]"
            >
              รับทราบและเริ่มใช้งาน
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
