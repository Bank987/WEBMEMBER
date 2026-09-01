"use client";

import { useState, useEffect } from "react";
import { Clock, Crown, Infinity } from "lucide-react";

export function RentalCountdown({ expiresAt, isVip }: { expiresAt: Date | string, isVip: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isVip) return;
    
    const target = new Date(expiresAt).getTime();
    
    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsExpired(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [expiresAt, isVip]);

  if (!mounted) return null; // Prevent hydration mismatch

  if (isVip) {
    return (
      <div className="relative mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 rounded-3xl border border-[#ffd700]/30 bg-[linear-gradient(135deg,rgba(255,215,0,0.1),rgba(0,0,0,0)_60%)] shadow-[0_20px_50px_rgba(255,215,0,0.05)] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#ffd700]/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40 shadow-[0_0_20px_rgba(255,215,0,0.3)] relative z-10">
          <Crown className="size-6" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-[11px] font-[900] tracking-[2px] text-[#ffd700] uppercase mb-2">
            แพ็คเกจ เอมไพร์ (VIP)
          </h3>
          <div className="flex items-center gap-2">
            <Infinity className="size-6 text-white/80" />
            <span className="text-[20px] sm:text-[24px] font-[900] text-white tracking-wide">อายุการใช้งานตลอดชีพ</span>
          </div>
          <p className="text-[#a0a0a0] text-[11px] mt-2 font-medium">ต่อสัญญาอัตโนมัติ 100% ไม่มีวันหมดอายุ ข้อมูลไม่สูญหาย</p>
        </div>
      </div>
    );
  }

  const isDanger = timeLeft.days < 3;

  return (
    <div className={`relative mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 rounded-[24px] border transition-colors ${isDanger ? 'border-[#ff4444]/30 bg-gradient-to-br from-[#1a0505] to-black shadow-[0_20px_50px_rgba(255,68,68,0.1)]' : 'border-[#0084ff]/30 bg-gradient-to-br from-[#05101a] to-black shadow-[0_20px_50px_rgba(0,132,255,0.08)]'} overflow-hidden`}>
      <div className={`absolute -top-20 -left-20 w-48 h-48 blur-[60px] rounded-full pointer-events-none ${isDanger ? 'bg-[#ff4444]/20' : 'bg-[#0084ff]/20'}`} />
      
      <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border relative z-10 ${isDanger ? 'bg-[#ff4444]/20 text-[#ff4444] border-[#ff4444]/40 shadow-[0_0_20px_rgba(255,68,68,0.3)]' : 'bg-[#0084ff]/20 text-[#0084ff] border-[#0084ff]/40 shadow-[0_0_20px_rgba(0,132,255,0.3)]'}`}>
        <Clock className="size-6 animate-pulse" />
      </div>
      
      <div className="relative z-10 flex-1 w-full">
        <h3 className={`text-[11px] font-[900] tracking-[2px] uppercase mb-4 ${isDanger ? 'text-[#ff4444]' : 'text-[#0084ff]'}`}>
          {isExpired ? "เว็บไซต์ถูกระงับ (หมดอายุ)" : "เวลาเช่าที่เหลืออยู่"}
        </h3>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <TimeBlock value={timeLeft.days} label="วัน" isDanger={isDanger} />
          <span className="text-white/20 text-xl font-bold animate-pulse -translate-y-3">:</span>
          <TimeBlock value={timeLeft.hours} label="ชั่วโมง" isDanger={isDanger} />
          <span className="text-white/20 text-xl font-bold animate-pulse -translate-y-3">:</span>
          <TimeBlock value={timeLeft.minutes} label="นาที" isDanger={isDanger} />
          <span className="text-white/20 text-xl font-bold animate-pulse -translate-y-3">:</span>
          <TimeBlock value={timeLeft.seconds} label="วินาที" isDanger={isDanger} />
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label, isDanger = false }: { value: number, label: string, isDanger?: boolean }) {
  const colorClass = isDanger ? "text-[#ff4444]" : "text-white";
  const bgClass = isDanger ? "bg-[#ff4444]/10 border-[#ff4444]/20" : "bg-white/5 border-white/10";
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-[52px] h-[60px] sm:w-[68px] sm:h-[76px] rounded-xl flex items-center justify-center border backdrop-blur-md shadow-inner ${bgClass}`}>
        <span className={`text-[24px] sm:text-[34px] font-[900] font-mono tracking-tighter ${colorClass}`}>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] font-bold text-[#6b7c8f] uppercase tracking-[1px]">{label}</span>
    </div>
  );
}
