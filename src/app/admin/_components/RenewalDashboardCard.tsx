"use client";

import { useState } from "react";
import { AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { RenewalModal } from "@/components/RenewalModal";

export function RenewalDashboardCard({ status, daysRemaining }: { status: "grace" | "expired", daysRemaining: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  const isExpired = status === "expired";
  
  return (
    <>
      <div className={`relative overflow-hidden rounded-[28px] border p-6 sm:p-8 ${
        isExpired 
          ? "border-[#ef4444]/30 bg-[linear-gradient(135deg,#2a1215,#140a0c_70%)]" 
          : "border-[#f59e0b]/30 bg-[linear-gradient(135deg,#2a1f12,#140f0a_70%)]"
      }`}>
        {/* Glow */}
        <div className={`absolute -right-10 -top-10 size-[150px] rounded-full blur-[60px] pointer-events-none ${
          isExpired ? "bg-[#ef4444]/15" : "bg-[#f59e0b]/15"
        }`} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`shrink-0 grid size-12 place-items-center rounded-2xl shadow-[0_0_20px_currentColor] ${
              isExpired ? "bg-[#ef4444]/20 text-[#ef4444]" : "bg-[#f59e0b]/20 text-[#f59e0b]"
            }`}>
              {isExpired ? <AlertTriangle className="size-6" /> : <Clock className="size-6" />}
            </div>
            <div>
              <h3 className={`text-[18px] font-[900] ${isExpired ? "text-[#fca5a5]" : "text-[#fcd34d]"}`}>
                {isExpired ? "เว็บไซต์ถูกระงับการใช้งานชั่วคราว" : "สัญญาเช่าเว็บไซต์กำลังจะหมดอายุ"}
              </h3>
              <p className={`mt-1.5 max-w-lg text-[13px] leading-relaxed ${isExpired ? "text-[#fca5a5]/70" : "text-[#fcd34d]/70"}`}>
                {isExpired 
                  ? "สัญญาเช่าเว็บไซต์ของคุณหมดอายุแล้ว ส่งผลให้ผู้เข้าชมไม่สามารถเข้าดูเว็บไซต์สาธารณะได้ กรุณาต่อสัญญาเพื่อเปิดใช้งานอีกครั้ง ข้อมูลทั้งหมดจะยังคงอยู่" 
                  : `คุณเหลือเวลาอีก ${daysRemaining} วัน ในการต่อสัญญาก่อนที่เว็บไซต์จะถูกระงับการใช้งานชั่วคราว แพ็คเกจเริ่มต้นสามารถต่อสัญญาได้ฟรี`}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setModalOpen(true)}
            className={`shrink-0 flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[13px] font-[900] text-black transition-all shadow-[0_0_20px_currentColor] hover:scale-105 ${
              isExpired ? "bg-[#ef4444] hover:bg-[#f87171]" : "bg-[#f59e0b] hover:bg-[#fbbf24]"
            }`}
          >
            <RefreshCw className="size-4" />
            ต่อสัญญาเช่าเว็บไซต์
          </button>
        </div>
      </div>

      <RenewalModal open={modalOpen} onClose={() => setModalOpen(false)} daysRemaining={daysRemaining} />
    </>
  );
}
