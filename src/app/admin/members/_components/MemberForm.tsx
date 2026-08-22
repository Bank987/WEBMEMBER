"use client";

import { Member } from "@/lib/db";
import { createMember, updateMember } from "@/actions/members";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, UploadCloud, Link as LinkIcon, UserCircle, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MemberForm({ member }: { member?: Member }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(member?.avatar || "");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (member) {
        const result = await updateMember(member.id, formData);
        if (!result.ok) { setError(result.error ?? "ไม่สามารถแก้ไขข้อมูลได้"); return; }
      } else {
        const result = await createMember(formData);
        if (!result.ok) { setError(result.error ?? "ไม่สามารถบันทึกข้อมูลได้"); return; }
      }
      router.replace("/admin/members");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#050505] border border-[#111111] p-[45px] rounded-[24px] max-w-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0084ff] blur-[150px] opacity-10 pointer-events-none" />
      {error && <Alert variant="destructive" className="relative z-10 mb-6 rounded-2xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>บันทึกข้อมูลไม่สำเร็จ</AlertTitle><AlertDescription><span>{error}</span>{error.includes("เซสชัน") && <Link href="/#auth" className="mt-3 inline-flex rounded-lg bg-[#ef4444]/15 px-3 py-2 font-[900] text-[#ffb0b0] hover:bg-[#ef4444]/25">เข้าสู่ระบบใหม่</Link>}</AlertDescription></Alert>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] relative z-10">
        
        {/* Left Column */}
        <div className="space-y-[27px]">
          <div>
            <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#888888] mb-[9px]">
              <UserCircle className="w-[12px] h-[12px]" />
              ชื่อสมาชิก
            </label>
            <input 
              type="text" 
              name="name" 
              defaultValue={member?.name} 
              required
              placeholder="เช่น ธันวา ใจดี"
              className="w-full bg-black/40 border border-white/10 rounded-[12px] py-[15px] px-[24px] text-[14px] text-white focus:outline-none focus:border-[#0084ff] focus:bg-[#0084ff]/5 transition-all duration-300 shadow-inner"
            />
          </div>

          <div>
            <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#888888] mb-[9px]">
              <Star className="w-[12px] h-[12px]" />
              ระดับสมาชิก
            </label>
            <div className="relative">
              <select 
                name="role" 
                defaultValue={member?.role || "MEMBER"} 
                className="w-full bg-black/40 border border-white/10 rounded-[12px] py-[15px] px-[24px] text-[14px] font-[900] text-white focus:outline-none focus:border-[#0084ff] focus:bg-[#0084ff]/5 transition-all duration-300 appearance-none shadow-inner"
              >
                <option value="FOUNDER">ผู้ก่อตั้ง (ระดับ 3)</option>
                <option value="LEADER">หัวหน้า (ระดับ 2)</option>
                <option value="MEMBER">สมาชิก (ระดับ 1)</option>
              </select>
              <div className="absolute right-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[8px] h-[8px] border-b-2 border-r-2 border-[#888888] rotate-45" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-[27px]">
          <div>
            <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#888888] mb-[9px]">
              <UploadCloud className="w-[12px] h-[12px]" />
              ลิงก์รูปโปรไฟล์
            </label>
            <div className="flex gap-[18px]">
              {preview ? (
                <img src={preview} alt="ตัวอย่างรูปโปรไฟล์" className="w-[54px] h-[54px] rounded-[12px] object-cover border border-white/10 shrink-0 shadow-lg" />
              ) : (
                <div className="w-[54px] h-[54px] rounded-[12px] bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                  <UserCircle className="w-[24px] h-[24px] text-white/20" />
                </div>
              )}
              <input 
                type="url" 
                name="avatar" 
                defaultValue={member?.avatar} 
                onChange={(e) => setPreview(e.target.value)}
                required
                placeholder="https://..."
                className="w-full bg-black/40 border border-white/10 rounded-[12px] py-[15px] px-[24px] text-[14px] text-white focus:outline-none focus:border-[#0084ff] focus:bg-[#0084ff]/5 transition-all duration-300 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#888888] mb-[9px]">
              <LinkIcon className="w-[12px] h-[12px]" />
              ลิงก์ Facebook (ไม่บังคับ)
            </label>
            <input 
              type="url" 
              name="facebookUrl" 
              defaultValue={member?.facebookUrl} 
              placeholder="https://facebook.com/..."
              className="w-full bg-black/40 border border-white/10 rounded-[12px] py-[15px] px-[24px] text-[14px] text-white focus:outline-none focus:border-[#0084ff] focus:bg-[#0084ff]/5 transition-all duration-300 shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="mt-[45px] flex items-center justify-end gap-[18px] pt-[27px] border-t border-[#111111] relative z-10">
        <Link href="/admin/members" className="text-[10.5px] font-[900] uppercase tracking-[3px] text-[#888888] hover:text-white transition-colors px-[24px] py-[12px]">
          ยกเลิก
        </Link>
        <button 
          type="submit" 
          disabled={loading}
          className="relative group bg-[#0084ff]/10 border border-[#0084ff]/30 text-[#0084ff] hover:bg-[#0084ff] hover:text-white px-[36px] py-[12px] rounded-full text-[10.5px] font-[900] uppercase tracking-[3px] transition-all duration-300 shadow-[0_0_20px_rgba(0,132,255,0.2)] hover:shadow-[0_0_30px_rgba(0,132,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>
      </div>
    </form>
  );
}
