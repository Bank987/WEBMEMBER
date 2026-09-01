"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, CheckCircle2, MonitorPlay, Shield, Rocket } from "lucide-react";

export function GuideButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[11px] font-[900] tracking-[1px] text-white"
      >
        <BookOpen className="size-3.5 text-[#0084ff]" /> 
        <span className="hidden sm:inline">คู่มือการใช้งาน</span>
        <span className="sm:hidden">คู่มือ</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-[9999] grid place-items-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[600px] max-h-[85vh] bg-[#0c1018] border border-[#0084ff]/30 rounded-[24px] shadow-[0_20px_80px_rgba(0,132,255,0.15)] overflow-hidden flex flex-col text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-[#0084ff]/20 text-[#0084ff]">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-[900] text-white tracking-wide">คู่มือการใช้งานเว็บไซต์</h2>
                    <p className="text-[11px] text-[#8ca3b8] mt-1">อ่านทำความเข้าใจแบบง่ายๆ ใช้งานได้ทันที</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="grid size-8 place-items-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
              
              {/* Content - Scrollable */}
              <div className="p-6 overflow-y-auto custom-scrollbar relative z-10 space-y-8">
                
                {/* Step 1 */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Rocket className="size-4 text-[#0084ff]" />
                    <h3 className="text-[14px] font-[900] text-white">1. การสร้างเว็บไซต์ใหม่</h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#a0b2c3] ml-6">
                    เลื่อนลงไปที่ช่อง <strong>"สร้างเว็บ"</strong> กรอกชื่อแก๊งและชื่อ URL ที่ต้องการ จากนั้นระบบจะสร้างเว็บให้ทันที!
                    <br/><br/>
                    <span className="text-[#ff4444] font-bold">สำคัญมาก:</span> เมื่อสร้างเสร็จ ระบบจะแสดง <strong className="text-white">Master Key (รหัสยาวๆ สีแดง)</strong> ให้คุณก็อปปี้หรือแคปจอเก็บไว้ให้ดี ห้ามให้ใครรู้เด็ดขาด เพราะนี่คือกุญแจสำหรับเข้าหลังบ้าน!
                  </p>
                </section>

                {/* Step 2 */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <MonitorPlay className="size-4 text-[#0084ff]" />
                    <h3 className="text-[14px] font-[900] text-white">2. การเข้าสู่ระบบหลังบ้าน (Admin)</h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#a0b2c3] ml-6">
                    หากคุณสร้างเว็บไปแล้ว และต้องการเข้าไปเพิ่มรายชื่อสมาชิกหรือเปลี่ยนสีเว็บ ให้กดปุ่ม <strong>"เข้าสู่ระบบหลังบ้าน"</strong> 
                    จากนั้นกรอก URL เว็บของคุณ และใส่รหัส <strong>Master Key</strong> ที่คุณเก็บไว้
                  </p>
                </section>

                {/* Step 3 */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="size-4 text-[#0084ff]" />
                    <h3 className="text-[14px] font-[900] text-white">3. การจัดการสมาชิกและการตั้งค่า</h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#a0b2c3] ml-6">
                    เมื่อเข้าหลังบ้านได้แล้ว คุณจะสามารถ:
                  </p>
                  <ul className="mt-2 space-y-2 ml-6 text-[12px] text-[#a0b2c3]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-[#0084ff] shrink-0 mt-0.5" />
                      <span><strong>เพิ่ม/ลบ สมาชิก:</strong> ใส่ชื่อ, รูปโปรไฟล์, ตำแหน่ง และลิงก์เฟซบุ๊กได้</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-[#0084ff] shrink-0 mt-0.5" />
                      <span><strong>เปลี่ยนหน้าตาเว็บ:</strong> เลือกธีมสี, ใส่เพลง YouTube, เปลี่ยนเอฟเฟกต์หิมะ/เมทริกซ์ หรือเปลี่ยนรูปร่างปุ่มทางเข้าเว็บได้อิสระ</span>
                    </li>
                  </ul>
                </section>

                {/* Step 4 */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="size-4 text-[#0084ff]" />
                    <h3 className="text-[14px] font-[900] text-white">4. อายุการใช้งานและการต่อสัญญา</h3>
                  </div>
                  <ul className="mt-2 space-y-2 ml-6 text-[12px] text-[#a0b2c3]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0084ff] font-bold mt-0.5">•</span>
                      <span><strong>แพ็กเกจฟรี (เริ่มต้น):</strong> เว็บจะมีอายุการใช้งาน 1 เดือน แต่ไม่ต้องตกใจ! คุณสามารถกดปุ่ม "ต่อสัญญา" ในระบบหลังบ้านได้เรื่อยๆ โดยไม่มีค่าใช้จ่าย (ข้อมูลไม่หาย)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0084ff] font-bold mt-0.5">•</span>
                      <span><strong>แพ็กเกจ VIP (เอมไพร์):</strong> ระบบจะทำการต่อสัญญาให้อัตโนมัติ เว็บจะไม่มีวันหมดอายุ หรือถูกระงับการใช้งานเลยตลอดไป</span>
                    </li>
                  </ul>
                </section>

                <div className="p-4 rounded-xl bg-[#0084ff]/10 border border-[#0084ff]/20 ml-6">
                  <p className="text-[11px] leading-relaxed text-[#a0b2c3]">
                    <strong>💡 ลืม Master Key ทำอย่างไร?</strong><br/>
                    หากคุณทำรหัสหาย ให้ไปที่หน้าต่าง "เข้าสู่ระบบหลังบ้าน" จะมีปุ่ม "ติดต่อ SUPPORT" ให้ทักมาหาทีมงานพร้อมหลักฐานความเป็นเจ้าของเว็บ (เช่น รูปแคปจอตอนสร้างเว็บ หรือทักมาจากเพจเฟซบุ๊กที่แปะไว้ในเว็บ) แอดมินจะออกรหัสใหม่ให้ครับ
                  </p>
                </div>

              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-white/5 relative z-10">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-xl text-[12px] font-[900] tracking-[1px] transition-all"
                >
                  เข้าใจแล้ว ปิดหน้าต่างนี้
                </button>
              </div>

              {/* Background Glow */}
              <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-[50%] bg-[#0084ff]/20 blur-[100px] pointer-events-none z-0" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
