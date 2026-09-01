"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, CalendarClock, ShieldCheck } from "lucide-react";
import { dismissRenewalAnnouncement } from "@/actions/rental";
import { useRouter } from "next/navigation";

export function RenewalAnnouncementModal({ expiresAtStr, isVip }: { expiresAtStr: string; isVip: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  const router = useRouter();

  async function handleAcknowledge() {
    setIsDismissing(true);
    await dismissRenewalAnnouncement();
    setIsOpen(false);
    router.refresh();
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] grid place-items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[500px] bg-[#0c1018] border border-[#0084ff]/30 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,132,255,0.2)] overflow-hidden"
        >
          {/* Visual Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0084ff]/10 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 size-[250px] rounded-full bg-[#0084ff]/15 blur-[70px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="shrink-0 grid size-12 place-items-center rounded-2xl bg-[#0084ff]/20 text-[#0084ff] shadow-[0_0_20px_rgba(0,132,255,0.3)]">
              <Info className="size-6" />
            </div>
            <div>
              <p className="text-[10px] font-[900] tracking-[2px] text-[#0084ff] uppercase">System Update</p>
              <h2 className="text-[20px] font-[900] text-white tracking-wide mt-1">
                ประกาศ: ระบบต่อสัญญาเช่าเว็บไซต์
              </h2>
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <p className="text-[13px] text-[#8ca3b8] leading-relaxed">
              เราได้เพิ่มฟีเจอร์การต่ออายุสัญญาเช่าแบบรายเดือน เพื่อรักษาข้อมูลและหน้าเว็บของคุณอย่างเป็นระบบ 
              สำหรับแพ็คเกจเริ่มต้น คุณยังสามารถกด <strong className="text-white">ต่อสัญญาได้ฟรี</strong> เช่นเดิมเมื่อใกล้หมดอายุ!
            </p>

            {/* Info Cards */}
            <div className="grid gap-3">
              <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                <CalendarClock className="size-5 text-[#f59e0b] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[12px] font-[900] text-white">วันหมดอายุรอบปัจจุบันของคุณ</p>
                  <p className="text-[11px] text-[#a0b2c3] mt-1">
                    {isVip ? (
                      <span className="text-[#fcd34d] font-bold">ไม่มีวันหมดอายุ (ผู้ใช้ระดับ VIP)</span>
                    ) : (
                      <span className="text-[#f59e0b] font-bold">{expiresAtStr}</span>
                    )}
                  </p>
                </div>
              </div>
              
              {!isVip && (
                <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <ShieldCheck className="size-5 text-[#22c55e] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[12px] font-[900] text-white">วิธีต่อสัญญา</p>
                    <p className="text-[11px] text-[#a0b2c3] mt-1 leading-relaxed">
                      เมื่อเหลือเวลา <strong className="text-white">3 วันสุดท้าย</strong> ระบบจะแสดงแถบแจ้งเตือน 
                      พร้อมปุ่ม "ต่อสัญญา" ในหน้าหลังบ้านนี้ ให้คุณกดเพื่อต่อเวลาเพิ่มได้เลย
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleAcknowledge}
              disabled={isDismissing}
              className="w-full mt-2 flex items-center justify-center gap-2 py-4 bg-[#0084ff] hover:bg-[#0070dd] disabled:opacity-50 text-white rounded-xl text-[13px] font-[900] tracking-[1px] transition-all shadow-[0_0_20px_rgba(0,132,255,0.3)]"
            >
              <CheckCircle2 className="size-5" />
              รับทราบ และเข้าสู่ระบบหลังบ้าน
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
