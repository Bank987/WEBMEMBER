"use client";

import { useState } from "react";
import { Crown, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function VipPage() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const router = useRouter();
  
  // Extract subdomain from host
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
      
      // Success, maybe redirect or show success
      router.refresh();
      alert("ยินดีด้วย! แก๊งของคุณได้รับการอัปเกรดเป็น VIP แล้ว!");
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
            <label className="text-xs font-bold text-yellow-500/70 uppercase tracking-widest flex items-center gap-2">
              <KeyRound className="size-3" />
              VIP KEY CODE
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => {
                setKey(e.target.value.toUpperCase());
                setStatus("idle");
                setErrorMsg("");
              }}
              disabled={status === "checking" || redeeming}
              placeholder="VIP-XXXX-XXXX-XXXX"
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
    </div>
  );
}
