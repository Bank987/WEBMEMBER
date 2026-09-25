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

                  <div className="space-y-2 text-left">
            <label className="text-[11px] font-bold text-white/70 tracking-widest uppercase ml-1">Social Media (?????????)</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                name="socialPlatform"
                defaultValue="facebook"
                className="sm:w-[150px] bg-black/50 border border-white/10 focus:border-[#0084ff]/50 rounded-2xl py-3.5 px-4 text-sm text-white outline-none transition-all shadow-inner appearance-none cursor-pointer"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
              <div className="relative group flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#0084ff] transition-colors" />
                <input name="socialUrl" type="url" placeholder="https://..." className="w-full bg-black/50 border border-white/10 focus:border-[#0084ff]/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all shadow-inner" />
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


