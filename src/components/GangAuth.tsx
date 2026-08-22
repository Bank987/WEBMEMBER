"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Copy, KeyRound, LoaderCircle, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
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
        router.push("/admin");
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
      <div className="w-full max-w-[700px] space-y-[14px] text-left">
        <Alert variant="success" className="rounded-[12px] shadow-[0_0_30px_rgba(34,197,94,0.08)]">
          <CheckCircle2 className="text-[#22c55e]" />
          <AlertTitle>สร้างเว็บไซต์แก๊งสำเร็จ</AlertTitle>
          <AlertDescription>ที่อยู่เว็บไซต์ของคุณ: <span className="font-[900] text-white">{message}.lastname.site</span></AlertDescription>
        </Alert>
        <Alert variant="destructive" className="rounded-[12px]">
          <KeyRound className="text-[#ef4444]" />
          <AlertTitle>รหัสลับผู้ดูแลระบบ</AlertTitle>
          <AlertDescription><code className="block mt-1 break-all select-all text-[12px] text-white opacity-100">{token}</code>เก็บรหัสนี้ไว้ในที่ปลอดภัย เพราะต้องใช้เข้าสู่หลังบ้าน และไม่สามารถเรียกดูซ้ำได้</AlertDescription>
          <AlertAction><button type="button" onClick={() => navigator.clipboard.writeText(token)} title="คัดลอกรหัสลับ" className="p-2 text-[#ef4444] hover:bg-[#ef4444]/10"><Copy className="size-4" /></button></AlertAction>
        </Alert>
        <a href={getGangUrl(message)} className="block text-center text-[10px] text-[#0084ff] tracking-[2px] hover:underline">เปิดเว็บไซต์แก๊ง</a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[700px]">
      <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-[#050505] p-1">
        <motion.div layoutId="auth-mode" className="absolute inset-y-1 w-[calc(50%-4px)] bg-[#0084ff]" animate={{ x: mode === "register" ? 0 : "100%" }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
        <button type="button" onClick={() => switchMode("register")} className={`relative z-10 flex items-center justify-center gap-2 px-3 py-3 text-[10px] font-[900] tracking-[1px] transition-colors ${mode === "register" ? "text-white" : "text-[#777]"}`}><UserPlus className="size-[13px]" /> สมัครเว็บไซต์</button>
        <button type="button" onClick={() => switchMode("login")} className={`relative z-10 flex items-center justify-center gap-2 px-3 py-3 text-[10px] font-[900] tracking-[1px] transition-colors ${mode === "login" ? "text-white" : "text-[#777]"}`}><LogIn className="size-[13px]" /> เข้าสู่หลังบ้าน</button>
      </div>
      <p className="mb-5 mt-4 text-center text-[11px] leading-relaxed text-[#89909b] tracking-[0.5px]">
        {mode === "register" ? "ตั้งชื่อเว็บไซต์และเลือก slug ของแก๊งคุณ" : "ใช้ slug และรหัสลับที่ได้รับตอนสมัครเพื่อเข้าสู่หลังบ้าน"}
      </p>
      <form onSubmit={submit} className="w-full rounded-[22px] border border-[#222] bg-[#0a0a0a] p-4 shadow-[0_0_50px_rgba(0,0,0,0.55)]">
        <AnimatePresence initial={false} mode="wait">
        {mode === "register" && <motion.div key="website-name" initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><input aria-label="ชื่อเว็บไซต์" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} placeholder="ชื่อเว็บไซต์แก๊ง เช่น Thunder Gang" className="mb-3 w-full rounded-2xl border border-[#20242a] bg-[#050505] px-5 py-4 text-[14px] text-white outline-none transition focus:border-[#0084ff]" /></motion.div>}
        </AnimatePresence>
        <div className="flex items-center rounded-2xl border border-[#20242a] bg-[#050505] px-5 py-4 transition focus-within:border-[#0084ff]/70">
          <span className="text-[#555] font-[700] text-[15px]">https://</span>
          <input aria-label="ชื่อ slug" value={slug} onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase())} required maxLength={63} placeholder="ชื่อ-slug" className="bg-transparent text-white font-[900] w-full min-w-0 outline-none px-[5px]" />
          <span className="text-[#0084ff] font-[700] text-[15px] whitespace-nowrap">.lastname.site</span>
        </div>
        <AnimatePresence initial={false}>
          {mode === "register" && <motion.div key="composer" initial={false} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden"><div className="mt-3"><WebsiteComposer name={name} slug={slug} /></div></motion.div>}
        </AnimatePresence>
        <AnimatePresence initial={false} mode="wait">{mode === "login" && <motion.div key="secret" initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><input aria-label="รหัสลับผู้ดูแลระบบ" value={secret} onChange={(e) => setSecret(e.target.value)} required type="password" placeholder="รหัสลับผู้ดูแลระบบ" className="mt-3 w-full rounded-2xl border border-[#20242a] bg-[#050505] px-5 py-4 text-[14px] text-white outline-none transition focus:border-[#0084ff]" /></motion.div>}</AnimatePresence>
        <button disabled={status === "loading"} type="submit" className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ededed] px-7 py-4 text-[11px] font-[900] tracking-[1px] text-[#050505] transition active:scale-[0.98] hover:bg-white disabled:opacity-60">{status === "loading" ? "กำลังดำเนินการ" : mode === "register" ? "ตรวจสอบและสร้างเว็บไซต์" : "เข้าสู่หลังบ้าน"}{status === "loading" ? <LoaderCircle className="w-[15px] h-[15px] animate-spin" /> : <ArrowRight className="w-[15px] h-[15px]" />}</button>
      </form>
      <div aria-live="polite" className="mt-[12px] min-h-[24px]">
        {status === "error" && <Alert variant="destructive" className="rounded-[10px]"><AlertCircle className="text-[#ef4444]" /><AlertTitle>ดำเนินการไม่สำเร็จ</AlertTitle><AlertDescription>{message}</AlertDescription></Alert>}
      </div>
    </div>
  );
}
