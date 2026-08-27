"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus, Fingerprint, ShieldAlert, Check, X, ShieldCheck, TerminalSquare } from "lucide-react";
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
        className="w-full relative"
      >
        <div className="relative border-l-4 border-[#0084ff] bg-[#050505] p-8 shadow-[10px_10px_0px_rgba(0,132,255,0.2)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
          
          <div className="flex items-center gap-5 mb-8 border-b border-white/5 pb-6">
            <div className="size-12 bg-[#0084ff] flex items-center justify-center transform -skew-x-12">
              <Check className="size-6 text-white transform skew-x-12" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-widest uppercase">Deploy Success</h3>
              <p className="text-[10px] text-[#0084ff] font-mono mt-1">STATUS: ONLINE</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-white/50 font-mono mb-2">// DOMAIN_ADDRESS</p>
              <div className="bg-[#0a0a0a] border border-white/5 p-4 flex items-center justify-between">
                <span className="font-mono text-[#0084ff] text-[15px]">{message}<span className="text-white/30">.lastname.site</span></span>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-[#ef4444] font-mono mb-2 flex items-center gap-2"><ShieldAlert className="size-3" /> // MASTER_KEY_GENERATED</p>
              <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 p-4 relative flex justify-between items-center">
                <code className="text-[#ef4444] font-mono text-[16px] tracking-[4px]">{token}</code>
                <button type="button" onClick={() => navigator.clipboard.writeText(token)} className="text-[#ef4444]/70 hover:text-[#ef4444] p-2 bg-[#ef4444]/10 transition-colors">
                  <Copy className="size-4" />
                </button>
              </div>
              <p className="text-[10px] text-[#ef4444]/70 mt-2 font-mono">
                &gt; WARNING: STORE THIS KEY SECURELY. NO RECOVERY.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a href={getGangUrl(message)} className="flex w-full items-center justify-center gap-3 bg-[#0084ff] px-6 py-4 text-[12px] font-black tracking-widest text-white transition-all hover:bg-[#0073e6] uppercase transform -skew-x-6">
                <span className="transform skew-x-6 flex items-center gap-2">Initialize <ArrowRight className="size-4" /></span>
              </a>
              <button type="button" onClick={() => { setStatus("idle"); setToken(""); setName(""); setSlug(""); setSecret(""); }} className="flex w-full items-center justify-center gap-2 bg-transparent border border-white/10 px-6 py-3 text-[11px] font-bold tracking-[1px] text-white/50 transition-all hover:bg-white/5 hover:text-white uppercase transform -skew-x-6">
                <span className="transform skew-x-6">Close Terminal</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative">
      
      {/* Sci-Fi Container with Cut Corners */}
      <div 
        className="relative w-full bg-[#030303] border-t border-l border-white/10 p-8 sm:p-10 shadow-[20px_20px_0px_rgba(0,132,255,0.05)] transition-all duration-500 hover:shadow-[20px_20px_0px_rgba(0,132,255,0.15)]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 40px 100%, 0 calc(100% - 40px))' }}
      >
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[40px] h-[40px] bg-white/5" />
        <div className="absolute bottom-0 left-0 w-[40px] h-[40px] bg-[#0084ff]/10" />
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <TerminalSquare className="size-4 text-[#0084ff]" />
          <span className="text-[9px] font-mono text-[#0084ff] tracking-widest">SYS.AUTH_V2</span>
        </div>

        <div className="mt-8">
          
          {/* Cyber Tabs */}
          <div className="flex mb-10 gap-4">
            <button 
              type="button" 
              onClick={() => switchMode("register")} 
              className={'relative flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-black tracking-widest uppercase transition-all transform -skew-x-12 ' + (mode === "register" ? "bg-[#0084ff] text-white" : "bg-[#111] text-white/40 hover:bg-[#222]")}
            >
              <span className="transform skew-x-12 flex items-center gap-2"><UserPlus className="size-4" /> Register</span>
            </button>
            <button 
              type="button" 
              onClick={() => switchMode("login")} 
              className={'relative flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-black tracking-widest uppercase transition-all transform -skew-x-12 ' + (mode === "login" ? "bg-white text-black" : "bg-[#111] text-white/40 hover:bg-[#222]")}
            >
              <span className="transform skew-x-12 flex items-center gap-2"><LogIn className="size-4" /> Login</span>
            </button>
          </div>

          <form onSubmit={submit} className="w-full space-y-6">
            <AnimatePresence initial={false} mode="wait">
            {mode === "register" && (
              <>
                <motion.div key="website-name" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <label className="block text-[10px] font-mono text-white/40 mb-2 tracking-widest uppercase">// Faction_Name</label>
                  <div className="relative">
                    <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ENTER GANG NAME" className="w-full bg-[#0a0a0a] border-b-2 border-white/10 px-0 py-3 text-[16px] text-white outline-none transition-all focus:border-[#0084ff] placeholder:text-white/20 font-bold uppercase rounded-none" />
                  </div>
                </motion.div>
                
                <motion.div key="recovery-pin" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <label className="block text-[10px] font-mono text-[#ff4444]/80 mb-2 tracking-widest uppercase mt-2">// Recovery_PIN (6_DIGITS)</label>
                  <div className="relative">
                    <input aria-label="รหัส PIN 6 หลัก" value={recoveryPin} onChange={(e) => setRecoveryPin(e.target.value.replace(/\D/g, '').slice(0, 6))} required pattern="\d{6}" placeholder="------" className="w-full bg-[#0a0a0a] border-b-2 border-[#ff4444]/30 px-0 py-3 text-[18px] text-white tracking-[1em] font-mono outline-none transition-all focus:border-[#ff4444] placeholder:text-white/10 rounded-none" />
                  </div>
                </motion.div>
              </>
            )}
            </AnimatePresence>
            
            <motion.div layout>
              <label className="block text-[10px] font-mono text-white/40 mb-2 tracking-widest uppercase">// {mode === "register" ? "Target_URL" : "Subdomain_ID"}</label>
              <div className="flex items-center bg-[#0a0a0a] border-b-2 border-white/10 py-3 transition-all focus-within:border-[#0084ff]">
                <span className="text-[#0084ff] font-mono text-[12px] hidden sm:block">HTTPS://</span>
                <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="SUBDOMAIN" className="bg-transparent text-white font-black text-[16px] w-full min-w-0 outline-none px-3 placeholder:text-white/20 uppercase rounded-none" />
                <span className="text-white/30 font-mono text-[11px] whitespace-nowrap">.LASTNAME.SITE</span>
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
                <motion.div key="secret" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <label className="block text-[10px] font-mono text-white/40 mb-2 tracking-widest uppercase">// Master_Key</label>
                  <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="w-full bg-[#0a0a0a] border-b-2 border-white/10 px-0 py-3 text-[18px] text-white outline-none transition-all focus:border-[#0084ff] placeholder:text-white/20 tracking-[0.5em] rounded-none" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-4">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
                onSuccess={(t) => setTurnstileToken(t)} 
                options={{ theme: "dark" }}
              />
            </div>

            <button disabled={status === "loading" || !turnstileToken} type="submit" className="relative mt-8 flex w-full items-center justify-center gap-3 bg-[#0084ff] px-6 py-5 text-[13px] font-black tracking-widest text-white transition-all hover:bg-[#0073e6] disabled:opacity-50 overflow-hidden group transform -skew-x-12">
              <span className="relative z-10 flex items-center gap-3 transform skew-x-12">
                {status === "loading" ? "PROCESSING..." : mode === "register" ? "INITIALIZE" : "AUTHENTICATE"}
                {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />}
              </span>
            </button>
          </form>
          
          <div aria-live="polite" className="mt-5 min-h-[24px]">
            {status === "error" && (
              <div className="border-l-4 border-[#ef4444] bg-[#ef4444]/10 p-4 flex items-start gap-3">
                <AlertCircle className="text-[#ef4444] size-4 shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#fca5a5] font-mono uppercase">{message}</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {mode === "login" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 text-center"
              >
                <a href="#" className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/30 hover:text-[#0084ff] transition-colors uppercase">
                  <KeyRound className="size-3" /> Recover_Master_Key
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}