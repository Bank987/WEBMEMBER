"use client";

import { AlertCircle, Copy, ExternalLink, KeyRound, LoaderCircle, RefreshCw, Search, ShieldCheck, UsersRound, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { SuperAdminGang } from "@/lib/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getGangUrl } from "@/lib/site-url";

export function SuperAdminDashboard({ gangs }: { gangs: SuperAdminGang[] }) {
  const [query, setQuery] = useState("");
  const [resetting, setResetting] = useState<string | null>(null);
  const [token, setToken] = useState<{ name: string; value: string } | null>(null);
  const [error, setError] = useState("");
  const filtered = useMemo(() => gangs.filter((gang) => `${gang.pageTitle} ${gang.subdomain}`.toLowerCase().includes(query.toLowerCase())), [gangs, query]);
  const totalMembers = gangs.reduce((sum, gang) => sum + gang.memberCount, 0);

  async function resetToken(gang: SuperAdminGang) {
    if (!window.confirm(`ยืนยันการสร้างรหัสลับใหม่สำหรับ ${gang.pageTitle}? รหัสเดิมจะใช้งานไม่ได้ทันที`)) return;
    setResetting(gang.id); setError("");
    try {
      const response = await fetch("/api/super-admin/reset-token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gangId: gang.id }) });
      const data = (await response.json()) as { error?: string; token?: string };
      if (!response.ok || !data.token) { setError(data.error ?? "ไม่สามารถสร้างรหัสใหม่ได้"); return; }
      setToken({ name: gang.pageTitle, value: data.token });
    } catch { setError("ไม่สามารถเชื่อมต่อระบบได้"); }
    finally { setResetting(null); }
  }

  return <>
    <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="relative overflow-hidden rounded-[28px] border border-[#65b8f0]/25 bg-[linear-gradient(135deg,#101c29,#0d1118_60%,#1b1425)] p-6 sm:p-8">
        <div className="absolute -right-16 -top-20 size-64 rounded-full bg-[#1589d6]/15 blur-[70px]" />
        <div className="relative"><div className="flex items-center gap-2 text-[10px] font-[900] tracking-[1.5px] text-[#8dccff]"><span className="size-2 rounded-full bg-[#65dfa0] shadow-[0_0_12px_#65dfa0]" /> ระบบปฏิบัติการปกติ</div><h2 className="mt-5 max-w-[560px] text-[31px] font-[900] leading-[1.12] text-white sm:text-[43px]">ภาพรวมเครือข่าย<br /><span className="text-[#91cfff]">เว็บไซต์แก๊งทั้งหมด</span></h2><p className="mt-4 max-w-[500px] text-[12px] leading-[1.8] text-[#9caebe]">ควบคุม ตรวจสอบ และดูแลสิทธิ์ของเจ้าของเว็บไซต์จากศูนย์กลางเดียว</p><div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] text-[#c5d2de]">SUPER ADMIN MODE</span><span className="rounded-full border border-[#65dfa0]/20 bg-[#65dfa0]/10 px-3 py-2 text-[10px] text-[#8debb2]">ฐานข้อมูลเชื่อมต่อแล้ว</span></div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1"><Metric icon={<ShieldCheck />} label="แก๊งทั้งหมด" value={gangs.length} tone="blue" /><Metric icon={<UsersRound />} label="สมาชิกรวม" value={totalMembers} tone="green" /></div>
    </section>

    <section className="mt-5 grid gap-3 sm:grid-cols-3"><MiniMetric label="แสดงผลอยู่" value={filtered.length} detail="จากผลการค้นหา" /><MiniMetric label="สถานะระบบ" value="ปกติ" detail="การเชื่อมต่อเสถียร" /><MiniMetric label="การจัดการ" value="พร้อม" detail="รีเซ็ต token ได้ทันที" /></section>

    <section className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#0c1016] shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-7"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#dceeff] text-[#145d91]"><UsersRound className="size-4" /></span><div><h2 className="text-[19px] font-[900] text-white">ไดเรกทอรีแก๊ง</h2><p className="mt-1 text-[11px] text-[#8290a0]">เว็บไซต์ทั้งหมดภายใต้ Lastname.site</p></div></div></div><label className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 transition focus-within:border-[#238de0]"><Search className="size-4 text-[#718092]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อหรือ slug" className="w-full bg-transparent px-2.5 py-3 text-[12px] text-white outline-none placeholder:text-[#647083] sm:w-[230px]" /></label></div>
      {error && <div className="px-5 pt-5 sm:px-7"><Alert variant="destructive" className="rounded-2xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>ดำเนินการไม่สำเร็จ</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>}
      <div className="p-3 sm:p-4">{filtered.map((gang) => <div key={gang.id} className="group mb-2 flex flex-col gap-4 rounded-[22px] border border-transparent bg-white/[0.025] p-4 transition hover:border-[#398dca]/30 hover:bg-[#14202b] sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="flex min-w-0 items-center gap-4"><div className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#e5f4ff,#9ccced)] text-[12px] font-[900] text-[#155982] shadow-[0_8px_20px_rgba(94,174,227,0.15)]">{gang.subdomain.slice(0, 2).toUpperCase()}<span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#0c1016] bg-[#4fdb8e]" /></div><div className="min-w-0"><p className="truncate text-[14px] font-[900] text-white">{gang.pageTitle}</p><a href={getGangUrl(gang.subdomain)} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 text-[11px] text-[#79bfff] hover:underline">{gang.subdomain}.lastname.site <ExternalLink className="size-3" /></a></div></div><div className="flex flex-wrap items-center gap-2 sm:justify-end"><span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[#9daaba]"><UsersRound className="mr-1 inline size-3" />{gang.memberCount} สมาชิก</span><span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[#9daaba]">{gang.createdAt ? new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(gang.createdAt)) : "-"}</span><button onClick={() => resetToken(gang)} disabled={resetting === gang.id} className="flex items-center gap-2 rounded-xl border border-[#ef7777]/25 bg-[#ef4444]/10 px-3 py-2 text-[10px] font-[900] text-[#ff9b9b] transition hover:bg-[#ef4444]/20 disabled:opacity-50">{resetting === gang.id ? <LoaderCircle className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />} รีเซ็ต Token</button></div></div>)}{filtered.length === 0 && <div className="p-14 text-center text-[12px] text-[#8995a5]">ไม่พบแก๊งที่ตรงกับการค้นหา</div>}</div>
    </section>

    <AnimatePresence>{token && <motion.div className="fixed inset-0 z-[100] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button type="button" aria-label="ปิด" className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setToken(null)} /><motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="relative w-full max-w-[480px] rounded-[32px] border border-[#f39a9a]/35 bg-[#171014] p-6 shadow-2xl sm:p-8"><button type="button" onClick={() => setToken(null)} className="absolute right-5 top-5 grid size-8 place-items-center rounded-full text-[#d9a3a3] hover:bg-white/10"><X className="size-4" /></button><div className="grid size-14 place-items-center rounded-2xl bg-[#ef4444]/15 text-[#ff9e9e]"><KeyRound className="size-7" /></div><h2 className="mt-6 text-[25px] font-[900] text-white">สร้างรหัสลับใหม่แล้ว</h2><p className="mt-2 text-[12px] leading-relaxed text-[#c5a9ae]">รหัสใหม่สำหรับ <span className="font-[900] text-white">{token.name}</span> จะแสดงเพียงครั้งเดียว</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4"><code className="break-all text-[12px] text-white">{token.value}</code></div><button type="button" onClick={() => navigator.clipboard.writeText(token.value)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f2dfe1] py-3.5 text-[11px] font-[900] text-[#331116] hover:bg-white"><Copy className="size-4" /> คัดลอกรหัสลับใหม่</button><Alert variant="destructive" className="mt-4 rounded-xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>ส่งรหัสนี้ให้เจ้าของแก๊งอย่างปลอดภัย</AlertTitle><AlertDescription>เมื่อปิดหน้าต่างนี้ ระบบจะไม่แสดงรหัสซ้ำ</AlertDescription></Alert></motion.div></motion.div>}</AnimatePresence>
  </>;
}

function Metric({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "blue" | "green" }) { return <div className={`flex items-center gap-4 rounded-[25px] border p-5 ${tone === "blue" ? "border-[#65b8f0]/20 bg-[#0e1a25]" : "border-[#65dfa0]/20 bg-[#0d1c17]"}`}><span className={`grid size-11 place-items-center rounded-2xl ${tone === "blue" ? "bg-[#4caaed]/15 text-[#83ceff]" : "bg-[#50d88c]/15 text-[#83e5aa]"}`}>{icon}</span><div><p className="text-[10px] font-[900] text-[#8d9baa]">{label}</p><p className="mt-1 text-[28px] font-[900] text-white">{value.toLocaleString("th-TH")}</p></div></div>; }
function MiniMetric({ label, value, detail }: { label: string; value: string | number; detail: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4"><div className="flex items-baseline justify-between gap-3"><p className="text-[10px] font-[900] tracking-[1px] text-[#8795a6]">{label}</p><span className="text-[15px] font-[900] text-[#c8e6ff]">{value}</span></div><p className="mt-2 text-[10px] text-[#687689]">{detail}</p></div>; }
