"use client";

import { AlertCircle, Copy, ExternalLink, KeyRound, LoaderCircle, RefreshCw, Search, ShieldCheck, UsersRound, X, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { SuperAdminGang } from "@/lib/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getGangUrl } from "@/lib/site-url";

export function SuperAdminDashboard({ gangs }: { gangs: SuperAdminGang[] }) {
  const [query, setQuery] = useState("");
  const [pinQuery, setPinQuery] = useState("");
  const [pinResult, setPinResult] = useState<{ id: string; subdomain: string; pageTitle: string; creatorIp: string; createdAt: string }[] | null>(null);
  const [pinSearching, setPinSearching] = useState(false);
  const [resetting, setResetting] = useState<string | null>(null);
  const [token, setToken] = useState<{ name: string; value: string } | null>(null);
  const [error, setError] = useState("");
  const filtered = useMemo(() => gangs.filter((gang) => `${gang.pageTitle} ${gang.subdomain}`.toLowerCase().includes(query.toLowerCase())), [gangs, query]);
  const totalMembers = gangs.reduce((sum, gang) => sum + gang.memberCount, 0);

  const [dialog, setDialog] = useState<{ type: "reset" | "delete"; gang: SuperAdminGang } | null>(null);
  const [deleteInput, setDeleteInput] = useState("");
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [newDomain, setNewDomain] = useState("");
  const [savingDomain, setSavingDomain] = useState(false);

  async function searchPin() {
    if (pinQuery.length !== 6) return;
    setPinSearching(true);
    setError("");
    try {
      const res = await fetch(`/api/super-admin/find-by-pin?pin=${pinQuery}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPinResult(data.gangs);
    } catch (e: any) {
      setError(e.message || "Failed to search PIN");
      setPinResult(null);
    } finally {
      setPinSearching(false);
    }
  }

  async function confirmReset() {
    if (!dialog || dialog.type !== "reset") return;
    const gang = dialog.gang;
    setResetting(gang.id); setError("");
    setDialog(null);
    try {
      const response = await fetch("/api/super-admin/reset-token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gangId: gang.id }) });
      const data = (await response.json()) as { error?: string; token?: string };
      if (!response.ok || !data.token) { setError(data.error ?? "ไม่สามารถสร้างรหัสใหม่ได้"); return; }
      setToken({ name: gang.pageTitle, value: data.token });
    } catch { setError("ไม่สามารถเชื่อมต่อระบบได้"); }
    finally { setResetting(null); }
  }

  async function confirmDelete() {
    if (!dialog || dialog.type !== "delete") return;
    const gang = dialog.gang;
    if (deleteInput !== gang.subdomain) {
      setError("พิมพ์ชื่อโดเมนไม่ถูกต้อง กรุณาลองใหม่");
      return;
    }
    setResetting(gang.id); setError("");
    setDialog(null);
    try {
      const response = await fetch("/api/super-admin/delete-gang", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ gangId: gang.id }) });
      if (!response.ok) { setError("ไม่สามารถลบแก๊งได้"); return; }
      window.location.reload();
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

    {/* PIN Search Section */}
    <section className="mt-8 overflow-hidden rounded-[24px] border border-[#ff9b9b]/20 bg-[linear-gradient(135deg,#1c1010,#140b0b_60%)] p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#ef4444]/15 text-[#ff7979] shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <KeyRound className="size-6" />
          </div>
          <div>
            <h2 className="text-[17px] font-[900] text-white">ค้นหาเว็บด้วย Recovery PIN</h2>
            <p className="mt-1 text-[11px] text-[#cca9a9]">ตรวจสอบว่ารหัส 6 หลักนี้เป็นของแก๊งไหน</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <input 
            value={pinQuery} 
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setPinQuery(val);
              if (val.length < 6) setPinResult(null);
            }} 
            placeholder="000000" 
            className="w-32 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-center text-[18px] tracking-[0.3em] font-mono text-white outline-none focus:border-[#ef4444] transition-all" 
          />
          <button 
            onClick={searchPin} 
            disabled={pinQuery.length !== 6 || pinSearching} 
            className="flex items-center gap-2 rounded-xl bg-[#ef4444] px-5 py-3 text-[12px] font-[900] text-white transition hover:bg-[#ef4444]/90 disabled:opacity-50"
          >
            {pinSearching ? <LoaderCircle className="size-4 animate-spin" /> : <Search className="size-4" />}
            ตรวจสอบ
          </button>
        </div>
      </div>

      {pinResult && (
        <div className="mt-5 border-t border-[#ef4444]/20 pt-5">
          {pinResult.length === 0 ? (
            <p className="text-[12px] text-[#ff9b9b]">ไม่พบเว็บไซต์ที่ใช้รหัสกู้คืนนี้</p>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] font-[900] text-[#ff9b9b] mb-3 uppercase tracking-[1px]">พบ {pinResult.length} เว็บไซต์</p>
              {pinResult.map((g) => (
                <div key={g.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-black/30 border border-[#ef4444]/10 p-3 sm:px-5">
                  <div>
                    <p className="text-[13px] font-[900] text-white">{g.pageTitle}</p>
                    <a href={getGangUrl(g.subdomain)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] text-[#ff9b9b] hover:underline">
                      {g.subdomain}.lastname.site <ExternalLink className="size-3" />
                    </a>
                  </div>
                  <div className="text-right text-[10px] text-[#cca9a9]">
                    <p>IP: {g.creatorIp || "Unknown"}</p>
                    <p>{g.createdAt ? new Intl.DateTimeFormat("th-TH", { dateStyle: "short" }).format(new Date(g.createdAt)) : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>

    <section className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-[#0c1016] shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:p-7"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#dceeff] text-[#145d91]"><UsersRound className="size-4" /></span><div><h2 className="text-[19px] font-[900] text-white">ไดเรกทอรีแก๊ง</h2><p className="mt-1 text-[11px] text-[#8290a0]">เว็บไซต์ทั้งหมดภายใต้ Lastname.site</p></div></div></div><label className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 transition focus-within:border-[#238de0]"><Search className="size-4 text-[#718092]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อหรือ slug" className="w-full bg-transparent px-2.5 py-3 text-[12px] text-white outline-none placeholder:text-[#647083] sm:w-[230px]" /></label></div>
      {error && <div className="px-5 pt-5 sm:px-7"><Alert variant="destructive" className="rounded-2xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>ดำเนินการไม่สำเร็จ</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>}
      
      <div className="p-3 sm:p-4">
        {filtered.map((gang) => (
          <div key={gang.id} className="group mb-2 flex flex-col gap-4 rounded-[22px] border border-transparent bg-white/[0.025] p-4 transition hover:border-[#398dca]/30 hover:bg-[#14202b] sm:flex-col sm:px-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#e5f4ff,#9ccced)] text-[12px] font-[900] text-[#155982] shadow-[0_8px_20px_rgba(94,174,227,0.15)]">
                  {gang.subdomain.slice(0, 2).toUpperCase()}
                  <span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#0c1016] bg-[#4fdb8e]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-[900] text-white">{gang.pageTitle}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <a href={getGangUrl(gang.subdomain)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] text-[#79bfff] hover:underline">
                      {gang.subdomain}.lastname.site <ExternalLink className="size-3" />
                    </a>
                    <button 
                      onClick={() => {
                        if (editingDomain === gang.id) {
                          setEditingDomain(null);
                        } else {
                          setEditingDomain(gang.id);
                          setNewDomain(gang.subdomain);
                        }
                      }}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-[900] text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      เปลี่ยน
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[#9daaba]"><UsersRound className="mr-1 inline size-3" />{gang.memberCount} สมาชิก</span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-[#9daaba]">{gang.createdAt ? new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(gang.createdAt)) : "-"}</span>
                <button onClick={() => setDialog({ type: "reset", gang })} disabled={resetting === gang.id} className="flex items-center gap-2 rounded-xl border border-[#ef7777]/25 bg-[#ef4444]/10 px-3 py-2 text-[10px] font-[900] text-[#ff9b9b] transition hover:bg-[#ef4444]/20 disabled:opacity-50">{resetting === gang.id ? <LoaderCircle className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />} รีเซ็ต Token</button>
                <button onClick={() => { setDialog({ type: "delete", gang }); setDeleteInput(""); }} disabled={resetting === gang.id} className="flex items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10 p-2.5 text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"><Trash2 className="size-3.5" /></button>
              </div>
            </div>
            
            {editingDomain === gang.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                className="w-full border-t border-white/5 pt-4 pb-2"
              >
                <label className="block text-[11px] font-[900] text-[#8290a0] mb-2 uppercase tracking-[1px]">เปลี่ยนชื่อ Subdomain (โดเมนเก่าจะถูกยกเลิกทันที)</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-1 items-center rounded-xl border border-white/10 bg-black/40 overflow-hidden focus-within:border-[#398dca]/50 transition-colors">
                    <input 
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="subdomain"
                      className="w-full bg-transparent px-4 py-3 text-[13px] text-white outline-none"
                    />
                    <span className="px-4 py-3 text-[13px] text-white/30 border-l border-white/5 bg-white/5 whitespace-nowrap">.lastname.site</span>
                  </div>
                  <button 
                    disabled={savingDomain || newDomain === gang.subdomain || newDomain.length < 3}
                    onClick={async () => {
                      setSavingDomain(true);
                      setError("");
                      try {
                        const res = await fetch("/api/super-admin/change-subdomain", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ gangId: gang.id, newSubdomain: newDomain })
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error);
                        window.location.reload();
                      } catch (e: any) {
                        setError(e.message || "เกิดข้อผิดพลาด");
                      } finally {
                        setSavingDomain(false);
                      }
                    }}
                    className="rounded-xl bg-white px-5 py-3 text-[12px] font-[900] text-black transition hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                  >
                    {savingDomain ? <LoaderCircle className="size-4 animate-spin" /> : "บันทึกและเปลี่ยนโดเมน"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="p-14 text-center text-[12px] text-[#8995a5]">ไม่พบแก๊งที่ตรงกับการค้นหา</div>}
      </div>
    </section>

    <AnimatePresence>{token && <motion.div className="fixed inset-0 z-[100] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button type="button" aria-label="ปิด" className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setToken(null)} /><motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="relative w-full max-w-[480px] rounded-[32px] border border-[#f39a9a]/35 bg-[#171014] p-6 shadow-2xl sm:p-8"><button type="button" onClick={() => setToken(null)} className="absolute right-5 top-5 grid size-8 place-items-center rounded-full text-[#d9a3a3] hover:bg-white/10"><X className="size-4" /></button><div className="grid size-14 place-items-center rounded-2xl bg-[#ef4444]/15 text-[#ff9e9e]"><KeyRound className="size-7" /></div><h2 className="mt-6 text-[25px] font-[900] text-white">สร้างรหัสลับใหม่แล้ว</h2><p className="mt-2 text-[12px] leading-relaxed text-[#c5a9ae]">รหัสใหม่สำหรับ <span className="font-[900] text-white">{token.name}</span> จะแสดงเพียงครั้งเดียว</p><div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4"><code className="break-all text-[12px] text-white">{token.value}</code></div><button type="button" onClick={() => navigator.clipboard.writeText(token.value)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f2dfe1] py-3.5 text-[11px] font-[900] text-[#331116] hover:bg-white"><Copy className="size-4" /> คัดลอกรหัสลับใหม่</button><Alert variant="destructive" className="mt-4 rounded-xl"><AlertCircle className="text-[#ef4444]" /><AlertTitle>ส่งรหัสนี้ให้เจ้าของแก๊งอย่างปลอดภัย</AlertTitle><AlertDescription>เมื่อปิดหน้าต่างนี้ ระบบจะไม่แสดงรหัสซ้ำ</AlertDescription></Alert></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>
      {dialog && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="ปิด" className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setDialog(null)} />
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} className="relative w-full max-w-[420px] rounded-[32px] border border-white/10 bg-[#11151c] p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={() => setDialog(null)} className="absolute right-5 top-5 grid size-8 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
            
            {dialog.type === "reset" && (
              <>
                <div className="grid size-14 place-items-center rounded-2xl bg-[#ef4444]/15 text-[#ff9b9b]">
                  <RefreshCw className="size-7" />
                </div>
                <h2 className="mt-6 text-[22px] font-[900] text-white">ยืนยันรีเซ็ต Token?</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#9caebe]">
                  คุณกำลังจะสร้างรหัสลับ Master Key ใหม่ให้กับแก๊ง <span className="text-white font-[900]">"{dialog.gang.pageTitle}"</span><br/>
                  รหัสเดิมทั้งหมดจะถูกยกเลิกและใช้งานไม่ได้อีกต่อไป
                </p>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => setDialog(null)} className="flex-1 rounded-xl bg-white/5 py-3.5 text-[12px] font-[900] text-white transition hover:bg-white/10">ยกเลิก</button>
                  <button onClick={confirmReset} disabled={resetting === dialog.gang.id} className="flex-1 rounded-xl bg-[#ef4444] py-3.5 text-[12px] font-[900] text-white transition hover:bg-[#ef4444]/90 flex items-center justify-center gap-2">
                    {resetting === dialog.gang.id && <LoaderCircle className="size-4 animate-spin" />} ยืนยันรีเซ็ต
                  </button>
                </div>
              </>
            )}

            {dialog.type === "delete" && (
              <>
                <div className="grid size-14 place-items-center rounded-2xl bg-red-500/15 text-red-500">
                  <Trash2 className="size-7" />
                </div>
                <h2 className="mt-6 text-[22px] font-[900] text-white">ยืนยันลบแก๊งถาวร?</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#9caebe]">
                  แก๊ง <span className="text-red-400 font-[900]">"{dialog.gang.pageTitle}"</span> และข้อมูลสมาชิกทั้งหมดจะถูกลบแบบ <span className="text-red-400 underline decoration-red-500/30">กู้คืนไม่ได้</span>
                </p>
                <div className="mt-5">
                  <label className="block text-[11px] font-[900] text-[#8290a0] mb-2 uppercase tracking-[1px]">พิมพ์ "{dialog.gang.subdomain}" เพื่อยืนยัน</label>
                  <input autoFocus value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} placeholder={dialog.gang.subdomain} className="w-full rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-[14px] text-white outline-none transition focus:border-red-500" />
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setDialog(null)} className="flex-1 rounded-xl bg-white/5 py-3.5 text-[12px] font-[900] text-white transition hover:bg-white/10">ยกเลิก</button>
                  <button onClick={confirmDelete} disabled={resetting === dialog.gang.id || deleteInput !== dialog.gang.subdomain} className="flex-1 rounded-xl bg-red-500 py-3.5 text-[12px] font-[900] text-white transition hover:bg-red-500/90 disabled:opacity-50 flex items-center justify-center gap-2">
                    {resetting === dialog.gang.id && <LoaderCircle className="size-4 animate-spin" />} ยืนยันลบถาวร
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}

function Metric({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone: "blue" | "green" }) { return <div className={`flex items-center gap-4 rounded-[25px] border p-5 ${tone === "blue" ? "border-[#65b8f0]/20 bg-[#0e1a25]" : "border-[#65dfa0]/20 bg-[#0d1c17]"}`}><span className={`grid size-11 place-items-center rounded-2xl ${tone === "blue" ? "bg-[#4caaed]/15 text-[#83ceff]" : "bg-[#50d88c]/15 text-[#83e5aa]"}`}>{icon}</span><div><p className="text-[10px] font-[900] text-[#8d9baa]">{label}</p><p className="mt-1 text-[28px] font-[900] text-white">{value.toLocaleString("th-TH")}</p></div></div>; }
function MiniMetric({ label, value, detail }: { label: string; value: string | number; detail: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4"><div className="flex items-baseline justify-between gap-3"><p className="text-[10px] font-[900] tracking-[1px] text-[#8795a6]">{label}</p><span className="text-[15px] font-[900] text-[#c8e6ff]">{value}</span></div><p className="mt-2 text-[10px] text-[#687689]">{detail}</p></div>; }
