"use client";

import { useState, useEffect } from "react";
import { KeyRound, LoaderCircle, CheckCircle2, Crown, Copy } from "lucide-react";
import { motion } from "framer-motion";

export function SuperAdminVipKeys({ initialKeys }: { initialKeys: any[] }) {
  const [keys, setKeys] = useState(initialKeys);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/super-admin/vip-keys", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      const refresh = await fetch("/api/super-admin/vip-keys");
      const refreshData = await refresh.json();
      setKeys(refreshData);
    } catch (e: any) {
      setError(e.message || "Failed to generate key");
    } finally {
      setGenerating(false);
    }
  };

  const copyKey = (val: string) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#0c0f16] p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2"><Crown className="size-5 text-yellow-500" /> VIP Keys Management</h2>
        <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 rounded-xl bg-[#157fd3] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#116bb5] disabled:opacity-50">
          {generating ? <LoaderCircle className="size-4 animate-spin" /> : <KeyRound className="size-4" />}
          Generate VIP Key
        </button>
      </div>

      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/5 text-white/50">
            <tr>
              <th className="px-4 py-3 font-medium">VIP Key</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Used By</th>
              <th className="px-4 py-3 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {keys.map((k, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-mono text-[#83c8ff] flex items-center gap-2">
                  {k.key}
                  <button onClick={() => copyKey(k.key)} className="text-white/40 hover:text-white"><Copy className="size-3" /></button>
                </td>
                <td className="px-4 py-3">
                  {k.isUsed ? (
                    <span className="text-red-400 text-xs font-bold px-2 py-1 rounded bg-red-500/10 border border-red-500/20">USED</span>
                  ) : (
                    <span className="text-green-400 text-xs font-bold px-2 py-1 rounded bg-green-500/10 border border-green-500/20">UNUSED</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">
                  {k.usedByGangId ? (
                    <div>
                      <p className="font-bold text-white">{k.usedByGangId.pageTitle}</p>
                      <p className="text-white/40">{k.usedByGangId.subdomain}</p>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-white/40">{new Date(k.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {keys.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-white/40">No VIP Keys generated yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
