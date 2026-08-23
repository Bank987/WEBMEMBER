"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus, Fingerprint, ShieldAlert, Check } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WebsiteComposer } from "@/components/WebsiteComposer";
import { getGangUrl } from "@/lib/site-url";

type Mode = "register" | "login";

export default function GangAuth() {
  const [mode, setMode] = useState<Mode>("register");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setStatus("idle");
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const body = mode === "register" ? { pageTitle: name, subdomain: slug } : { subdomain: slug, token: secret };

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
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-[600px] relative"
      >
        <div className="absolute inset-0 bg-[#0084ff] opacity-10 blur-[100px] rounded-full" />
        <div className="relative border border-[#0084ff]/30 bg-black/60 backdrop-blur-2xl p-8 rounded-[24px] shadow-[0_0_80px_rgba(0,132,255,0.15)] overflow-hidden">
          {/* Futuristic corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0084ff]/50 rounded-tl-[24px]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#0084ff]/50 rounded-tr-[24px]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#0084ff]/50 rounded-bl-[24px]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#0084ff]/50 rounded-br-[24px]" />
          
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="size-12 rounded-full bg-[#0084ff]/10 border border-[#0084ff]/30 flex items-center justify-center">
              <Check className="size-6 text-[#0084ff]" />
            </div>
            <div>
              <h3 className="text-xl font-[900] text-white tracking-wide">สร้างเว็บไซต์สำเร็จ</h3>
              <p className="text-[11px] text-[#0084ff] font-bold tracking-[2px] uppercase mt-1">System Deployed</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] text-white/50 font-[900] mb-2">DOMAIN ADDRESS</p>
              <div className="bg-[#050505] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <span className="font-mono text-white text-sm">{message}<span className="text-white/40">.lastname.site</span></span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] text-[#ef4444] font-[900] flex items-center gap-1.5"><ShieldAlert className="size-3" /> MASTER KEY (รหัสลับผู้ดูแล)</p>
              </div>
              <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-4 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#ef4444]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-center relative z-10">
                  <code className="text-[#ef4444] font-mono text-sm tracking-wider">{token}</code>
                  <button type="button" onClick={() => navigator.clipboard.writeText(token)} className="text-[#ef4444]/70 hover:text-[#ef4444] p-2 bg-[#ef4444]/10 rounded-lg transition-colors">
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[#ef4444]/60 mt-2 font-bold leading-relaxed">
                * คัดลอกและเก็บรหัสนี้ไว้ในที่ปลอดภัย ระบบจะไม่แสดงรหัสนี้อีกครั้ง
              </p>
            </div>

            <a href={getGangUrl(message)} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-[12px] font-[900] tracking-[1px] text-black transition-all hover:bg-[#f0f0f0] active:scale-[0.98]">
              เข้าสู่หน้าเว็บไซต์ <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative group">
      {/* Outer Glow */}
      <div className="absolute -inset-[2px] rounded-[32px] bg-gradient-to-b from-[#0084ff]/50 via-white/5 to-transparent opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-700" />
      
      <div className="relative w-full rounded-[30px] border border-white/15 bg-[#030303]/90 backdrop-blur-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        
        {/* Futuristic Top Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0084ff] to-transparent opacity-50" />
        
        {/* Scanning Laser (Subtle) */}
        <motion.div 
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0084ff]/50 to-transparent z-50 pointer-events-none"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />

        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-[#0084ff] animate-pulse rounded-full shadow-[0_0_10px_#0084ff]" />
              <span className="text-[8px] sm:text-[9px] font-[900] text-[#0084ff] tracking-[0.2em] uppercase">Security Level : Max</span>
            </div>
            <Fingerprint className="size-4 sm:size-5 text-white/20" />
          </div>
          
          <div className="relative flex rounded-xl border border-white/10 bg-[#0a0a0a] p-1.5 mb-6 sm:mb-8">
            <motion.div layoutId="auth-mode" className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#0084ff] rounded-lg shadow-[0_0_20px_rgba(0,132,255,0.4)]" animate={{ x: mode === "register" ? "0%" : "100%" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            <button type="button" onClick={() => switchMode("register")} className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-3 text-[10px] sm:text-[11px] font-[900] tracking-[1px] transition-colors ${mode === "register" ? "text-white" : "text-[#777] hover:text-white"}`}><UserPlus className="size-3.5 sm:size-4" /> สมัครเว็บ</button>
            <button type="button" onClick={() => switchMode("login")} className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-3 text-[10px] sm:text-[11px] font-[900] tracking-[1px] transition-colors ${mode === "login" ? "text-white" : "text-[#777] hover:text-white"}`}><LogIn className="size-3.5 sm:size-4" /> เข้าหลังบ้าน</button>
          </div>

          <form onSubmit={submit} className="w-full space-y-4 sm:space-y-5">
            <AnimatePresence initial={false} mode="wait">
            {mode === "register" && (
              <motion.div key="website-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-[9px] sm:text-[10px] font-[900] text-white/50 mb-2 ml-1 tracking-[1px] uppercase">Faction Name</label>
                <div className="relative">
                  <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ชื่อแก๊งของคุณ" className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 sm:px-5 sm:py-4 text-[13px] sm:text-[14px] text-white outline-none transition-all focus:border-[#0084ff] focus:bg-[#0084ff]/5 placeholder:text-white/20 shadow-inner" />
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            
            <motion.div layout>
              <label className="block text-[9px] sm:text-[10px] font-[900] text-white/50 mb-2 ml-1 tracking-[1px] uppercase">{mode === "register" ? "Subdomain (URL)" : "Target Subdomain"}</label>
              <div className="flex items-center rounded-xl border border-white/10 bg-[#050505] px-3 sm:px-4 py-3 sm:py-4 transition-all focus-within:border-[#0084ff] focus-within:bg-[#0084ff]/5 shadow-inner">
                <span className="text-[#444] font-[700] text-[12px] sm:text-[13px] hidden sm:block">https://</span>
                <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="subdomain" className="bg-transparent text-white font-[900] text-[13px] sm:text-[14px] w-full min-w-0 outline-none px-2 placeholder:text-white/20" />
                <span className="text-[#0084ff] font-[900] text-[11px] sm:text-[13px] whitespace-nowrap">.lastname.site</span>
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
                  <label className="block text-[9px] sm:text-[10px] font-[900] text-white/50 mb-2 ml-1 tracking-[1px] uppercase">Master Key</label>
                  <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-3 sm:px-5 sm:py-4 text-[13px] sm:text-[14px] text-white outline-none transition-all focus:border-[#0084ff] focus:bg-[#0084ff]/5 placeholder:text-white/20 shadow-inner" />
                </motion.div>
              )}
            </AnimatePresence>

            <button disabled={status === "loading"} type="submit" className="relative mt-6 sm:mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 sm:px-7 py-4 sm:py-4 text-[11px] sm:text-[12px] font-[900] tracking-[1.5px] text-black transition-all hover:bg-[#e0e0e0] active:scale-[0.98] disabled:opacity-60 overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                {status === "loading" ? "INITIALIZING..." : mode === "register" ? "INITIALIZE FACTION" : "AUTHENTICATE"}
                {status === "loading" ? <LoaderCircle className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] animate-spin" /> : <ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#004b99] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute z-10 inset-0 flex items-center justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                {status === "loading" ? "INITIALIZING..." : mode === "register" ? "INITIALIZE FACTION" : "AUTHENTICATE"}
                {status === "loading" ? <LoaderCircle className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] animate-spin" /> : <ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
          
          <div aria-live="polite" className="mt-4 min-h-[24px]">
            {status === "error" && (
              <Alert variant="destructive" className="rounded-xl border-[#ef4444]/30 bg-[#ef4444]/10 text-white backdrop-blur-md py-3 px-4">
                <AlertCircle className="text-[#ef4444] size-4" />
                <AlertDescription className="text-[11px] sm:text-[12px] text-slate-200 ml-2">{message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
