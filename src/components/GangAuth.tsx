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
        className="w-full max-w-[500px] relative mx-auto"
      >
        <div className="relative border border-white/10 bg-black/60 backdrop-blur-2xl p-10 rounded-[32px] shadow-2xl overflow-hidden">
          
          <div className="flex items-center gap-5 mb-8">
            <div className="size-14 rounded-[16px] bg-[#0084ff]/10 border border-[#0084ff]/20 flex items-center justify-center">
              <Check className="size-6 text-[#0084ff]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">สร้างเว็บไซต์สำเร็จ</h3>
              <p className="text-[11px] text-[#0084ff] font-medium tracking-[2px] uppercase mt-1">System Deployed</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] text-white/50 font-semibold mb-2 tracking-wide">DOMAIN ADDRESS</p>
              <div className="bg-white/5 rounded-[16px] p-4 flex items-center justify-between border border-white/5">
                <span className="font-mono text-white text-sm">{message}<span className="text-white/30">.lastname.site</span></span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] text-[#ef4444] font-semibold flex items-center gap-1.5 tracking-wide"><ShieldAlert className="size-3" /> MASTER KEY (รหัสลับผู้ดูแล)</p>
              </div>
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-[16px] p-4 flex justify-between items-center">
                <code className="text-[#ef4444] font-mono text-sm tracking-[2px]">{token}</code>
                <button type="button" onClick={() => navigator.clipboard.writeText(token)} className="text-[#ef4444]/80 hover:text-[#ef4444] p-2 bg-[#ef4444]/10 rounded-xl transition-colors">
                  <Copy className="size-4" />
                </button>
              </div>
              <p className="text-[11px] text-white/40 mt-3 font-medium leading-relaxed">
                * คัดลอกและเก็บรหัสนี้ไว้ในที่ปลอดภัย ระบบจะไม่แสดงรหัสนี้อีกครั้ง
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a href={getGangUrl(message)} className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-white px-7 py-4 text-[13px] font-semibold text-black transition-all hover:bg-gray-100 active:scale-[0.98]">
                เข้าสู่หน้าเว็บไซต์ <ArrowRight className="size-4" />
              </a>
              <button type="button" onClick={() => { setStatus("idle"); setToken(""); setName(""); setSlug(""); setSecret(""); }} className="flex w-full items-center justify-center gap-2 rounded-[16px] bg-transparent hover:bg-white/5 px-7 py-3.5 text-[12px] font-medium text-white/60 transition-all hover:text-white active:scale-[0.98]">
                <X className="size-4" /> ปิดหน้าต่างนี้
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="relative w-full rounded-[32px] border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden p-8 sm:p-12">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <span className="size-2 bg-[#0084ff] rounded-full shadow-[0_0_8px_rgba(0,132,255,0.8)]" />
            <span className="text-[10px] font-semibold text-white/70 tracking-wider">Security Level : Max</span>
          </div>
          <Fingerprint className="size-5 text-white/20" />
        </div>
        
        <div className="relative flex rounded-2xl bg-white/5 p-1 mb-8 border border-white/5">
          <motion.div layoutId="auth-mode" className="absolute inset-y-1 w-[calc(50%-4px)] bg-[#1a1a1a] rounded-[12px] border border-white/10 shadow-sm" animate={{ x: mode === "register" ? "0%" : "100%" }} transition={{ type: "spring", stiffness: 500, damping: 40 }} />
          <button type="button" onClick={() => switchMode("register")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold transition-colors ' + (mode === "register" ? "text-white" : "text-white/40 hover:text-white")}><UserPlus className="size-4" /> สมัครเว็บ</button>
          <button type="button" onClick={() => switchMode("login")} className={'relative z-10 w-1/2 flex items-center justify-center gap-2 py-3.5 text-[12px] font-semibold transition-colors ' + (mode === "login" ? "text-white" : "text-white/40 hover:text-white")}><LogIn className="size-4" /> เข้าหลังบ้าน</button>
        </div>

        <form onSubmit={submit} className="w-full space-y-5">
          <AnimatePresence initial={false} mode="wait">
          {mode === "register" && (
            <>
              <motion.div key="website-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-[11px] font-semibold text-white/50 mb-2 ml-1 tracking-wide">Faction Name</label>
                <div className="relative">
                  <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ชื่อแก๊งของคุณ" className="w-full rounded-[16px] border border-white/10 bg-white/5 px-5 py-4 text-[14px] text-white outline-none transition-all focus:border-white/30 focus:bg-white/10 placeholder:text-white/20 font-medium" />
                </div>
              </motion.div>
              
              <motion.div key="recovery-pin" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-[11px] font-semibold text-[#ff4444]/80 mb-2 ml-1 tracking-wide mt-1">Recovery PIN (รหัสกู้คืน 6 หลัก)</label>
                <div className="relative">
                  <input aria-label="รหัส PIN 6 หลัก" value={recoveryPin} onChange={(e) => setRecoveryPin(e.target.value.replace(/\D/g, '').slice(0, 6))} required pattern="\d{6}" placeholder="ตั้งรหัสตัวเลข 6 หลัก" className="w-full rounded-[16px] border border-[#ff4444]/20 bg-white/5 px-5 py-4 text-[15px] text-white text-center tracking-[0.5em] font-mono outline-none transition-all focus:border-[#ff4444]/50 focus:bg-[#ff4444]/5 placeholder:text-white/20 placeholder:tracking-normal" />
                </div>
                <p className="text-[11px] text-white/30 mt-2 ml-1 font-medium">* ใช้สำหรับกู้คืนเว็บไซต์กรณีที่คุณลืม Master Key ห้ามลืมเด็ดขาด</p>
              </motion.div>
            </>
          )}
          </AnimatePresence>
          
          <motion.div layout>
            <label className="block text-[11px] font-semibold text-white/50 mb-2 ml-1 tracking-wide">{mode === "register" ? "Subdomain (URL)" : "Target Subdomain"}</label>
            <div className="flex items-center rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 transition-all focus-within:border-white/30 focus-within:bg-white/10">
              <span className="text-white/30 font-semibold text-[14px] hidden sm:block">https://</span>
              <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="subdomain" className="bg-transparent text-white font-semibold text-[15px] w-full min-w-0 outline-none px-2 placeholder:text-white/20" />
              <span className="text-white/50 font-semibold text-[13px] whitespace-nowrap">.lastname.site</span>
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
                <label className="block text-[11px] font-semibold text-white/50 mb-2 ml-1 tracking-wide">Master Key</label>
                <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="w-full rounded-[16px] border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-white outline-none transition-all focus:border-white/30 focus:bg-white/10 placeholder:text-white/20 tracking-[0.2em]" />
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

          <button disabled={status === "loading" || !turnstileToken} type="submit" className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-[16px] bg-white px-7 py-4.5 text-[13px] font-bold text-black transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-50 overflow-hidden group">
            {status === "loading" ? "INITIALIZING..." : mode === "register" ? "INITIALIZE FACTION" : "AUTHENTICATE"}
            {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div aria-live="polite" className="mt-4 min-h-[24px]">
          {status === "error" && (
            <Alert variant="destructive" className="rounded-[16px] border-[#ef4444]/30 bg-[#ef4444]/10 text-white backdrop-blur-md py-3.5 px-5 flex items-center gap-3">
              <AlertCircle className="text-[#ef4444] size-4 shrink-0" />
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
              className="mt-6 text-center border-t border-white/5 pt-8"
            >
              <p className="text-[12px] font-semibold text-white/60">
                ลืม MASTER KEY?
              </p>
              <p className="mt-2.5 text-[11px] text-white/40 leading-relaxed max-w-[280px] mx-auto font-medium">
                หากคุณเป็นเจ้าของเว็บไซต์และลืมรหัสผ่าน โปรดติดต่อฝ่ายสนับสนุน (SUPPORT) เพื่อยืนยันตัวตนและขอรับรหัสใหม่
              </p>
              <a href="#" className="inline-flex items-center justify-center mt-5 rounded-[12px] bg-white/5 border border-white/10 px-5 py-2.5 text-[11px] font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">
                ติดต่อ SUPPORT
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}