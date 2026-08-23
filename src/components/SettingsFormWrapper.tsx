"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, LoaderCircle, Save, AlertCircle } from "lucide-react";

export function SettingsFormWrapper({ children, action }: { children: React.ReactNode, action: (formData: FormData) => Promise<void> }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSaving(true);
    setErrorMsg("");
    try {
      const formData = new FormData(formRef.current);
      await action(formData);
      setShowSuccess(true);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error?.message || "เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-[36px] relative pb-24">
        {children}
        
        {/* Floating Save Button */}
        <div className="fixed bottom-8 right-8 z-[50]">
          <button 
            type="submit" 
            disabled={isSaving}
            className="group flex items-center gap-3 bg-[#0084ff] hover:bg-[#0073e6] text-white px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(0,132,255,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isSaving ? <LoaderCircle className="size-5 animate-spin" /> : <Save className="size-5" />}
            <span className="text-[14px] font-[900] tracking-[1px] uppercase">
              {isSaving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
            </span>
          </button>
        </div>
      </form>

      <AnimatePresence>
        {(showSuccess || errorMsg) && (
          <motion.div 
            className="fixed inset-0 z-[9999] grid place-items-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowSuccess(false); setErrorMsg(""); }} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-[400px] bg-[#0c1018] border ${showSuccess ? "border-[#0084ff]/30" : "border-[#ef4444]/30"} rounded-[32px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden text-center`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${showSuccess ? "from-[#0084ff]/10" : "from-[#ef4444]/10"} to-transparent pointer-events-none`} />
              
              <div className={`mx-auto grid size-16 place-items-center rounded-full ${showSuccess ? "bg-[#0084ff]/20 text-[#0084ff] shadow-[0_0_30px_rgba(0,132,255,0.3)]" : "bg-[#ef4444]/20 text-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.3)]"} mb-6`}>
                {showSuccess ? <Check className="size-8" /> : <AlertCircle className="size-8" />}
              </div>
              
              <h3 className="text-[22px] font-[900] text-white mb-2">{showSuccess ? "บันทึกสำเร็จแล้ว" : "ไม่สามารถบันทึกได้"}</h3>
              <p className="text-[13px] text-[#8ca3b8] mb-8 leading-relaxed">
                {showSuccess ? "การตั้งค่าเว็บไซต์ของคุณถูกอัปเดตเรียบร้อยแล้ว การเปลี่ยนแปลงจะมีผลทันที" : errorMsg}
              </p>
              
              <button 
                onClick={() => { setShowSuccess(false); setErrorMsg(""); }}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[13px] font-[900] tracking-[1px] transition-all"
              >
                ปิดหน้าต่าง
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
