"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus, Fingerprint, ShieldAlert, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WebsiteComposer } from "@/components/WebsiteComposer";
import { getGangUrl } from "@/lib/site-url";
import { Turnstile } from "@marsidev/react-turnstile";

type Mode = "register" | "login";

export default function GangAuth() {
  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const router = useRouter();

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setStatus("idle");
    setMessage("");
  }
  const [recoveryPin, setRecoveryPin] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const body = mode === "register" 
      ? { pageTitle: name, subdomain: slug, recoveryPin, cfTurnstileResponse: turnstileToken } 
      : { subdomain: slug, token: secret, cfTurnstileResponse: turnstileToken };

    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = (await response.json()) as { error?: string; subdomain?: string; token?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "ดำเนินการไม่สำเร็จ");
        return;
      }
      if (mode === "login") {
        window.location.href = "/admin";
        return;
      }
      setToken(data.token ?? "");
      setStatus("success");
      setMessage(data.subdomain ?? slug);
    } catch {
      setStatus("error");
      setMessage("ไม่สามารถเชื่อมต่อระบบยืนยันตัวตนได้");
    }
  }

  if (status === "success" && token) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.98 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        className="w-full max-w-[540px] relative mx-auto"
      >
        <div className="absolute inset-0 bg-[#0084ff]/20 blur-[100px] rounded-full" />
        <div className="relative rounded-[32px] p-[1px] overflow-hidden bg-gradient-to-b from-white/10 to-white/5 shadow-2xl backdrop-blur-2xl">
          <div className="relative w-full bg-[#050505]/90 rounded-[31px] p-10 z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-[#0084ff] to-[#004b99] flex items-center justify-center shadow-[0_0_20px_rgba(0,132,255,0.4)]">
                <Check className="size-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">สร้างเว็บไซต์สำเร็จ</h3>
                <p className="text-[11px] text-[#0084ff] font-bold tracking-[2px] uppercase mt-1">System Deployed</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[11px] text-white/50 font-bold mb-2 tracking-wide">DOMAIN ADDRESS</p>
                <div className="bg-[#0a0a0a] rounded-2xl p-4 flex items-center justify-between border border-white/5 shadow-inner">
                  <span className="font-mono text-white text-[15px]">{message}<span className="text-white/30">.lastname.site</span></span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] text-[#ef4444] font-bold flex items-center gap-1.5 tracking-wide"><ShieldAlert className="size-3" /> MASTER KEY (รหัสลับผู้ดูแล)</p>
                </div>
                  <div className="bg-gradient-to-r from-[#ef4444]/10 to-transparent border border-[#ef4444]/20 rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#ef4444]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <code className="text-[#ef4444] font-mono text-[13px] sm:text-[15px] tracking-[1px] sm:tracking-[2px] relative z-10 break-all flex-1">{token}</code>
                    <button type="button" onClick={() => navigator.clipboard.writeText(token)} className="text-[#ef4444]/80 hover:text-[#ef4444] p-2.5 bg-[#ef4444]/10 rounded-xl transition-colors relative z-10 hover:bg-[#ef4444]/20 shrink-0">
                      <Copy className="size-4.5" />
                    </button>
                  </div>
                <p className="text-[11px] text-[#ef4444]/70 mt-3 font-medium leading-relaxed">
                  * คัดลอกและเก็บรหัสนี้ไว้ในที่ปลอดภัย ระบบจะไม่แสดงรหัสนี้อีกครั้ง
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a href={getGangUrl(message)} className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-[13px] font-bold text-black transition-all hover:scale-[1.02] overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <span className="relative z-10 flex items-center gap-2">เข้าสู่หน้าเว็บไซต์ <ArrowRight className="size-4" /></span>
                </a>
                <button type="button" onClick={() => { setStatus("idle"); setToken(""); setName(""); setSlug(""); setSecret(""); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-transparent hover:bg-white/5 px-7 py-4 text-[12px] font-bold text-white/50 transition-all hover:text-white active:scale-[0.98]">
                  <X className="size-4" /> ปิดหน้าต่างนี้
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative group">
      
      {/* Super Beautiful Animated Border Wrapper */}
      <div className="relative w-full rounded-[32px] p-[1px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#050505_25%,#0084ff_50%,#050505_75%,#000000_100%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Inner Content Box */}
        <div className="relative w-full rounded-[31px] bg-[#050505]/95 backdrop-blur-3xl overflow-hidden p-8 sm:p-12 z-10 h-full">
          
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5 bg-black/50 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="size-2 bg-[#0084ff] rounded-full animate-pulse shadow-[0_0_10px_#0084ff]" />
              <span className="text-[9px] font-black text-[#0084ff] tracking-[0.15em] uppercase">Security Level : Max</span>
            </div>
            <Fingerprint className="size-5 text-white/20" />
          </div>
          
          {/* Beautiful Floating Tabs */}
          <div className="relative flex rounded-[20px] bg-[#000000] p-1.5 mb-10 border border-white/10 shadow-inner">
            <motion.div layoutId="auth-mode" className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[14px] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]" animate={{ x: mode === "register" ? "0%" : "100%" }} transition={{ type: "spring", stiffness: 400, damping: 35 }} />
            <button type="button" onClick={() => switchMode("register")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2 py-4 text-[12px] font-bold tracking-wide transition-colors ' + (mode === "register" ? "text-white" : "text-white/40 hover:text-white")}><UserPlus className="size-4" /> สมัครเว็บ</button>
            <button type="button" onClick={() => switchMode("login")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2 py-4 text-[12px] font-bold tracking-wide transition-colors ' + (mode === "login" ? "text-white" : "text-white/40 hover:text-white")}><LogIn className="size-4" /> เข้าหลังบ้าน</button>
          </div>

          <form onSubmit={submit} className="w-full space-y-6">
            <AnimatePresence initial={false} mode="wait">
            {mode === "register" && (
              <>
                <motion.div key="website-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[11px] font-bold text-white/50 mb-2.5 ml-1 tracking-wide">Faction Name</label>
                  <div className="relative group/input">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0084ff] to-transparent opacity-0 group-focus-within/input:opacity-20 rounded-2xl blur transition-opacity duration-500" />
                    <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ชื่อแก๊งของคุณ" className="relative w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4.5 text-[15px] text-white outline-none transition-all focus:border-[#0084ff]/50 focus:bg-black placeholder:text-white/20 font-medium shadow-inner" />
                  </div>
                </motion.div>
                
                <motion.div key="recovery-pin" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[11px] font-bold text-[#ff4444] mb-2.5 ml-1 tracking-wide mt-2">Recovery PIN (รหัสกู้คืน 6 หลัก)</label>
                  <div className="relative group/input">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff4444] to-transparent opacity-0 group-focus-within/input:opacity-20 rounded-2xl blur transition-opacity duration-500" />
                    <input aria-label="รหัส PIN 6 หลัก" value={recoveryPin} onChange={(e) => setRecoveryPin(e.target.value.replace(/\D/g, '').slice(0, 6))} required pattern="\d{6}" placeholder="ตั้งรหัสตัวเลข 6 หลัก" className="relative w-full rounded-2xl border border-[#ff4444]/20 bg-[#0a0a0a] px-5 py-4.5 text-[16px] text-white text-center tracking-[0.5em] font-mono outline-none transition-all focus:border-[#ff4444]/50 focus:bg-black placeholder:text-white/20 placeholder:tracking-normal shadow-inner" />
                  </div>
                  <p className="text-[11px] text-white/40 mt-2.5 ml-1 font-medium leading-relaxed">* ใช้สำหรับกู้คืนเว็บไซต์กรณีที่คุณลืม Master Key ห้ามลืมเด็ดขาด</p>
                </motion.div>
              </>
            )}
            </AnimatePresence>
            
            <motion.div layout>
              <label className="block text-[11px] font-bold text-white/50 mb-2.5 ml-1 tracking-wide">{mode === "register" ? "Subdomain (URL)" : "Target Subdomain"}</label>
              <div className="relative group/input">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0084ff] to-transparent opacity-0 group-focus-within/input:opacity-20 rounded-2xl blur transition-opacity duration-500" />
                <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#0a0a0a] px-4 py-4.5 transition-all focus-within:border-[#0084ff]/50 focus-within:bg-black shadow-inner">
                  <span className="text-white/30 font-bold text-[14px] hidden sm:block">https://</span>
                  <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="subdomain" className="bg-transparent text-white font-bold text-[16px] w-full min-w-0 outline-none px-2 placeholder:text-white/20" />
                  <span className="text-[#0084ff] font-bold text-[13px] whitespace-nowrap">.lastname.site</span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {mode === "register" && (
                <motion.div key="composer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <WebsiteComposer name={name} slug={slug} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="wait">
              {mode === "login" && (
                <motion.div key="secret" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[11px] font-bold text-white/50 mb-2.5 ml-1 tracking-wide">Master Key</label>
                  <div className="relative group/input">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0084ff] to-transparent opacity-0 group-focus-within/input:opacity-20 rounded-2xl blur transition-opacity duration-500" />
                    <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="relative w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4.5 text-[16px] text-white outline-none transition-all focus:border-[#0084ff]/50 focus:bg-black placeholder:text-white/20 tracking-[0.2em] shadow-inner" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
                onSuccess={(t) => setTurnstileToken(t)} 
                options={{ theme: "dark" }}
              />
            </div>

            <button disabled={status === "loading" || !turnstileToken} type="submit" className="relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-[13px] font-black tracking-[1px] text-black transition-all hover:scale-[1.02] disabled:opacity-50 overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                {status === "loading" ? "กำลังดำเนินการ..." : mode === "register" ? "สมัครรับเว็บ" : "เข้าสู่ระบบหลังบ้าน"}
                {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
          
          <div aria-live="polite" className="mt-5 min-h-[24px]">
            {status === "error" && (
              <Alert variant="destructive" className="rounded-2xl border-[#ef4444]/30 bg-[#ef4444]/10 text-white backdrop-blur-md py-4 px-5 flex items-center gap-3">
                <AlertCircle className="text-[#ef4444] size-4.5 shrink-0" />
                <AlertDescription className="text-[12px] font-medium text-white/90">{message}</AlertDescription>
              </Alert>
            )}
          </div>

          <AnimatePresence>
            {mode === "login" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 text-center border-t border-white/5 pt-8"
              >
                <p className="text-[12px] font-bold text-[#0084ff]">
                  ลืม MASTER KEY?
                </p>
                <p className="mt-3 text-[11px] text-white/40 leading-relaxed max-w-[280px] mx-auto font-medium">
                  หากคุณเป็นเจ้าของเว็บไซต์และลืมรหัสผ่าน โปรดติดต่อฝ่ายสนับสนุน (SUPPORT) เพื่อยืนยันตัวตนและขอรับรหัสใหม่
                </p>
                <a href="#" className="inline-flex items-center justify-center mt-5 rounded-[14px] bg-white/5 border border-white/10 px-6 py-3 text-[11px] font-bold text-white transition hover:bg-white/10 hover:border-white/20">
                  ติดต่อ SUPPORT
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}