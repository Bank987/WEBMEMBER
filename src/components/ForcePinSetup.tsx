"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, KeyRound, LoaderCircle, CheckCircle2 } from "lucide-react";

export function ForcePinSetup({ requirePin, setupAction }: { requirePin: boolean, setupAction: (pin: string) => Promise<{ success: boolean; error?: string }> }) {
  const [isOpen, setIsOpen] = useState(requirePin);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.length !== 6) {
      setError("กรุณากรอกรหัส PIN ให้ครบ 6 หลัก");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const result = await setupAction(pin);
      if (result.success) {
        setIsOpen(false);
      } else {
        setError(result.error || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[99999] grid place-items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-[450px] bg-[#0c1018] border border-[#ff4444]/30 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(255,68,68,0.2)] overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff4444]/10 to-transparent pointer-events-none" />
          
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#ff4444]/20 text-[#ff4444] shadow-[0_0_30px_rgba(255,68,68,0.3)] mb-6">
            <ShieldAlert className="size-8" />
          </div>
          
          <h2 className="text-[22px] font-[900] text-white tracking-wide mb-3">
            ตั้งค่ารหัสกู้คืน (Recovery PIN)
          </h2>
          
          <p className="text-[13px] text-[#8ca3b8] mb-6 leading-relaxed text-left">
            ตรวจพบว่าเว็บไซต์ของคุณยังไม่มีรหัสกู้คืน 
            <strong className="text-[#ff4444] ml-1">กรุณาตั้งรหัส PIN 6 หลักเดี๋ยวนี้</strong> 
            เพื่อใช้ยืนยันตัวตนในกรณีที่คุณลืมรหัส Master Key ในอนาคต
          </p>

          <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left border border-white/10">
            <h3 className="text-[12px] font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="size-4 text-[#0084ff]" /> ทำไมต้องตั้งรหัสนี้?
            </h3>
            <p className="text-[11px] text-[#a0b2c3] leading-relaxed">
              หากคุณลืม Master Key คุณจะไม่สามารถเข้าหลังบ้านได้อีก ระบบ PIN จะช่วยให้ฝ่ายสนับสนุน (Support) สามารถตรวจสอบและออกรหัส Master Key ใหม่ให้คุณได้อย่างปลอดภัย ป้องกันคนอื่นมาแอบอ้าง
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-4 text-[24px] tracking-[0.5em] font-mono text-center text-white focus:border-[#ff4444] focus:bg-[#ff4444]/5 outline-none transition-all"
                required
                autoFocus
              />
              {error && <p className="text-[#ff4444] text-[11px] mt-2">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading || pin.length !== 6}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#ff4444] hover:bg-[#ff3333] disabled:opacity-50 text-white rounded-xl text-[14px] font-[900] tracking-[1px] transition-all shadow-[0_0_20px_rgba(255,68,68,0.3)]"
            >
              {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : <CheckCircle2 className="size-5" />}
              บันทึกรหัสกู้คืน
            </button>
          </form>
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
