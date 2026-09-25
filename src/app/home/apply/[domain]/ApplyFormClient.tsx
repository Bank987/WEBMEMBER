"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Link as LinkIcon, Image as ImageIcon, Send, ArrowLeft, CheckCircle2 } from "lucide-react";
import { submitApplication } from "@/actions/apply";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Turnstile } from "@marsidev/react-turnstile";

export function ApplyFormClient({ gangName, domain }: { gangName: string, domain: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("facebook");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert("กรุณายืนยันว่าคุณไม่ใช่บอท");
      return;
    }
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      avatar: formData.get("avatar") as string,
      socialPlatform: formData.get("socialPlatform") as "facebook" | "instagram" | "tiktok" | undefined,
        socialUrl: formData.get("socialUrl") as string,
      token: turnstileToken
    };

    const res = await submitApplication(domain, data);
    setLoading(false);

    if (res.error) {
      alert(res.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        // Redirect to the gang's actual subdomain
        window.location.href = `//${domain}.lastname.site`;
      }, 3000);
    }
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0c1017]/90 border border-white/10 rounded-[32px] p-10 text-center backdrop-blur-2xl shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-[900] text-white tracking-wide mb-2">ส่งคำขอสำเร็จ!</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          เราได้รับข้อมูลของคุณเรียบร้อยแล้ว<br />โปรดรอแอดมินพิจารณาและอนุมัติเข้าสู่แก๊ง
        </p>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3, ease: "linear" }} className="h-full bg-emerald-500" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0c1017]/90 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0084ff] to-transparent opacity-50" />
      
      <Link href={`//${domain}.lastname.site`} className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors mb-8">
        <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้าแก๊ง
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-[900] text-white tracking-tight mb-2">สมัครเข้าแก๊ง</h1>
        <p className="text-white/50 text-sm font-medium">กรอกข้อมูลเพื่อส่งคำขอเข้าร่วม <strong className="text-white">{gangName}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase ml-1">ชื่อในเกม</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#0084ff] transition-colors" />
            <input required name="name" type="text" placeholder="ระบุชื่อที่ต้องการให้แสดง" className="w-full bg-black/50 border border-white/10 focus:border-[#0084ff]/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all shadow-inner" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase ml-1">ลิ้งก์รูปโปรไฟล์ (URL)</label>
          <div className="relative group">
            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#0084ff] transition-colors" />
            <input required name="avatar" type="url" placeholder="https://example.com/image.jpg" className="w-full bg-black/50 border border-white/10 focus:border-[#0084ff]/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all shadow-inner" />
          </div>
        </div>

                                      <div className="space-y-3 text-left">
            <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase ml-1">Social Media (?????????????)</label>
            <input type="hidden" name="socialPlatform" value={socialPlatform} />
            
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-1.5 bg-black/60 p-1.5 rounded-[18px] border border-white/5 backdrop-blur-xl shadow-inner relative">
                {[
                  { id: 'facebook', name: 'Facebook', color: 'hover:bg-[#1877F2]/10 hover:text-[#1877F2]', active: 'bg-[#1877F2] text-white shadow-[0_4px_20px_rgba(24,119,242,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                  { id: 'instagram', name: 'Instagram', color: 'hover:bg-[#E1306C]/10 hover:text-[#E1306C]', active: 'bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-white shadow-[0_4px_20px_rgba(225,48,108,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                  { id: 'tiktok', name: 'TikTok', color: 'hover:bg-white/10 hover:text-white', active: 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.4)]', icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.64 3.84-1.85 5.34-1.21 1.48-2.9 2.5-4.8 2.87-2.06.4-4.22-.05-5.95-1.17-1.74-1.1-2.9-2.73-3.32-4.7-.42-1.95-.08-4.04 1.02-5.74 1.1-1.7 2.75-2.84 4.7-3.23 1.93-.38 3.98.05 5.56 1.13v4.44c-1.3-.87-3.05-1.07-4.52-.46-1.44.57-2.48 1.92-2.58 3.48-.1 1.57.8 3.04 2.22 3.65 1.43.6 3.12.35 4.3-.65 1.18-1 1.84-2.5 1.83-4.1V0h-2.69v.02z"/></svg> }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSocialPlatform(p.id)}
                    className={`flex items-center justify-center gap-[6px] px-3 py-2.5 rounded-[14px] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
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
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-focus-within:opacity-10 pointer-events-none ${socialPlatform === 'facebook' ? 'bg-[#1877F2]' : socialPlatform === 'instagram' ? 'bg-[#E1306C]' : 'bg-white'}`} />
                <LinkIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${socialPlatform === 'facebook' ? 'text-[#1877F2]/50 group-focus-within:text-[#1877F2]' : socialPlatform === 'instagram' ? 'text-[#E1306C]/50 group-focus-within:text-[#E1306C]' : 'text-white/30 group-focus-within:text-white'}`} />
                <input 
                  name="socialUrl" 
                  type="url" 
                  placeholder={socialPlatform === 'facebook' ? "https://facebook.com/..." : socialPlatform === 'instagram' ? "https://instagram.com/..." : "https://tiktok.com/@..."}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none focus:border-white/20 transition-all shadow-inner" 
                />
              </div>
            </div>
          </div>

        <div className="flex justify-center pt-2">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
            onSuccess={(t) => setTurnstileToken(t)} 
            options={{ theme: "dark" }}
          />
        </div>

        <button disabled={loading || !turnstileToken} type="submit" className="w-full mt-4 flex items-center justify-center gap-2 bg-[#0084ff] hover:bg-[#0073e6] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl py-4 text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(0,132,255,0.3)] hover:shadow-[0_0_30px_rgba(0,132,255,0.5)]">
          {loading ? "กำลังส่งคำขอ..." : "ส่งคำขอเข้าร่วม"}
          {!loading && <Send className="w-4 h-4" />}
        </button>
      </form>
    </motion.div>
  );
}





