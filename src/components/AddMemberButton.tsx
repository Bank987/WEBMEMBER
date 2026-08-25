"use client";

import { useState } from "react";
import { Plus, Crown, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AddMemberButton({ isVip, memberCount }: { isVip: boolean; memberCount: number }) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isVip && memberCount >= 50) {
      e.preventDefault();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <>
      <Link 
        href="/admin/members/new"
        onClick={handleClick}
        className="group relative flex items-center gap-[9px] bg-[#0084ff]/10 border border-[#0084ff]/30 text-[#0084ff] hover:bg-[#0084ff] hover:text-white px-[24px] py-[12px] rounded-full text-[10.5px] font-[900] uppercase tracking-[1.8px] transition-all duration-300 shadow-[0_0_15px_rgba(0,132,255,0.15)] hover:shadow-[0_0_25px_rgba(0,132,255,0.4)]"
      >
        <Plus className="w-[14px] h-[14px]" />
        เพิ่มสมาชิก
      </Link>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="fixed top-24 right-5 md:right-10 z-50 w-[350px] max-w-[calc(100vw-40px)] shadow-[0_0_40px_rgba(234,179,8,0.2)]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-[#0c0a00] p-5">
              <div className="absolute -right-10 -top-10 size-[100px] rounded-full bg-yellow-500/20 blur-[30px]" />
              
              <div className="flex gap-4 relative z-10">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-500/40">
                  <Crown className="size-5 text-yellow-400" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-yellow-400 mb-1">สมาชิกเต็มโควต้า 50 คน</h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    สมาชิกในแก๊งของคุณครบ 50 คนแล้ว ปลดล็อค VIP เพื่อปลดล็อคสมาชิกที่ไม่จำกัด
                  </p>
                  
                  <Link href="/admin/vip" className="inline-flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
                    อัปเกรด VIP ตอนนี้ <ArrowRight className="size-3" />
                  </Link>
                </div>
                
                <button onClick={() => setShowAlert(false)} className="absolute right-0 top-0 text-white/30 hover:text-white transition">
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
