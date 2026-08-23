"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus } from "lucide-react";
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
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-[700px] space-y-[14px] text-left p-6 sm:p-8 rounded-[32px] border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,132,255,0.15)] backdrop-blur-xl"
      >
        <Alert variant="success" className="rounded-[16px] shadow-[0_0_30px_rgba(34,197,94,0.08)] bg-[#0a0a0a] border-white/5">
          <CheckCircle2 className="text-[#22c55e]" />
          <AlertTitle className="text-white text-lg">สร้างเว็บไซต์แก๊งสำเร็จ</AlertTitle>
          <AlertDescription className="text-slate-300">ที่อยู่เว็บไซต์ของคุณ: <span className="font-[900] text-[#0084ff]">{message}.lastname.site</span></AlertDescription>
        </Alert>
        <Alert variant="destructive" className="rounded-[16px] bg-[#0a0a0a] border-[#ef4444]/20">
          <KeyRound className="text-[#ef4444]" />
          <AlertTitle className="text-white text-lg">รหัสลับผู้ดูแลระบบ</AlertTitle>
          <AlertDescription className="text-slate-300">
            <code className="block mt-2 mb-2 p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 break-all select-all text-[13px] text-[#ef4444] font-mono opacity-100 shadow-[0_0_15px_rgba(239,68,68,0.15)]">{token}</code>
            เก็บรหัสนี้ไว้ในที่ปลอดภัย เพราะต้องใช้เข้าสู่หลังบ้าน และไม่สามารถเรียกดูซ้ำได้
          </AlertDescription>
          <AlertAction>
            <button type="button" onClick={() => navigator.clipboard.writeText(token)} title="คัดลอกรหัสลับ" className="p-2 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors">
              <Copy className="size-4" />
            </button>
          </AlertAction>
        </Alert>
        <a href={getGangUrl(message)} className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0084ff] hover:bg-[#0073e6] px-7 py-4 text-[12px] font-[900] tracking-[1px] text-white transition active:scale-[0.98] shadow-[0_0_20px_rgba(0,132,255,0.4)]">
          เปิดเว็บไซต์แก๊ง <ArrowRight className="size-4" />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full relative group">
      <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-[#0084ff]/40 to-transparent opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative w-full rounded-[32px] border border-white/10 bg-black/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        
        <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-[#050505] p-1.5 mb-6 shadow-inner">
          <motion.div layoutId="auth-mode" className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#0084ff] rounded-xl shadow-[0_0_15px_rgba(0,132,255,0.5)]" animate={{ x: mode === "register" ? "0%" : "100%" }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
          <button type="button" onClick={() => switchMode("register")} className={`relative z-10 flex items-center justify-center gap-2 px-3 py-3 text-[11px] font-[900] tracking-[1px] transition-colors ${mode === "register" ? "text-white" : "text-[#777] hover:text-white"}`}><UserPlus className="size-3.5" /> สมัครเว็บไซต์</button>
          <button type="button" onClick={() => switchMode("login")} className={`relative z-10 flex items-center justify-center gap-2 px-3 py-3 text-[11px] font-[900] tracking-[1px] transition-colors ${mode === "login" ? "text-white" : "text-[#777] hover:text-white"}`}><LogIn className="size-3.5" /> เข้าสู่หลังบ้าน</button>
        </div>

        <form onSubmit={submit} className="w-full">
          <AnimatePresence initial={false} mode="wait">
          {mode === "register" && (
            <motion.div key="website-name" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <label className="block text-[11px] font-[900] text-white/70 mb-2 ml-1">ชื่อเว็บไซต์</label>
              <input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="เช่น Thunder Gang" className="mb-4 w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-[14px] text-white outline-none transition focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff]/50 shadow-inner" />
            </motion.div>
          )}
          </AnimatePresence>
          
          <motion.div layout>
            <label className="block text-[11px] font-[900] text-white/70 mb-2 ml-1">โดเมนเนมส่วนตัว</label>
            <div className="flex items-center rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 transition focus-within:border-[#0084ff] focus-within:ring-1 focus-within:ring-[#0084ff]/50 shadow-inner overflow-hidden">
              <span className="text-[#555] font-[700] text-[14px] hidden sm:block">https://</span>
              <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="ชื่อแก๊งของคุณ" className="bg-transparent text-white font-[900] text-[14px] w-full min-w-0 outline-none sm:px-[5px]" />
              <span className="text-[#0084ff] font-[900] text-[14px] whitespace-nowrap">.lastname.site</span>
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
            {mode === "register" && (
              <motion.div key="composer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mt-4 border-t border-white/10 pt-4">
                  <WebsiteComposer name={name} slug={slug} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="wait">
            {mode === "login" && (
              <motion.div key="secret" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4">
                <label className="block text-[11px] font-[900] text-white/70 mb-2 ml-1">รหัสผ่าน (Secret Token)</label>
                <input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="••••••••••••" className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 py-4 text-[14px] text-white outline-none transition focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff]/50 shadow-inner" />
              </motion.div>
            )}
          </AnimatePresence>

          <button disabled={status === "loading"} type="submit" className="relative mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-[12px] font-[900] tracking-[1px] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 overflow-hidden group">
            <span className="relative z-10 flex items-center gap-3">
              {status === "loading" ? "กำลังดำเนินการ" : mode === "register" ? "ตรวจสอบและสร้างเว็บไซต์" : "เข้าสู่หลังบ้าน"}
              {status === "loading" ? <LoaderCircle className="w-[16px] h-[16px] animate-spin" /> : <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00bfff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute z-10 inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              {status === "loading" ? "กำลังดำเนินการ" : mode === "register" ? "ตรวจสอบและสร้างเว็บไซต์" : "เข้าสู่หลังบ้าน"}
              {status === "loading" ? <LoaderCircle className="w-[16px] h-[16px] animate-spin" /> : <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />}
            </span>
          </button>
        </form>
        <div aria-live="polite" className="mt-[16px] min-h-[24px]">
          {status === "error" && (
            <Alert variant="destructive" className="rounded-xl border-[#ef4444]/20 bg-[#ef4444]/5 text-white backdrop-blur-md">
              <AlertCircle className="text-[#ef4444]" />
              <AlertTitle>ดำเนินการไม่สำเร็จ</AlertTitle>
              <AlertDescription className="text-slate-300">{message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
