"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X, Send, CheckCircle2 } from "lucide-react";
import { submitSuggestion } from "@/actions/suggestions";

export function SuggestFeatureButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      topic: formData.get("topic") as string,
      description: formData.get("description") as string,
      senderName: formData.get("senderName") as string,
      contactInfo: formData.get("contactInfo") as string,
    };

    const res = await submitSuggestion(data);
    setLoading(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/40 hover:to-orange-500/40 border border-amber-500/30 rounded-full text-[11px] font-[900] tracking-wide text-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
      >
        <Lightbulb className="w-4 h-4" />
        <span className="hidden sm:inline">????????</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {success ? (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-[900] text-white tracking-wide mb-2">????????????????!</h3>
                  <p className="text-white/60 text-sm">??????????????????? ???????????????????????????????????????????</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/20 rounded-xl">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                      </div>
                      <h2 className="text-xl font-[900] tracking-wide text-white">???????? / ??????</h2>
                    </div>
                    <p className="text-white/50 text-sm">?????????????????????????????? ????????????????????? ????????????!</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium text-center">
                        {error}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest pl-1">?????? / ????????</label>
                      <input 
                        required 
                        name="topic"
                        placeholder="???? ????????????????? Line, ???????????????" 
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest pl-1">??????????</label>
                      <textarea 
                        required 
                        name="description"
                        rows={4}
                        placeholder="???????????????????? ???????????????????..." 
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest pl-1">???????????</label>
                        <input 
                          required 
                          name="senderName"
                          placeholder="???? ???? ??????" 
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest pl-1">????????????? (?????????)</label>
                        <input 
                          name="contactInfo"
                          placeholder="FB, Line ???? ????????" 
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white rounded-xl py-3.5 text-[13px] font-[900] tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                    >
                      {loading ? "????????..." : "??????????"}
                      {!loading && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
