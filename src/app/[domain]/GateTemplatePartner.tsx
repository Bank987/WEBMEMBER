"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getGangTheme } from "@/lib/themes";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { BackgroundMedia } from "@/components/BackgroundMedia";

type Settings = {
  pageTitle: string;
  pageSubtitle: string;
  buttonText: string;
  theme?: string;
  backgroundImageUrl?: string;
  textColor?: string;
  fontFamily?: string;
  particleEffect?: string;
  customAccentColor?: string;
  logoUrl?: string;
};

type Partner = {
  name: string;
  domain: string;
  isMain?: boolean;
};

export default function GateTemplatePartner({ 
  settings, 
  partners 
}: { 
  settings: Settings,
  partners: Partner[]
}) {
  const theme = getGangTheme(settings.theme);
  const fontClass = settings.fontFamily === 'serif' ? 'font-serif' : settings.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
  
  return (
    <div 
      className={`fixed inset-0 overflow-hidden ${fontClass} ${theme.className}`} 
      style={{ 
        backgroundColor: theme.background,
        ["--gang-accent" as string]: settings.customAccentColor || theme.accent,
        color: settings.textColor || '#ededed'
      }}
    >
      {settings.backgroundImageUrl && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={settings.backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 to-black/90" />
        </div>
      )}

      <div className="absolute inset-0 z-[3] pointer-events-none">
        <BackgroundEffects type={settings.particleEffect} />
      </div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center min-h-full">
        
        {/* Content */}
        <div className="relative z-[10] text-center px-4 max-w-5xl mx-auto flex flex-col items-center w-full">
          
          {settings.logoUrl && (
            <motion.div 
              className="relative w-[120px] h-[120px] mb-[24px] drop-shadow-[0_0_15px_var(--gang-accent)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Image 
                src={settings.logoUrl} 
                alt="Faction Logo" 
                fill
                priority
                quality={100}
                className="object-contain"
                sizes="120px"
              />
            </motion.div>
          )}

          <div className="mb-16">
            <motion.h2 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="text-[color:var(--gang-accent)] font-[900] text-[22.5px] tracking-[-0.5625px] mb-[9px] uppercase"
            >
              {settings.pageTitle}
            </motion.h2>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[45px] font-[900] tracking-[-1.125px] leading-[45px] uppercase inline-block"
              style={{ color: settings.textColor || '#ededed' }}
            >
              {settings.pageSubtitle}
            </motion.h1>
          </div>

          {/* Partners Row */}
          <div className="w-full max-w-full overflow-x-auto pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-nowrap items-center justify-start md:justify-center gap-4 w-max min-w-full px-4 md:px-0 mx-auto"
            >
              {partners.map((partner, index) => {
                const isMain = partner.isMain;
                
                return (
                  <Link key={index} href={`/test/members`} className="shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative group overflow-hidden flex flex-col items-center justify-center 
                        transition-all duration-300 backdrop-blur-md cursor-pointer border
                        ${isMain 
                          ? 'w-[280px] h-[100px] sm:w-[320px] sm:h-[120px] bg-black/40 border-white/20 hover:border-[color:var(--gang-accent)] hover:bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10' 
                          : 'w-[200px] h-[80px] sm:w-[240px] sm:h-[90px] bg-black/20 border-white/5 hover:border-white/20 hover:bg-black/40 opacity-70 hover:opacity-100'
                        }
                      `}
                      style={{ borderRadius: '16px' }}
                    >
                      {isMain && (
                        <div className="absolute inset-0 bg-[color:var(--gang-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      )}
                      
                      <h3 className={`font-bold uppercase tracking-widest text-center transition-colors duration-300 ${isMain ? 'text-[20px] text-white group-hover:text-[color:var(--gang-accent)]' : 'text-[14px] text-white/70 group-hover:text-white'}`}>
                        {partner.name}
                      </h3>
                      <span className={`uppercase font-medium tracking-[0.2em] mt-1 ${isMain ? 'text-[11px] text-white/50 group-hover:text-[color:var(--gang-accent)]' : 'text-[9px] text-white/30'}`}>
                        Partner
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Subtle Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
        >
          <p className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium uppercase" style={{ color: settings.textColor || '#ffffff' }}>
            LASTNAME.SITE BY. ganglist
          </p>
        </motion.div>
      </div>
    </div>
  );
}
