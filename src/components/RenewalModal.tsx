"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, LoaderCircle, CheckCircle2, AlertCircle, X } from "lucide-react";
import { confirmRenewal } from "@/actions/rental";
import { useRouter } from "next/navigation";

export function RenewalModal({ open, onClose, daysRemaining }: { open: boolean; onClose: () => void; daysRemaining: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleConfirm() {
    setIsLoading(true);
    setResult("idle");
    setErrorMsg("");
    try {
      const res = await confirmRenewal();
      if (res.success) {
        setResult("success");
        setTimeout(() => {
          onClose();
          router.refresh();
        }, 2000);
      } else {
        setResult("error");
        setErrorMsg(res.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setResult("error");
      setErrorMsg("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] grid place-items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={result !== "success" ? onClose : undefined} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
          className="relative w-full max-w-[460px] bg-[#0c1018] border border-[#0084ff]/30 rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,132,255,0.2)] overflow-hidden text-center"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0084ff]/10 to-transparent pointer-events-none" />
          <div className="absolute -right-16 -top-16 size-[200px] rounded-full bg-[#0084ff]/15 blur-[60px] pointer-events-none" />

          {/* Close button */}
          {result !== "success" && (
            <button onClick={onClose} className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition">
              <X className="size-4" />
            </button>
          )}

          {/* Success State */}
          {result === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 py-6"
            >
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#22c55e]/20 text-[#22c55e] shadow-[0_0_40px_rgba(34,197,94,0.4)] mb-6">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="text-[24px] font-[900] text-white mb-2">ต่อสัญญาสำเร็จ!</h2>
              <p className="text-[13px] text-[#8ca3b8]">เว็บไซต์ของคุณได้รับการต่ออายุอีก 1 เดือนแล้ว</p>
            </motion.div>
          ) : (
            <div className="relative z-10">
              {/* Icon */}
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#0084ff]/20 text-[#0084ff] shadow-[0_0_30px_rgba(0,132,255,0.3)] mb-6">
                <RefreshCw className="size-8" />
              </div>

              <h2 className="text-[22px] font-[900] text-white tracking-wide mb-3">
                ยืนยันในการต่อสัญญาเช่าเว็บไหม?
              </h2>

              <p className="text-[13px] text-[#8ca3b8] mb-4 leading-relaxed">
                สัญญาเช่าเว็บไซต์ของคุณกำลังจะหมดอายุ คุณเหลือเวลาอีก{" "}
                <strong className="text-[#f59e0b]">{daysRemaining} วัน</strong> ก่อนเว็บจะถูกปิด
              </p>

              <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left border border-white/10">
                <h3 className="text-[12px] font-bold text-white mb-2 flex items-center gap-2">
                  <AlertCircle className="size-4 text-[#f59e0b]" /> สิ่งที่จะเกิดขึ้น
                </h3>
                <ul className="text-[11px] text-[#a0b2c3] leading-relaxed space-y-1">
                  <li>• เว็บไซต์จะได้รับการต่ออายุอีก 1 เดือน</li>
                  <li>• ข้อมูลสมาชิกและการตั้งค่าทั้งหมดจะยังคงอยู่</li>
                  <li>• แพ็คเกจฟรี: ต่อสัญญาได้ไม่จำกัด</li>
                </ul>
              </div>

              {result === "error" && (
                <div className="mb-4 rounded-xl bg-[#ff4444]/10 border border-[#ff4444]/30 px-4 py-3 text-[12px] text-[#ff8888]">
                  {errorMsg}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-xl border border-white/10 bg-white/5 text-[13px] font-[900] text-white/70 hover:bg-white/10 transition disabled:opacity-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#0084ff] hover:bg-[#0070dd] disabled:opacity-50 text-white rounded-xl text-[13px] font-[900] tracking-[0.5px] transition-all shadow-[0_0_20px_rgba(0,132,255,0.3)]"
                >
                  {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : <RefreshCw className="size-4" />}
                  ยืนยันต่อสัญญา
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
