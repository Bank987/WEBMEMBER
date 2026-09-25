"use client";

import { useState } from "react";
import { Lightbulb, CheckCircle, Clock, Check, MoreHorizontal } from "lucide-react";

type Suggestion = {
  id: string;
  topic: string;
  description: string;
  senderName: string;
  contactInfo: string;
  status: "NEW" | "REVIEWED" | "IMPLEMENTED";
  createdAt: string;
};

export function SuperAdminSuggestions({ initialSuggestions }: { initialSuggestions: Suggestion[] }) {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleStatusChange = async (id: string, newStatus: "NEW" | "REVIEWED" | "IMPLEMENTED") => {
    // Optimistic update
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));

    const res = await fetch(`/api/super-admin/suggestions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) {
      alert("Failed to update status");
      // Could revert here if needed
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 backdrop-blur-md">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Lightbulb className="size-5 text-amber-500" />
          </div>
          <h2 className="text-[20px] font-[900]">ข้อเสนอระบบ & ไอเดีย</h2>
        </div>
        <div className="text-[11px] font-[800] text-white/50">{suggestions.length} ข้อเสนอ</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.length === 0 ? (
          <div className="col-span-full py-10 text-center text-white/40">ยังไม่มีข้อเสนอระบบใหม่</div>
        ) : (
          suggestions.map(s => (
            <div key={s.id} className="flex flex-col justify-between gap-4 rounded-[20px] border border-white/5 bg-white/5 p-5 transition hover:bg-white/10">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-[9px] font-[900] tracking-wider uppercase ${
                    s.status === 'NEW' ? 'bg-amber-500/20 text-amber-500' :
                    s.status === 'REVIEWED' ? 'bg-[#0084ff]/20 text-[#0084ff]' :
                    'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {s.status}
                  </span>
                  <span className="text-[10px] text-white/40">{new Date(s.createdAt).toLocaleDateString("th-TH")}</span>
                </div>
                <h3 className="text-[14px] font-[800] mb-2">{s.topic}</h3>
                <p className="text-[12px] text-white/60 leading-relaxed line-clamp-4">{s.description}</p>
              </div>
              
              <div className="mt-2 pt-4 border-t border-white/10 flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/40 uppercase">จาก</span>
                    <span className="text-[12px] font-[800] text-amber-500">{s.senderName}</span>
                    {s.contactInfo && <span className="text-[10px] text-white/60">{s.contactInfo}</span>}
                  </div>
                  
                  <div className="flex gap-2">
                    {s.status === 'NEW' && (
                      <button onClick={() => handleStatusChange(s.id, 'REVIEWED')} className="p-2 rounded-lg bg-[#0084ff]/20 text-[#0084ff] hover:bg-[#0084ff] hover:text-white transition" title="อ่านแล้ว">
                        <Clock className="size-4" />
                      </button>
                    )}
                    {s.status !== 'IMPLEMENTED' && (
                      <button onClick={() => handleStatusChange(s.id, 'IMPLEMENTED')} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition" title="เพิ่มเข้าระบบแล้ว">
                        <Check className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
