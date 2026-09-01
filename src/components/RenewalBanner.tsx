"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, RefreshCw } from "lucide-react";
import { dismissRenewalNotification } from "@/actions/rental";
import { RenewalModal } from "./RenewalModal";

export function RenewalBanner({ daysRemaining }: { daysRemaining: number }) {
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleDismiss() {
    setVisible(false);
    await dismissRenewalNotification();
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-[#f59e0b]/30 bg-[linear-gradient(135deg,#1c1608,#0e0d08_70%)] p-4 mb-5 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
            {/* Glow accent */}
            <div className="absolute -right-10 -top-10 size-[120px] rounded-full bg-[#f59e0b]/15 blur-[50px] pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4">
              {/* Icon */}
              <div className="shrink-0 grid size-10 place-items-center rounded-xl bg-[#f59e0b]/20 text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Clock className="size-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-[900] text-[#fbbf24] tracking-wide">
                  ⚠️ สัญญาเช่าเว็บไซต์กำลังจะหมดอายุ
                </p>
                <p className="text-[11px] text-[#b8a070] mt-1">
                  คุณเหลือเวลาอีก <strong className="text-[#f59e0b]">{daysRemaining} วัน</strong> ในการต่อสัญญา ก่อนที่เว็บไซต์จะถูกปิดชั่วคราว
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#f59e0b] px-4 py-2.5 text-[11px] font-[900] text-black hover:bg-[#fbbf24] transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <RefreshCw className="size-3.5" />
                  ต่อสัญญา
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RenewalModal open={modalOpen} onClose={() => setModalOpen(false)} daysRemaining={daysRemaining} />
    </>
  );
}
