"use client";

import { useState } from "react";
import { Settings, Eye, Music, LogOut, Type, Monitor } from "lucide-react";

const tabs = [
  { id: "general", label: "ข้อมูลพื้นฐาน (General)", icon: <Settings className="size-4" /> },
  { id: "visuals", label: "ตกแต่งหน้าเว็บ (Design)", icon: <Eye className="size-4" /> },
  { id: "music", label: "เสียงเพลง (Music)", icon: <Music className="size-4" /> },
  { id: "danger", label: "ลบแก๊ง (Danger Zone)", icon: <LogOut className="size-4" /> }
];

export function SettingsTabs({ 
  general, visuals, music, danger 
}: { 
  general: React.ReactNode; 
  visuals: React.ReactNode; 
  music: React.ReactNode;
  danger: React.ReactNode;
}) {
  const [active, setActive] = useState("general");
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              active === tab.id 
                ? (tab.id === 'danger' ? "bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-[#0084ff] text-white shadow-[0_0_15px_rgba(0,132,255,0.3)]") 
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      
      {/* 
        We use display:none (hidden class) instead of unmounting so the inputs 
        remain in the DOM and their values get submitted with the form.
      */}
      <div className={active === "general" ? "block space-y-[36px]" : "hidden"}>{general}</div>
      <div className={active === "visuals" ? "block space-y-[36px]" : "hidden"}>{visuals}</div>
      <div className={active === "music" ? "block space-y-[36px]" : "hidden"}>{music}</div>
      <div className={active === "danger" ? "block space-y-[36px]" : "hidden"}>{danger}</div>
    </div>
  )
}
