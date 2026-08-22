"use client";

import { motion } from "framer-motion";
import { NeonTypingButton } from "@/components/NeonTypingButton";
import { getGangTheme } from "@/lib/themes";

export default function GateClient({ settings }: { settings: { pageTitle: string; pageSubtitle: string; buttonText: string; buttonImage?: string; theme?: string } }) {
  const theme = getGangTheme(settings.theme);
  return (
    <div className={`min-h-screen text-[#ededed] overflow-hidden relative flex flex-col items-center justify-center font-sans ${theme.className}`} style={{ backgroundColor: theme.background, ["--gang-accent" as string]: theme.accent }}>
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
             className="text-[color:var(--gang-accent)] font-[900] text-[22.5px] tracking-[-0.5625px] mb-[9px] uppercase"
          >
            {settings.pageTitle}
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="text-[45px] font-[900] tracking-[-1.125px] leading-[45px] mb-[18px] uppercase text-[#ededed]"
          >
            {settings.pageSubtitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="text-[10.5px] text-[#999999] max-w-2xl mx-auto leading-[15px] tracking-[3.15px] font-normal uppercase mt-[27px]"
          >
            System Initialization / Faction Access
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-[18px] mt-[36px]"
        >
          <div className="w-full sm:w-[450px]">
            <NeonTypingButton 
              label={settings.buttonText} 
              loadingText={`ACCESSING_${settings.buttonText}...`} 
              href="/members" 
              className="block w-full"
              textClassName="text-[18px] py-[9px]"
              imageSrc={settings.buttonImage || undefined}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
