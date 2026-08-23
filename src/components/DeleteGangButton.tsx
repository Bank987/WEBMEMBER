"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X, LoaderCircle } from "lucide-react";

export function DeleteGangButton({ deleteAction, gangName }: { deleteAction: () => Promise<void>; gangName?: string }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const confirmDelete = () => {
    startTransition(async () => {
      try {
        await deleteAction();
        // Upon success, it normally redirects
      } catch (error: any) {
        setErrorMsg(error.message || "เกิดข้อผิดพลาดในการยุบแก๊ง");
      }
    });
  };

  return (
    <>
      <button 
        type="button" 
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className={`bg-[#ff0000]/10 hover:bg-[#ff0000]/30 text-[#ff4444] border border-[#ff0000]/30 px-[18px] py-[9px] rounded-full text-[11px] font-[900] tracking-[1px] transition-all ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        ยุบแก๊งและลบข้อมูลทั้งหมด
      </button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div className="fixed inset-0 z-[9999] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="ปิด" className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-default" onClick={() => !isPending && setShowConfirm(false)} />
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="relative w-full max-w-[420px] rounded-[32px] border border-white/10 bg-[#11151c] p-6 shadow-2xl sm:p-8">
              <button type="button" onClick={() => !isPending && setShowConfirm(false)} className="absolute right-5 top-5 grid size-8 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
              
              {!errorMsg ? (
                <>
                  <div className="grid size-14 place-items-center rounded-2xl bg-red-500/15 text-red-500">
                    <Trash2 className="size-7" />
                  </div>
                  <h2 className="mt-6 text-[22px] font-[900] text-white">ยืนยันการยุบแก๊ง?</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#9caebe]">
                    คุณกำลังจะยุบแก๊ง {gangName ? <span className="text-red-400 font-[900]">"{gangName}"</span> : "นี้"}<br/>
                    การกระทำนี้ <span className="text-red-400 underline decoration-red-500/30">ไม่สามารถย้อนกลับได้</span> ข้อมูลและสมาชิกทั้งหมดจะหายไปถาวร
                  </p>
                  <div className="mt-8 flex gap-3">
                    <button onClick={() => setShowConfirm(false)} disabled={isPending} className="flex-1 rounded-xl bg-white/5 py-3.5 text-[12px] font-[900] text-white transition hover:bg-white/10 disabled:opacity-50">ยกเลิก</button>
                    <button onClick={confirmDelete} disabled={isPending} className="flex-1 rounded-xl bg-[#ef4444] py-3.5 text-[12px] font-[900] text-white transition hover:bg-[#ef4444]/90 flex items-center justify-center gap-2 disabled:opacity-50">
                      {isPending && <LoaderCircle className="size-4 animate-spin" />} ยืนยันยุบแก๊ง
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid size-14 place-items-center rounded-2xl bg-orange-500/15 text-orange-400">
                    <AlertTriangle className="size-7" />
                  </div>
                  <h2 className="mt-6 text-[22px] font-[900] text-white">ไม่สามารถดำเนินการได้</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#9caebe]">{errorMsg}</p>
                  <div className="mt-8">
                    <button onClick={() => { setErrorMsg(""); setShowConfirm(false); }} className="w-full rounded-xl bg-white/10 py-3.5 text-[12px] font-[900] text-white transition hover:bg-white/20">รับทราบ และปิดหน้าต่าง</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
