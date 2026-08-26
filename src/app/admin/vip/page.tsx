"use client";

import { useState } from "react";
import { Crown, CheckCircle2, AlertCircle, KeyRound, ShoppingCart, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function VipPage() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const router = useRouter();
  
  const getSubdomain = () => {
    if (typeof window === "undefined") return "";
    const hostname = window.location.hostname;
    return hostname.split(".")[0];
  };

  const handleCheck = async () => {
    if (!key.trim()) return;
    setStatus("checking");
    setErrorMsg("");
    try {
      const res = await fetch("/api/vip/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setStatus("valid");
    } catch (e: any) {
      setStatus("invalid");
      setErrorMsg(e.message || "Invalid or used VIP key");
    }
  };

  const handleConfirm = async () => {
    if (status !== "valid" || !key.trim()) return;
    setRedeeming(true);
    try {
      const res = await fetch("/api/vip/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim(), subdomain: getSubdomain() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      router.refresh();
      setSuccessModalOpen(true);
      setKey("");
      setStatus("idle");
    } catch (e: any) {
      setStatus("invalid");
      setErrorMsg(e.message || "Failed to redeem key");
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-yellow-500/10 to-[#080a0e] p-8 shadow-[0_0_50px_rgba(234,179,8,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="size-20 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
            <Crown className="size-10 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide">UPGRADE TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">VIP</span></h1>
          <p className="text-white/50 mt-2 max-w-sm text-sm">ปลดล็อคฟีเจอร์ระดับพรีเมียมสำหรับแก๊งของคุณด้วย VIP Key แบบถาวร</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-yellow-500/70 uppercase tracking-widest flex items-center gap-2">
                <KeyRound className="size-3" />
                VIP KEY CODE
              </label>
              <button 
                onClick={() => setShowBuyModal(true)}
                className="text-xs font-bold text-[#0084ff] hover:text-[#339cff] flex items-center gap-1 bg-[#0084ff]/10 hover:bg-[#0084ff]/20 px-3 py-1 rounded-full transition"
              >
                <ShoppingCart className="size-3" />
                สั่งซื้อ VIP Key
              </button>
            </div>
            <input
              type="text"
              value={key}
              onChange={(e) => {
                setKey(e.target.value.toUpperCase());
                setStatus("idle");
                setErrorMsg("");
              }}
              disabled={status === "checking" || redeeming}
              placeholder="GANGLIST-XXXX-XXXX"
              className="w-full rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-center text-lg font-mono font-bold tracking-widest text-white placeholder-white/20 outline-none transition focus:border-yellow-500/50 focus:bg-white/5 focus:ring-1 focus:ring-yellow-500/50"
            />
          </div>

          {status === "invalid" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="size-5 shrink-0" />
              <p>{errorMsg || "โค้ดนี้ไม่ถูกต้อง หรือถูกใช้งานไปแล้ว"}</p>
            </motion.div>
          )}

          {status === "valid" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 rounded-xl bg-green-500/10 p-4 border border-green-500/20 text-green-400 text-sm">
              <CheckCircle2 className="size-5 shrink-0" />
              <p>โค้ดถูกต้อง! คุณสามารถกดปุ่มยืนยันเพื่ออัปเกรดได้เลย</p>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <button
              onClick={handleCheck}
              disabled={!key.trim() || status === "checking" || redeeming}
              className="rounded-xl bg-white/5 px-4 py-4 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "checking" ? "ตรวจสอบกำลัง..." : "ตรวจสอบโค้ด (CHECK)"}
            </button>
            <button
              onClick={handleConfirm}
              disabled={status !== "valid" || redeeming}
              className="rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-4 text-sm font-black text-black transition hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            >
              {redeeming ? "กำลังอัปเกรด..." : "ยืนยัน (CONFIRM)"}
            </button>
          </div>
        </div>
      </motion.div>

            {/* Success Modal */}
      <AnimatePresence>
        {successModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#1a1500] to-[#0c0f16] border border-yellow-500/30 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(234,179,8,0.2)] text-center p-8"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-70" />
              <div className="absolute -top-10 -left-10 size-40 bg-yellow-500/20 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="mx-auto size-20 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 border border-yellow-500/20 relative">
                <Crown className="size-10 text-yellow-400 relative z-10" />
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping opacity-50" />
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2">ยินดีด้วย!</h3>
              <p className="text-[#aeb9c8] text-[13px] leading-relaxed mb-8">
                แก๊งของคุณได้รับการอัปเกรดเป็น <strong className="text-yellow-400">VIP</strong> เรียบร้อยแล้ว! ปลดล็อคทุกฟีเจอร์พรีเมียมเต็มรูปแบบได้ทันที
              </p>
              
              <button 
                onClick={() => setSuccessModalOpen(false)}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-[13px] py-4 rounded-2xl transition hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.3)]"
              >
                สุดยอดไปเลย!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Buy Modal */}
      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0c0f16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute -top-20 -right-20 size-40 bg-[#0084ff]/20 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="size-5 text-[#0084ff]" />
                    สั่งซื้อ VIP Key
                  </h3>
                  <button onClick={() => setShowBuyModal(false)} className="text-white/40 hover:text-white transition">
                    <X className="size-5" />
                  </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center space-y-4">
                  <MessageSquare className="size-12 text-[#5865F2] mx-auto" />
                  <div>
                    <p className="text-white font-bold text-lg">ติดต่อซื้อที่ DISCORD SUPPORT</p>
                    <p className="text-white/50 text-sm mt-2">กรุณาเปิดทิคเก็ตในเซิร์ฟเวอร์ Discord ของเราเพื่อทำการสั่งซื้อ VIP Key ครับ แอดมินจะทำการส่งโค้ดให้หลังจากชำระเงินเรียบร้อยแล้ว</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowBuyModal(false)}
                  className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

