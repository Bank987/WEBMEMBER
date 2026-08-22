"use client";

import { Check, ChevronRight, CircleDotDashed, Globe2, KeyRound, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  { icon: Globe2, title: "ตั้งชื่อพื้นที่", detail: "เลือก slug ที่เป็นชื่อแก๊งของคุณ" },
  { icon: KeyRound, title: "รับรหัสลับ", detail: "เก็บ token สำหรับเข้าสู่หลังบ้าน" },
  { icon: UsersRound, title: "เปิดรายชื่อสมาชิก", detail: "เริ่มเพิ่มข้อมูลและเผยแพร่เว็บไซต์" },
];

export function LaunchSequence() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0d1117] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-[10px] font-[900] tracking-[1.5px] text-[#88c9ff]">LAUNCH SEQUENCE</p><h3 className="mt-2 text-[21px] font-[900] text-white">เปิดเว็บไซต์ใน 3 ขั้นตอน</h3></div>
        <div className="grid size-10 place-items-center rounded-2xl bg-[#1986d4]/15"><CircleDotDashed className="size-5 text-[#7bc3ff]" /></div>
      </div>
      <div className="mt-7 grid gap-2 sm:grid-cols-3">{steps.map((step, index) => {
        const Icon = step.icon;
        return <button key={step.title} type="button" onClick={() => setActiveStep(index)} className={`relative rounded-2xl p-3 text-left transition ${activeStep === index ? "bg-white/[0.11]" : "hover:bg-white/[0.05]"}`}>
          {index < steps.length - 1 && <div className="absolute right-[-8px] top-1/2 hidden h-px w-4 bg-white/15 sm:block" />}
          <span className={`grid size-8 place-items-center rounded-xl ${activeStep === index ? "bg-[#dceeff] text-[#0e5e9d]" : "bg-white/10 text-[#9aa8b5]"}`}><Icon className="size-4" /></span>
          <p className={`mt-3 text-[11px] font-[900] ${activeStep === index ? "text-white" : "text-[#97a3af]"}`}>0{index + 1}. {step.title}</p>
        </button>;
      })}</div>
      <motion.div key={active.title} initial={false} animate={{ opacity: 1, x: 0 }} className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#2491dc]/20 bg-[#0b1722] px-4 py-3">
        <div><p className="text-[12px] font-[900] text-[#eaf5ff]">{active.title}</p><p className="mt-1 text-[10px] text-[#92a4b5]">{active.detail}</p></div>
        <span className="grid size-7 place-items-center rounded-full bg-[#2cba6d]/15 text-[#71e69f]"><Check className="size-4" /></span>
      </motion.div>
    </div>
  );
}

export function MemberSignal() {
  return (
    <motion.div whileHover={{ y: -5 }} className="relative overflow-hidden rounded-[30px] bg-[#daf0ff] p-6 text-[#0c2233] sm:p-7">
      <div className="absolute -right-12 -top-12 size-44 rounded-full border-[20px] border-[#409ddb]/20" />
      <p className="relative text-[10px] font-[900] tracking-[1.5px] text-[#2773aa]">MEMBER SIGNAL</p>
      <h3 className="relative mt-3 max-w-[260px] text-[25px] font-[900] leading-[1.15]">รายชื่อที่ทำให้แก๊งมีตัวตน</h3>
      <p className="relative mt-3 max-w-[285px] text-[12px] leading-relaxed text-[#48718e]">แสดงบทบาทและข้อมูลของทุกคนในที่เดียว</p>
      <div className="relative mt-7 flex items-center justify-between">
        <div className="flex -space-x-3">{["#17486e", "#8950ad", "#d1685a", "#217c69"].map((color, index) => <motion.span key={color} initial={false} animate={{ scale: 1 }} transition={{ delay: index * 0.08, type: "spring" }} className="grid size-10 place-items-center rounded-full border-2 border-[#daf0ff] text-[10px] font-[900] text-white" style={{ backgroundColor: color }}>{["TN", "MR", "KT", "JM"][index]}</motion.span>)}</div>
        <span className="flex items-center gap-2 rounded-full bg-[#17486e] px-3 py-2 text-[10px] font-[900] text-white">24 สมาชิก <ChevronRight className="size-3" /></span>
      </div>
    </motion.div>
  );
}
