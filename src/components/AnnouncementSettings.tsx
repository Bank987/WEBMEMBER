"use client";

import { useState } from "react";
import { Megaphone, Save, LoaderCircle } from "lucide-react";
import { updateAnnouncement } from "@/actions/announcement";
import { Alert, AlertDescription } from "./ui/alert";

export function AnnouncementSettings({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  async function handleSave() {
    setIsSaving(true);
    setMessage(null);
    const result = await updateAnnouncement(data);
    if (result.success) {
      setMessage({ type: "success", text: "บันทึกประกาศสำเร็จแล้ว!" });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: "บันทึกไม่สำเร็จ: " + result.error });
    }
    setIsSaving(false);
  }

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0c1016] p-6 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="grid size-10 place-items-center rounded-xl bg-[#0084ff]/20 text-[#0084ff]">
          <Megaphone className="size-5" />
        </div>
        <div>
          <h2 className="text-[18px] font-[900] text-white">ตั้งค่าประกาศหน้าเว็บหลัก</h2>
          <p className="text-[11px] text-[#8ca3b8]">กำหนดข้อความประกาศลอยกลางจอเมื่อคนเข้าเว็บ</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
          <input 
            type="checkbox" 
            checked={data.isActive} 
            onChange={(e) => setData({ ...data, isActive: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-[#0084ff] focus:ring-[#0084ff]"
          />
          <span className="text-[13px] font-[900] text-white">เปิดใช้งานระบบประกาศ</span>
        </label>

        {data.isActive && (
          <div className="space-y-4 p-5 rounded-xl border border-[#0084ff]/20 bg-[#0084ff]/5">
            <div>
              <label className="block text-[11px] font-[900] text-white/50 mb-2 tracking-[1px] uppercase">หัวข้อประกาศ</label>
              <input 
                type="text" 
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="เช่น: ยินดีต้อนรับสู่เว็บรวมแก๊ง!"
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-[13px] text-white outline-none transition focus:border-[#0084ff]"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-[900] text-white/50 mb-2 tracking-[1px] uppercase">รายละเอียด</label>
              <textarea 
                value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
                placeholder="รายละเอียดประกาศ..."
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-[13px] text-white outline-none transition focus:border-[#0084ff] resize-none"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-[900] text-white/50 mb-2 tracking-[1px] uppercase">ลิงก์รูปภาพ (ตัวเลือก)</label>
              <input 
                type="url" 
                value={data.imageUrl}
                onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-[13px] text-white outline-none transition focus:border-[#0084ff]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex-1">
          {message && (
            <Alert variant={message.type === "success" ? "default" : "destructive"} className={`rounded-xl py-2 px-4 border ${message.type === "success" ? "border-green-500/30 bg-green-500/10 text-green-400" : ""}`}>
              <AlertDescription className="text-[11px] font-bold">{message.text}</AlertDescription>
            </Alert>
          )}
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="ml-4 flex items-center gap-2 rounded-xl bg-[#0084ff] px-6 py-3 text-[12px] font-[900] text-white transition hover:bg-[#0073e6] disabled:opacity-50"
        >
          {isSaving ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />}
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
}
