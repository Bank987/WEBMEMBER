"use client";

import { Member } from "@/lib/db";
import { createMember, updateMember } from "@/actions/members";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, UploadCloud, Link as LinkIcon, UserCircle, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MemberForm({ member }: { member?: Member }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(member?.avatar || "");
  const [error, setError] = useState("");
  const [role, setRole] = useState(member?.role || "MEMBER");
  const [socialPlatform, setSocialPlatform] = useState(member?.socialPlatform || "facebook");

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
      {error && <Alert variant="destructive" className="relative z-10 mb-6 rounded-2xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>บันทึกข้อมูลไม่สำเร็จ</AlertTitle><AlertDescription><span>{error}</span>{error.includes("เซสชัน") && <Link href="/#auth" className="mt-3 inline-flex rounded-lg bg-[#ef4444]/15 px-3 py-2 font-[900] text-[#ffb0b0] hover:bg-[#ef4444]/25">เข้าสู่ระบบ</Link>}</AlertDescription></Alert>}
      
      <div className="mb-[27px] rounded-2xl bg-[#0084ff]/10 border border-[#0084ff]/30 p-4 relative z-10">
        <p className="text-[#4db0ff] text-[13px] font-bold mb-2">💡 แนะนำสำหรับการฝากรูปภาพ</p>
        <p className="text-white/80 text-[12px] leading-relaxed">
          เว็บฝากรูป : <a href="https://postimages.org/" target="_blank" rel="noreferrer" className="text-white hover:underline font-bold">https://postimages.org/</a> สำหรับใครที่รูปไม่ขึ้นโชว์ (ไม่แนะนำให้ก็อปลิงก์จาก Discord เพราะมี Timestamp)
          <br/>
          <span className="text-[#888888] mt-1 block">1. กด Uploads เลือกรูป &nbsp; 2. ก็อปปี้ลิงก์อันที่ 2 <strong>Direct link (ลิงก์ตรง)</strong> แล้วนำมาใส่ในช่อง</span>
        </p>
      </div>
      
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
              ตำแหน่งสมาชิก
            </label>
            <div className="relative">
              <select 
                name="role" 
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-black/40 border border-white/10 rounded-[12px] py-[15px] px-[24px] text-[14px] font-[900] text-white focus:outline-none focus:border-[#0084ff] focus:bg-[#0084ff]/5 transition-all duration-300 appearance-none shadow-inner"
              >
                <option value="FOUNDER" className="bg-[#111111] text-white">ผู้ก่อตั้ง</option>
                <option value="LEADER" className="bg-[#111111] text-white">ผู้นำ</option>
                <option value="SUPPORT" className="bg-[#111111] text-white">ซัพพอร์ต</option>
                <option value="MEMBER" className="bg-[#111111] text-white">สมาชิก</option>
              </select>
              <div className="absolute right-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[8px] h-[8px] border-b-2 border-r-2 border-[#888888] rotate-45" />
              </div>
            </div>
          </div>

          {role === "SUPPORT" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-[27px]">
              <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#ff88cc] mb-[9px]">
                <Star className="w-[12px] h-[12px]" />
                อันดับความสำคัญของ SUPPORT
              </label>
              <p className="text-[11px] text-[#888888] mb-[9px] leading-relaxed">
                เลือกลำดับที่จะแสดงผลในหน้าสมาชิก: <br/>
                - <strong>ระดับ 2:</strong> จะแสดงผลต่อจากผู้ก่อตั้ง (FOUNDER) <br/>
                - <strong>ระดับ 3:</strong> จะแสดงผลต่อจากผู้นำ (LEADER)
              </p>
              <div className="relative">
                <select 
                  name="supportPosition" 
                  defaultValue={member?.supportPosition || 3} 
                  className="w-full bg-[#ff88cc]/10 border border-[#ff88cc]/30 rounded-[12px] py-[15px] px-[24px] text-[14px] font-[900] text-[#ff88cc] focus:outline-none focus:border-[#ff88cc] transition-all duration-300 appearance-none shadow-inner"
                >
                  <option value={2} className="bg-[#111111] text-white">ระดับ 2 (อยู่ล่าง FOUNDER)</option>
                  <option value={3} className="bg-[#111111] text-white">ระดับ 3 (อยู่ล่าง LEADER)</option>
                </select>
                <div className="absolute right-[24px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-[8px] h-[8px] border-b-2 border-r-2 border-[#ff88cc] rotate-45" />
                </div>
              </div>
            </motion.div>
          )}

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
              <label className="flex items-center gap-[6px] text-[10px] font-[900] uppercase tracking-[3px] text-[#888888] mb-[12px]">
                <LinkIcon className="w-[12px] h-[12px]" />
                Social Media (?????????)
              </label>
              <input type="hidden" name="socialPlatform" value={socialPlatform} />
              
              <div className="flex flex-col gap-[12px]">
                <div className="grid grid-cols-3 gap-[6px] bg-black/60 p-[6px] rounded-[18px] border border-white/5 backdrop-blur-xl shadow-inner relative">
                  {[
                    { id: 'facebook', name: 'Facebook', color: 'hover:bg-[#1877F2]/10 hover:text-[#1877F2]', active: 'bg-[#1877F2] text-white shadow-[0_4px_20px_rgba(24,119,242,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    { id: 'instagram', name: 'Instagram', color: 'hover:bg-[#E1306C]/10 hover:text-[#E1306C]', active: 'bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-white shadow-[0_4px_20px_rgba(225,48,108,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                    { id: 'tiktok', name: 'TikTok', color: 'hover:bg-white/10 hover:text-white', active: 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.64 3.84-1.85 5.34-1.21 1.48-2.9 2.5-4.8 2.87-2.06.4-4.22-.05-5.95-1.17-1.74-1.1-2.9-2.73-3.32-4.7-.42-1.95-.08-4.04 1.02-5.74 1.1-1.7 2.75-2.84 4.7-3.23 1.93-.38 3.98.05 5.56 1.13v4.44c-1.3-.87-3.05-1.07-4.52-.46-1.44.57-2.48 1.92-2.58 3.48-.1 1.57.8 3.04 2.22 3.65 1.43.6 3.12.35 4.3-.65 1.18-1 1.84-2.5 1.83-4.1V0h-2.69v.02z"/></svg> }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSocialPlatform(p.id as any)}
                      className={`flex items-center justify-center gap-[6px] px-[12px] py-[10px] rounded-[14px] text-[10px] sm:text-[11px] font-[800] tracking-[1.5px] uppercase transition-all duration-300 ${
                        socialPlatform === p.id 
                          ? `${p.active} scale-[1.02] z-10` 
                          : `text-white/40 border border-transparent ${p.color}`
                      }`}
                    >
                      {p.icon}
                      <span className="hidden sm:inline-block">{p.name}</span>
                    </button>
                  ))}
                </div>
                
                <div className="relative group">
                  <div className={`absolute inset-0 rounded-[16px] transition-opacity duration-300 opacity-0 group-focus-within:opacity-10 pointer-events-none ${socialPlatform === 'facebook' ? 'bg-[#1877F2]' : socialPlatform === 'instagram' ? 'bg-[#E1306C]' : 'bg-white'}`} />
                  <LinkIcon className={`absolute left-[18px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] transition-colors duration-300 ${socialPlatform === 'facebook' ? 'text-[#1877F2]/50 group-focus-within:text-[#1877F2]' : socialPlatform === 'instagram' ? 'text-[#E1306C]/50 group-focus-within:text-[#E1306C]' : 'text-white/30 group-focus-within:text-white'}`} />
                  <input 
                    type="url" 
                    name="socialUrl" 
                    defaultValue={member?.socialUrl || member?.facebookUrl} 
                    placeholder={socialPlatform === 'facebook' ? "https://facebook.com/..." : socialPlatform === 'instagram' ? "https://instagram.com/..." : "https://tiktok.com/@..."}
                    className="w-full bg-black/40 border border-white/10 rounded-[16px] py-[16px] pl-[45px] pr-[24px] text-[14px] text-white focus:outline-none focus:border-white/20 transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>
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






