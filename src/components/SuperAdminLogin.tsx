"use client";

import { AlertCircle, ArrowRight, LoaderCircle, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SuperAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/super-admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) { setError(data.error ?? "ไม่สามารถเข้าสู่ระบบได้"); return; }
      router.push("/adminsite");
    } catch { setError("ไม่สามารถเชื่อมต่อระบบยืนยันตัวตนได้"); }
    finally { setLoading(false); }
  }

  return <div className="relative w-full max-w-[440px] overflow-hidden rounded-[34px] border border-[#6aaeff]/25 bg-[#0c1018]/90 p-4 shadow-[0_34px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6">
    <div className="absolute -right-16 -top-16 size-52 rounded-full bg-[#1689df]/20 blur-[55px]" />
    <div className="relative rounded-[25px] border border-white/10 bg-[#0a0c11] p-6 sm:p-8">
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="grid size-16 place-items-center rounded-[22px] bg-[#dcedff] text-[#165c94] shadow-[0_12px_30px_rgba(67,156,230,0.3)]"><ShieldCheck className="size-8" /></motion.div>
      <p className="mt-7 text-[10px] font-[900] tracking-[1.7px] text-[#86c8ff]">LASTNAME.SITE</p>
      <h1 className="mt-3 text-[32px] font-[900] leading-[1.1] text-white">ศูนย์ควบคุมหลัก</h1>
      <p className="mt-3 text-[12px] leading-[1.8] text-[#929cad]">เข้าสู่ระบบเพื่อดูแลแก๊งทั้งหมดและจัดการสิทธิ์ของเจ้าของเว็บไซต์</p>
      <form onSubmit={submit} className="mt-7 space-y-3">
        <label className="block"><span className="mb-2 block text-[10px] font-[900] tracking-[1px] text-[#8d98a9]">ชื่อผู้ใช้</span><span className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 focus-within:border-[#3b9ee5]"><UserRound className="size-4 text-[#6c7a8e]" /><input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required placeholder="ชื่อผู้ใช้ผู้ดูแล" className="w-full bg-transparent px-3 py-3.5 text-[13px] text-white outline-none placeholder:text-[#566070]" /></span></label>
        <label className="block"><span className="mb-2 block text-[10px] font-[900] tracking-[1px] text-[#8d98a9]">รหัสผ่าน</span><span className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 focus-within:border-[#3b9ee5]"><LockKeyhole className="size-4 text-[#6c7a8e]" /><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required placeholder="รหัสผ่านผู้ดูแล" className="w-full bg-transparent px-3 py-3.5 text-[13px] text-white outline-none placeholder:text-[#566070]" /></span></label>
        <button disabled={loading} className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#dceeff] px-5 py-4 text-[12px] font-[900] text-[#08213a] transition hover:bg-white active:scale-[0.98] disabled:opacity-60">{loading ? "กำลังยืนยันตัวตน" : "เข้าสู่ศูนย์ควบคุม"}{loading ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}</button>
      </form>
      {error && <Alert variant="destructive" className="mt-4 rounded-2xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>เข้าสู่ระบบไม่สำเร็จ</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
    </div>
  </div>;
}
