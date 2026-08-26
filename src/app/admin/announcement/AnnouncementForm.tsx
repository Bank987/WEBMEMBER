"use client";

import { useState } from "react";
import { saveAnnouncementSettings } from "@/actions/settings";
import { LoaderCircle, CheckCircle2, AlertCircle } from "lucide-react";

export function AnnouncementForm({ enabled, message }: { enabled: boolean; message: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const formData = new FormData(e.currentTarget);
      await saveAnnouncementSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#050505] border border-[#111111] rounded-[24px] overflow-hidden">
      <div className="p-[24px] space-y-6">
        
        {/* Toggle Enable */}
        <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-[16px] p-[20px]">
          <div>
            <h3 className="text-[14px] font-[900] text-white">เปิดใช้งานประกาศ</h3>
            <p className="text-[11px] text-[#777] mt-1">แสดงประกาศในหน้าเว็บของแก๊งคุณ</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="announcementEnabled" value="true" defaultChecked={enabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0084ff]"></div>
          </label>
        </div>

        {/* Message Input */}
        <div className="space-y-3">
          <label className="text-[12px] font-[900] text-white uppercase tracking-widest flex items-center gap-2">
            ข้อความประกาศ
          </label>
          <textarea 
            name="announcementMessage" 
            defaultValue={message}
            placeholder="เช่น ยินดีต้อนรับสมาชิกใหม่! คืนนี้มีกิจกรรม..."
            className="w-full h-[120px] bg-black/50 border border-white/10 rounded-[16px] p-[16px] text-[13px] text-white focus:border-[#0084ff] outline-none transition-colors resize-none"
          />
        </div>

      </div>

      <div className="bg-[#0a0a0a] p-[18px] border-t border-[#111111] flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-[#0084ff] text-white px-[24px] py-[12px] rounded-full text-[11px] font-[900] uppercase tracking-[1px] transition-all hover:bg-[#0070d9] hover:shadow-[0_0_20px_rgba(0,132,255,0.3)] disabled:opacity-50"
        >
          {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          {success ? "บันทึกสำเร็จ!" : "บันทึกการตั้งค่า"}
        </button>
      </div>
    </form>
  );
}
