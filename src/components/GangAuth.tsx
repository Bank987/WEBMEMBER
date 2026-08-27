"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus, Fingerprint, ShieldAlert, Check, X, ShieldCheck } from "lucide-react";
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
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-[600px] relative"
      >
        <div className="absolute inset-0 bg-[#0084ff] opacity-20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative border border-white/20 bg-black/80 backdrop-blur-3xl p-10 rounded-[32px] shadow-[0_0_80px_rgba(0,132,255,0.2)] overflow-hidden">
          
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#0084ff] to-transparent opacity-50" />
          
          <div className="flex items-center gap-5 mb-10 border-b border-white/10 pb-8">
            <div className="size-14 rounded-full bg-gradient-to-br from-[#0084ff] to-[#004b99] flex items-center justify-center shadow-[0_0_30px_rgba(0,132,255,0.5)]">
              <Check className="size-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">สร้างเว็บไซต์สำเร็จ</h3>
              <p className="text-[12px] text-[#0084ff] font-bold tracking-[3px] uppercase mt-1">System Deployed</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] text-white/50 font-black mb-3 tracking-[2px]">DOMAIN ADDRESS</p>
              <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                <span className="font-mono text-white text-[15px]">{message}<span className="text-white/30">.lastname.site</span></span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#ef4444] font-black flex items-center gap-2 tracking-[2px]"><ShieldAlert className="size-3.5" /> MASTER KEY (รหัสลับผู้ดูแล)</p>
              </div>
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-2xl p-5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ef4444]/0 via-[#ef4444]/5 to-[#ef4444]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex justify-between items-center relative z-10">
                  <code className="text-[#ef4444] font-mono text-[16px] tracking-[4px]">{token}</code>
                  <button type="button" onClick={() => navigator.clipboard.writeText(token)} className="text-[#ef4444]/70 hover:text-[#ef4444] p-2.5 bg-[#ef4444]/10 rounded-xl transition-colors hover:bg-[#ef4444]/20">
                    <Copy className="size-4.5" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#ef4444]/70 mt-3 font-bold leading-relaxed flex items-start gap-2">
                <ShieldCheck className="size-4 shrink-0 mt-0.5" /> คัดลอกและเก็บรหัสนี้ไว้ในที่ปลอดภัย ระบบจะไม่แสดงรหัสนี้อีกครั้ง
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <a href={getGangUrl(message)} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-[13px] font-black tracking-[2px] text-black transition-all hover:bg-[#e0e0e0] active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                เข้าสู่หน้าเว็บไซต์ <ArrowRight className="size-4.5" />
              </a>
              <button type="button" onClick={() => { setStatus("idle"); setToken(""); setName(""); setSlug(""); setSecret(""); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-transparent border border-white/10 px-8 py-4 text-[12px] font-bold tracking-[1px] text-white/50 transition-all hover:bg-white/5 hover:text-white active:scale-[0.98]">
                ปิดหน้าต่างนี้
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative group">
      {/* Outer Luxury Glow */}
      <div className="absolute -inset-[1px] rounded-[34px] bg-gradient-to-br from-white/20 via-transparent to-white/5 opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative w-full rounded-[32px] border border-white/20 bg-[#030303]/80 backdrop-blur-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="p-8 sm:p-12">
          
          <div className="relative flex rounded-2xl border border-white/10 bg-[#080808] p-1.5 mb-10 shadow-inner">
            <motion.div layoutId="auth-mode-luxury" className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]" animate={{ x: mode === "register" ? "0%" : "100%" }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />
            <button type="button" onClick={() => switchMode("register")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2.5 py-4 text-[11px] sm:text-[12px] font-black tracking-[2px] uppercase transition-colors ' + (mode === "register" ? "text-black" : "text-white/40 hover:text-white")}><UserPlus className="size-4" /> สมัครเว็บ</button>
            <button type="button" onClick={() => switchMode("login")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2.5 py-4 text-[11px] sm:text-[12px] font-black tracking-[2px] uppercase transition-colors ' + (mode === "login" ? "text-black" : "text-white/40 hover:text-white")}><LogIn className="size-4" /> เข้าหลังบ้าน</button>
          </div>

          <form onSubmit={submit} className="w-full space-y-6">
            <AnimatePresence initial={false} mode="wait">
            {mode === "register" && (
              <>
                <motion.div key="website-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[10px] font-black text-white/40 mb-3 ml-2 tracking-[2px] uppercase">Faction Name</label>
                  <div className="relative">
                    <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ชื่อแก๊งของคุณ" className="w-full rounded-2xl border border-white/10 bg-[#050505] px-5 py-4 sm:px-6 sm:py-5 text-[14px] sm:text-[15px] text-white outline-none transition-all focus:border-white/40 focus:bg-white/5 placeholder:text-white/20 shadow-inner font-medium" />
                  </div>
                </motion.div>
                
                <motion.div key="recovery-pin" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[10px] font-black text-[#ff4444]/80 mb-3 ml-2 tracking-[2px] uppercase mt-2">Recovery PIN (รหัสกู้คืน)</label>
                  <div className="relative">
                    <input aria-label="รหัส PIN 6 หลัก" value={recoveryPin} onChange={(e) => setRecoveryPin(e.target.value.replace(/D/g, '').slice(0, 6))} required pattern="\d{6}" placeholder="ตัวเลข 6 หลัก" className="w-full rounded-2xl border border-[#ff4444]/20 bg-[#050505] px-5 py-4 sm:px-6 sm:py-5 text-[14px] sm:text-[16px] text-white text-center tracking-[1em] font-mono outline-none transition-all focus:border-[#ff4444]/80 focus:bg-[#ff4444]/5 placeholder:text-white/20 placeholder:tracking-normal shadow-inner" />
                  </div>
                </motion.div>
              </>
            )}
            </AnimatePresence>
            
            <motion.div layout>
              <label className="block text-[10px] font-black text-white/40 mb-3 ml-2 tracking-[2px] uppercase">{mode === "register" ? "Subdomain (URL)" : "Target Subdomain"}</label>
              <div className="flex items-center rounded-2xl border border-white/10 bg-[#050505] px-4 sm:px-5 py-4 sm:py-5 transition-all focus-within:border-white/40 focus-within:bg-white/5 shadow-inner">
                <span className="text-white/30 font-bold text-[13px] sm:text-[14px] hidden sm:block">https://</span>
                <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="subdomain" className="bg-transparent text-white font-black text-[14px] sm:text-[15px] w-full min-w-0 outline-none px-3 placeholder:text-white/20" />
                <span className="text-white/60 font-bold text-[12px] sm:text-[14px] whitespace-nowrap">.lastname.site</span>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {mode === "register" && (
                <motion.div key="composer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="mt-4 pt-2">
                    <WebsiteComposer name={name} slug={slug} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="wait">
              {mode === "login" && (
                <motion.div key="secret" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-[10px] font-black text-white/40 mb-3 ml-2 tracking-[2px] uppercase">Master Key</label>
                  <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="w-full rounded-2xl border border-white/10 bg-[#050505] px-5 py-4 sm:px-6 sm:py-5 text-[14px] sm:text-[15px] text-white outline-none transition-all focus:border-white/40 focus:bg-white/5 placeholder:text-white/20 shadow-inner tracking-[0.5em]" />
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

            <button disabled={status === "loading" || !turnstileToken} type="submit" className="relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 sm:px-8 py-5 text-[12px] sm:text-[13px] font-black tracking-[2px] text-black transition-all hover:bg-[#e0e0e0] active:scale-[0.98] disabled:opacity-50 overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center gap-3">
                {status === "loading" ? "PROCESSING..." : mode === "register" ? "INITIALIZE FACTION" : "AUTHENTICATE"}
                {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
          
          <div aria-live="polite" className="mt-5 min-h-[24px]">
            {status === "error" && (
              <Alert variant="destructive" className="rounded-2xl border-[#ef4444]/30 bg-[#ef4444]/10 text-white backdrop-blur-md py-4 px-5">
                <AlertCircle className="text-[#ef4444] size-4.5" />
                <AlertDescription className="text-[12px] text-[#fca5a5] ml-3 font-medium">{message}</AlertDescription>
              </Alert>
            )}
          </div>

          <AnimatePresence>
            {mode === "login" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 text-center"
              >
                <a href="#" className="inline-flex items-center gap-2 mt-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-[10px] font-black tracking-[2px] text-white/40 transition-all hover:bg-white/10 hover:border-white/30 hover:text-white uppercase">
                  <KeyRound className="size-3" /> ลืม Master Key?
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}