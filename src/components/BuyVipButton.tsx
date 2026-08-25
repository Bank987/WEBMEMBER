"use client";

import { ExternalLink, Hash, ShoppingCart, UsersRound, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const DISCORD_URL = "https://discord.gg/XBmmhgjHkn";

export function BuyVipButton({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative inline-flex items-center overflow-hidden rounded-full border border-yellow-500/40 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_10px_28px_rgba(234,179,8,0.28)] transition hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] ${compact ? "gap-2 px-4 py-2.5 text-[10px]" : "gap-3 px-5 py-3 text-[11px]"}`}
      >
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative grid size-6 place-items-center rounded-full bg-black/15"><ShoppingCart className="size-3.5 text-black" /></span>
        <span className="relative font-[900] tracking-[1px] uppercase text-black">สั่งซื้อ VIP</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.button type="button" onClick={() => setIsOpen(false)} className="absolute inset-0 cursor-default bg-[#040509]/80 backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="relative w-full max-w-[470px] overflow-hidden rounded-[34px] border border-yellow-500/45 bg-[#10131f] p-3 shadow-[0_30px_120px_rgba(234,179,8,0.2)] sm:p-4"
            >
              <div className="relative overflow-hidden rounded-[25px] border border-white/[0.07] bg-[#1a1e2b]">
                <div className="relative h-[126px] overflow-hidden bg-[linear-gradient(135deg,#5865f2_0%,#7e61d8_45%,#292f72_100%)]">
                  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.7px)] [background-size:13px_13px]" />
                  <motion.div animate={reduceMotion ? undefined : { x: [-10, 12, -10], y: [5, -8, 5] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -right-8 -top-14 size-48 rounded-full border-[22px] border-white/15" />
                  <motion.div animate={reduceMotion ? undefined : { x: [8, -12, 8] }} transition={{ duration: 9, repeat: Infinity }} className="absolute -bottom-16 left-7 size-36 rounded-full bg-[#a78bfa]/35 blur-xl" />
                  <button type="button" onClick={() => setIsOpen(false)} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/15 text-white backdrop-blur transition hover:bg-black/30"><X className="size-4" /></button>
                </div>
                <div className="relative px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
                  <motion.div animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity }} className="-mt-10 grid size-20 place-items-center rounded-[26px] border-[5px] border-[#1a1e2b] bg-[#5865f2] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
                    <img src="https://cdn.simpleicons.org/discord/white" alt="Discord" className="size-10" />
                  </motion.div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-[900] tracking-[1.5px] text-[#aab5ff]">LASTNAME.SITE</p>
                      <h2 className="mt-2 text-[26px] font-[900] leading-[1.12] text-white">ติดต่อซื้อที่ DISCORD SUPPORT</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] leading-[1.8] text-[#aeb7ce]">หากต้องการอัปเกรดเป็น VIP (เอมไพร์) กรุณาเปิดทิคเก็ตในเซิร์ฟเวอร์ Discord ของเรา แอดมินจะส่งคีย์ให้คุณทันทีหลังจากชำระเงินเรียบร้อยแล้วครับ</p>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="group mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[#5865f2] px-5 py-4 text-[12px] font-[900] text-white shadow-[0_12px_25px_rgba(88,101,242,0.25)] transition hover:bg-[#6974f5]">เปิดทิคเก็ตใน Discord <ExternalLink className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                  <button type="button" onClick={() => setIsOpen(false)} className="mt-2.5 w-full py-2 text-[11px] font-[900] text-[#8791ad] transition hover:text-white">ไว้ก่อน</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}