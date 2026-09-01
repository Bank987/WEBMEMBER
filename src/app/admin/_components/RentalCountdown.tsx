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
      <div className="flex items-center gap-2 rounded-full border border-[#ffd700]/30 bg-[#ffd700]/10 px-4 py-2">
        <Crown className="size-3.5 text-[#ffd700]" />
        <span className="text-[10px] font-[900] tracking-[1px] text-[#ffd700] uppercase">
          แพ็คเกจ VIP : ตลอดชีพ (ต่อสัญญาอัตโนมัติ)
        </span>
      </div>
    );
  }

  const isDanger = timeLeft.days < 3;
  const colorClass = isDanger ? "text-[#ff4444]" : "text-[#82c8ff]";
  const bgClass = isDanger ? "bg-[#ff4444]/10 border-[#ff4444]/30" : "bg-[#0084ff]/10 border-[#0084ff]/30";

  return (
    <div className={`flex items-center gap-3 rounded-full border px-4 py-1.5 backdrop-blur-md ${bgClass}`}>
      <Clock className={`size-3.5 animate-pulse ${colorClass}`} />
      <span className={`text-[9px] sm:text-[10px] font-[900] tracking-[1px] uppercase mr-1 hidden sm:inline-block ${colorClass}`}>
        {isExpired ? "หมดอายุ" : "เวลาคงเหลือ"}
      </span>
      
      <div className="flex items-center gap-1.5">
        <MiniTime value={timeLeft.days} label="วัน" isDanger={isDanger} />
        <span className={`text-[12px] font-bold ${isDanger ? 'text-[#ff4444]/50' : 'text-[#82c8ff]/50'}`}>:</span>
        <MiniTime value={timeLeft.hours} label="ชม" isDanger={isDanger} />
        <span className={`text-[12px] font-bold ${isDanger ? 'text-[#ff4444]/50' : 'text-[#82c8ff]/50'}`}>:</span>
        <MiniTime value={timeLeft.minutes} label="น" isDanger={isDanger} />
        <span className={`text-[12px] font-bold ${isDanger ? 'text-[#ff4444]/50' : 'text-[#82c8ff]/50'}`}>:</span>
        <MiniTime value={timeLeft.seconds} label="วิ" isDanger={isDanger} />
      </div>
    </div>
  );
}

function MiniTime({ value, label, isDanger }: { value: number, label: string, isDanger: boolean }) {
  const color = isDanger ? "text-[#ff4444]" : "text-white";
  return (
    <div className="flex items-baseline gap-1">
      <span className={`text-[13px] sm:text-[15px] font-[900] font-mono tracking-tighter ${color}`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className={`text-[8px] font-bold uppercase tracking-wider ${isDanger ? 'text-[#ff4444]/70' : 'text-[#82c8ff]/70'}`}>
        {label}
      </span>
    </div>
  );
}
