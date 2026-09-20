"use client";

import { useState } from "react";
import { Users, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsFormWrapper } from "./SettingsFormWrapper";

type Partner = { name: string; url: string };

export function PartnerSettingsClient({
  initialEnabled,
  initialPartners,
  action
}: {
  initialEnabled: boolean;
  initialPartners: Partner[];
  action: (formData: FormData) => Promise<void>;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <SettingsFormWrapper action={action}>
      <input type="hidden" name="partnersEnabled" value={enabled ? "true" : "false"} />
      
      <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden">
        <div className="bg-[#0a0a0a] p-[18px] border-b border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <Users className="w-[18px] h-[18px] text-[#0084ff]" />
            <h3 className="text-[14px] font-[900] tracking-[1.8px] text-text-inverse">เพิ่มพันธมิตร (PARTNERS)</h3>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-[48px] h-[24px] rounded-full p-[2px] transition-colors duration-300 ease-in-out ${enabled ? "bg-[#0084ff]" : "bg-white/10"}`}
          >
            <motion.div
              layout
              className={`w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center ${enabled ? "ml-auto" : "mr-auto"}`}
            >
              {enabled && <Check className="w-[12px] h-[12px] text-[#0084ff]" />}
            </motion.div>
          </button>
        </div>
        
        <AnimatePresence>
          {enabled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-[27px] space-y-[18px] relative z-10 border-t border-white/5">
                <p className="text-[12px] text-[#888888] mb-[12px]">
                  เพิ่มปุ่มพันธมิตรหน้าเว็บหลัก (สูงสุด 3 แก๊ง) ใส่ชื่อแก๊งและลิ้งค์เว็บของพันธมิตรได้เลย
                </p>
                
                {[0, 1, 2, 3, 4].map((i) => {
                  const partner = (initialPartners && initialPartners[i]) || { name: "", url: "" };
                  return (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] p-4 border border-white/5 bg-white/5 rounded-[12px]">
                      <div>
                        <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">ชื่อ PARTNER {i + 1}</p>
                        <input 
                          type="text" 
                          name={`partnerName_${i}`} 
                          defaultValue={partner.name} 
                          placeholder="เช่น GANGLIST" 
                          className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none focus:border-[#0084ff] transition-colors" 
                        />
                      </div>
                      <div>
                        <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">ลิ้งค์เว็บ (URL)</p>
                        <input 
                          type="url" 
                          name={`partnerUrl_${i}`} 
                          defaultValue={partner.url} 
                          placeholder="https://..." 
                          className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none focus:border-[#0084ff] transition-colors" 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SettingsFormWrapper>
  );
}

