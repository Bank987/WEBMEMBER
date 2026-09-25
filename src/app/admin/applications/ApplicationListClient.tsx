"use client";

import { useState } from "react";
import { Application, Role } from "@/lib/db";
import { reviewApplication, toggleRecruitment, resetInviteToken } from "@/actions/apply";
import { Check, X, User, ExternalLink, Clock, QrCode, Download, Power, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function ApplicationListClient({ initialApplications, domain, logoUrl, isRecruitmentOpen = true, inviteToken = "" }: { initialApplications: Application[], domain: string, logoUrl: string, isRecruitmentOpen?: boolean, inviteToken?: string }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(isRecruitmentOpen);
  const [currentToken, setCurrentToken] = useState(inviteToken);
  const [isResetting, setIsResetting] = useState(false);
  
  // State for role selection modal
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("MEMBER");
  const [supportPosition, setSupportPosition] = useState<number>(3);

  const [showQR, setShowQR] = useState(false);
  
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/apply/${domain}` : `https://lastname.site/apply/${domain}`;
  const applyUrl = currentToken ? `${baseUrl}?token=${currentToken}` : baseUrl;
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=H&data=${encodeURIComponent(applyUrl)}&format=png`;

  const pendingApps = applications.filter(a => a.status === "PENDING");
  const processedApps = applications.filter(a => a.status !== "PENDING");

  const handleToggleOpen = async () => {
    const newState = !isOpen;
    setIsOpen(newState);
    const res = await toggleRecruitment(newState);
    if (res.error) {
      alert(res.error);
      setIsOpen(!newState);
    }
  };

  const handleResetToken = async () => {
    if (!confirm("แน่ใจหรือไม่ว่าต้องการเปลี่ยนลิงก์รับสมัครใหม่?\nQR Code และลิงก์อันเก่าจะใช้งานไม่ได้ทันที!")) return;
    setIsResetting(true);
    const res = await resetInviteToken();
    if (res.success && res.token) {
      setCurrentToken(res.token);
    } else {
      alert(res.error || "Failed to reset token");
    }
    setIsResetting(false);
  };

  const downloadQR = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 300;
      canvas.height = 300;

      // Fill white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 300, 300);

      // Load QR Code
      const qrImg = new globalThis.Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.src = `/api/image-proxy?url=${encodeURIComponent(qrUrl)}`;
      await new Promise((resolve, reject) => {
        qrImg.onload = resolve;
        qrImg.onerror = reject;
      });
      ctx.drawImage(qrImg, 0, 0, 300, 300);

      // Load Logo
      const logoImg = new globalThis.Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = `/api/image-proxy?url=${encodeURIComponent(logoUrl)}`;
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve; // Continue even if logo fails
      });

      // Draw Logo Background (White rounded box)
      const logoSize = 64;
      const x = (300 - logoSize) / 2;
      const y = (300 - logoSize) / 2;
      
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(x - 4, y - 4, logoSize + 8, logoSize + 8, 12);
      ctx.fill();

      // Draw Logo
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, logoSize, logoSize, 8);
      ctx.clip();
      ctx.drawImage(logoImg, x, y, logoSize, logoSize);
      ctx.restore();

      // Download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qrcode-${domain}.png`;
      a.click();
    } catch (err) {
      console.error(err);
      alert("ดาวน์โหลดรูปภาพล้มเหลว อาจเกิดจากข้อจำกัดด้านลิขสิทธิ์รูปภาพ (CORS) โปรดแคปหน้าจอแทนครับ");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("แน่ใจหรือไม่ว่าต้องการปฏิเสธคำขอนี้?")) return;
    setLoadingId(id);
    const res = await reviewApplication(id, "REJECT");
    if (res.success) {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: "REJECTED" } : a));
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  };

  const handleAcceptConfirm = async () => {
    if (!selectedApp) return;
    setLoadingId(selectedApp.id);
    const res = await reviewApplication(selectedApp.id, "ACCEPT", selectedRole, supportPosition);
    if (res.success) {
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, status: "ACCEPTED" } : a));
      setSelectedApp(null);
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-end gap-3">
        <button onClick={handleToggleOpen} className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-bold transition ${isOpen ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'}`}>
          <Power className="w-4 h-4" /> {isOpen ? "เปิดรับสมัครอยู่" : "ปิดรับสมัคร"}
        </button>
        <button onClick={() => setShowQR(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
          <QrCode className="w-4 h-4" /> แสดง QR Code รับสมัคร
        </button>
      </div>

      {/* Pending Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" /> รอการพิจารณา ({pendingApps.length})
          </h2>
        </div>

        {pendingApps.length === 0 ? (
          <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-10 text-center text-[#555] font-medium text-sm">
            ไม่มีคำขอเข้าแก๊งใหม่ในขณะนี้
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {pendingApps.map(app => (
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} key={app.id} className="bg-[#0b0e14] border border-white/10 rounded-2xl p-5 relative group overflow-hidden">
                  <div className="flex items-start gap-4">
                    <img src={app.avatar} alt={app.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 bg-black/50" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + app.name; }} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">{app.name}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-white/40 flex items-center gap-1 font-medium"><Clock className="w-3 h-3" /> {new Date(app.createdAt).toLocaleDateString("th-TH")}</span>
                        {app.facebookUrl && (
                          <a href={app.facebookUrl} target="_blank" rel="noreferrer" className="text-[10px] text-[#0084ff] hover:underline flex items-center gap-1 font-medium">
                            FB <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button disabled={loadingId === app.id} onClick={() => handleReject(app.id)} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#ef4444]/10 text-[#ef4444] text-[11px] font-bold hover:bg-[#ef4444]/20 transition disabled:opacity-50">
                      <X className="w-3.5 h-3.5" /> ปฏิเสธ
                    </button>
                    <button disabled={loadingId === app.id} onClick={() => setSelectedApp(app)} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition disabled:opacity-50 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" /> รับเข้าแก๊ง
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Processed Section */}
      {processedApps.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">ประวัติการพิจารณา</h2>
          <div className="bg-[#0b0e14] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm text-white/60">
              <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                <tr>
                  <th className="px-5 py-4 font-bold">ชื่อ</th>
                  <th className="px-5 py-4 font-bold">วันที่ขอ</th>
                  <th className="px-5 py-4 font-bold text-right">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {processedApps.map(app => (
                  <tr key={app.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-medium flex items-center gap-3">
                      <img src={app.avatar} alt="" className="w-6 h-6 rounded-md object-cover" />
                      {app.name}
                    </td>
                    <td className="px-5 py-4 text-[11px]">{new Date(app.createdAt).toLocaleString("th-TH")}</td>
                    <td className="px-5 py-4 text-right">
                      {app.status === "ACCEPTED" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md"><Check className="w-3 h-3" /> อนุมัติแล้ว</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#ef4444] bg-[#ef4444]/10 px-2 py-1 rounded-md"><X className="w-3 h-3" /> ปฏิเสธแล้ว</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Accept Role Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedApp(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#11151d] border border-white/10 p-6 rounded-[24px] shadow-2xl w-full max-w-sm">
              <h3 className="text-lg font-bold text-white mb-1">รับ {selectedApp.name} เข้าแก๊ง</h3>
              <p className="text-[12px] text-white/50 mb-6">โปรดเลือกยศ (Role) ที่ต้องการมอบให้สมาชิกใหม่</p>
              
              <div className="space-y-3 mb-6">
                {(["LEADER", "SUPPORT", "MEMBER"] as Role[]).map(role => (
                  <div key={role}>
                    <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all ${selectedRole === role ? 'border-[#0084ff] bg-[#0084ff]/10' : 'border-white/10 bg-black/40 hover:bg-white/5'}`}>
                      <input type="radio" name="role" value={role} checked={selectedRole === role} onChange={() => setSelectedRole(role)} className="hidden" />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRole === role ? 'border-[#0084ff]' : 'border-white/30'}`}>
                        {selectedRole === role && <div className="w-2 h-2 rounded-full bg-[#0084ff]" />}
                      </div>
                      <span className={`text-sm font-bold ${selectedRole === role ? 'text-[#0084ff]' : 'text-white'}`}>{role}</span>
                    </label>
                    {role === "SUPPORT" && selectedRole === "SUPPORT" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pl-4 pr-2 space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/5 cursor-pointer">
                          <input type="radio" name="supportPosition" value={2} checked={supportPosition === 2} onChange={() => setSupportPosition(2)} className="hidden" />
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${supportPosition === 2 ? 'border-[#0084ff]' : 'border-white/30'}`}>
                            {supportPosition === 2 && <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />}
                          </div>
                          <span className="text-[12px] text-white/70">Support (ล่าง FOUNDER)</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/5 cursor-pointer">
                          <input type="radio" name="supportPosition" value={3} checked={supportPosition === 3} onChange={() => setSupportPosition(3)} className="hidden" />
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${supportPosition === 3 ? 'border-[#0084ff]' : 'border-white/30'}`}>
                            {supportPosition === 3 && <div className="w-1.5 h-1.5 rounded-full bg-[#0084ff]" />}
                          </div>
                          <span className="text-[12px] text-white/70">Support (ล่าง LEADER)</span>
                        </label>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedApp(null)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[12px] font-bold transition">ยกเลิก</button>
                <button disabled={loadingId === selectedApp.id} onClick={handleAcceptConfirm} className="flex-1 py-3 rounded-xl bg-[#0084ff] hover:bg-[#0073e6] text-white text-[12px] font-bold transition flex items-center justify-center gap-2">
                  {loadingId === selectedApp.id ? "กำลังดำเนินการ..." : "ยืนยันรับเข้าแก๊ง"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#11151d] border border-white/10 p-8 rounded-[32px] shadow-2xl text-center max-w-sm w-full">
              <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><X className="w-4 h-4" /></button>
              <div className="w-12 h-12 bg-[#0084ff]/20 text-[#0084ff] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#0084ff]/30"><QrCode className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white mb-2">QR Code รับสมัครสมาชิก</h3>
              <p className="text-sm text-white/50 mb-8">บันทึกรูปนี้แล้วส่งให้เพื่อนเพื่อสแกนสมัครเข้าแก๊งได้เลย</p>
              
              <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-[0_0_40px_rgba(0,132,255,0.15)] relative border-[6px] border-white/5">
                <img src={qrUrl} alt="QR Code" className="w-[220px] h-[220px]" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-1.5 rounded-2xl shadow-xl">
                    <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover" />
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-3 rounded-xl border border-white/10 text-[11px] font-medium text-white/40 break-all select-all mb-4 text-left relative group pr-10">
                {applyUrl}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => navigator.clipboard.writeText(applyUrl)} className="text-white hover:text-[#0084ff]"><Check className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={downloadQR} className="w-full flex items-center justify-center gap-2 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-2xl py-3.5 text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,132,255,0.3)]">
                  <Download className="w-4 h-4" /> ดาวน์โหลดรูปลงเครื่อง
                </button>
                
                <button disabled={isResetting} onClick={handleResetToken} className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-3.5 text-sm font-bold transition-all disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} /> 
                  {isResetting ? "กำลังรีเซ็ต..." : "เปลี่ยนลิงก์รับสมัครใหม่"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
