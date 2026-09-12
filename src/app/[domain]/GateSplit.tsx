"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { NeonTypingButton } from "@/components/NeonTypingButton";
import { getGangTheme } from "@/lib/themes";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { BackgroundMedia } from "@/components/BackgroundMedia";
import { MessageSquare as Discord, Globe as Facebook } from "lucide-react";
import { useEffect } from "react";

type Settings = {
  pageTitle: string;
  pageSubtitle: string;
  buttonText: string;
  buttonImage?: string;
  theme?: string;
  backgroundImageUrl?: string;
  textColor?: string;
  fontFamily?: string;
  particleEffect?: string;
  customAccentColor?: string;
  customCursor?: string;
  logoUrl?: string;
  discordUrl?: string;
  facebookUrl?: string;
  entryAnimation?: string;
  buttonShape?: string;
  partnersEnabled?: boolean;
  partners?: { name: string; url: string }[];
};

const getAnimationProps = (type?: string, index: number = 0): any => {
  const delay = 0.2 + index * 0.4;
  if (type === 'typewriter') {
    return {
      initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      animate: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
      transition: { duration: 1.5, delay, ease: "linear" }
    };
  }
  if (type === 'glitch') {
    return {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: [0, -10, 10, -5, 5, 0], filter: ['blur(10px)', 'blur(0px)'] },
      transition: { duration: 0.6, delay, ease: "circOut" }
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" }
  };
};

export default function GateSplit({ settings }: { settings: Settings }) {
  const theme = getGangTheme(settings.theme || "default");
  const accent = settings.customAccentColor || theme.accent;

  useEffect(() => {
    document.documentElement.style.setProperty('--gang-accent', accent);
    document.documentElement.style.setProperty('--gang-glow', accent);
  }, [accent]);

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" 
      style={{
        backgroundColor: '#050505',
        fontFamily: settings.fontFamily ? `"${settings.fontFamily}", sans-serif` : "inherit",
        cursor: settings.customCursor ? `url(${settings.customCursor}), auto` : 'auto'
      }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: settings.backgroundImageUrl ? `url(${settings.backgroundImageUrl})` : 'none',
          opacity: 0.35
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 pointer-events-none" />

      {/* Accent glow (top-left corner ambient) */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[1] opacity-[0.07] blur-[120px]"
        style={{ background: accent }}
      />

      {/* Decorative accent line (left edge) */}
      <motion.div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] z-20"
        style={{ background: `linear-gradient(to bottom, transparent 20%, ${accent} 50%, transparent 80%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
      <div className="relative z-[10] w-full max-w-[1200px] mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row items-center gap-12 md:gap-0">
        
        {/* ═══════ LEFT SIDE ═══════ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[55%] md:pr-16 order-2 md:order-1">
          
          {/* ── Hero Identity ── */}
          <div className="mb-12 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-[40px] h-[2px] hidden md:block" style={{ background: accent }} />
              <span className="text-[11px] font-[800] tracking-[0.4em] uppercase" style={{ color: accent }}>
                {settings.pageTitle}
              </span>
            </motion.div>

            <motion.h1
              {...getAnimationProps(settings.entryAnimation, 0)}
              className="text-[40px] md:text-[60px] font-[900] tracking-[-2.5px] leading-[0.92] uppercase"
              style={{ color: settings.textColor || '#ededed' }}
            >
              {settings.pageSubtitle}
            </motion.h1>
          </div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="w-full flex flex-col items-center md:items-start"
          >
            {/* Separator */}
            <div className="flex items-center gap-3 mb-7 w-full max-w-[280px]">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="text-[9px] font-[700] tracking-[0.3em] text-white/20 uppercase">Enter</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className={
              settings.buttonShape === 'rectangle' ? "w-[240px] h-[64px] sm:w-[300px] sm:h-[68px]" :
              settings.buttonShape === 'parallelogram' ? "w-[240px] h-[64px] sm:w-[300px] sm:h-[68px]" :
              settings.buttonShape === 'trapezoid' ? "w-[260px] h-[64px] sm:w-[320px] sm:h-[68px]" :
              "w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
            }>
              <NeonTypingButton 
                label={settings.buttonText} 
                loadingText={`ACCESSING_${settings.buttonText}...`} 
                href="/members" 
                className="block w-full h-full"
                textClassName="text-[16px] text-center"
                imageSrc={settings.buttonImage || undefined}
                shape={settings.buttonShape}
              />
            </div>

            {/* Socials */}
            {(settings.discordUrl || settings.facebookUrl) && (
              <div className="flex items-center gap-3 mt-6">
                {settings.discordUrl && (
                  <a href={settings.discordUrl} target="_blank" rel="noopener noreferrer" className="p-[10px] rounded-full border border-white/10 hover:border-[#5865F2] hover:bg-[#5865F2]/20 text-white/40 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px] fill-current" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                  </a>
                )}
                {settings.facebookUrl && (
                  <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-[10px] rounded-full border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2]/20 text-white/40 hover:text-white transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px] fill-current" viewBox="0 0 320 512">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Partners ── */}
          {settings.partnersEnabled && settings.partners && settings.partners.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="w-full mt-12"
            >
              {/* Partner label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: accent, opacity: 0.6 }} />
                <span className="text-[10px] font-[700] tracking-[0.25em] text-white/30 uppercase">Partners</span>
                <div className="flex-1 h-[1px] bg-white/[0.06] max-w-[80px]" />
              </div>

              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
                {settings.partners.map((partner, idx) => (
                  <a href={partner.url} key={idx} target="_blank" rel="noopener noreferrer" className="group">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative px-6 py-3.5 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {/* Hover glow effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${accent}15 0%, transparent 60%)`,
                          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.06)`
                        }}
                      />
                      {/* Top highlight line on hover */}
                      <div 
                        className="absolute top-0 left-[20%] right-[20%] h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:left-[10%] group-hover:right-[10%]"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                      />
                      <div className="relative flex items-center gap-2.5">
                        <div 
                          className="w-[5px] h-[5px] rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-300"
                          style={{ background: accent }}
                        />
                        <span className="text-[13px] font-[800] text-white/35 group-hover:text-white/90 uppercase tracking-[0.05em] transition-colors duration-300">
                          {partner.name}
                        </span>
                      </div>
                    </motion.div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ═══════ RIGHT SIDE: 3D Logo ═══════ */}
        <div className="flex items-center justify-center w-full md:w-[45%] order-1 md:order-2">
          {settings.logoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center"
              style={{ perspective: "1500px" }}
            >
              {/* Fierce B&W Core Glow */}
              <motion.div 
                className="absolute -inset-[60px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 55%)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-[10px] rounded-full border-[2px] border-solid"
                style={{ borderColor: "rgba(255,255,255,0.9)" }}
                animate={{ rotateX: [20, 380], rotateY: [-20, 340], rotateZ: [0, 360], scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring */}
              <motion.div 
                className="absolute inset-[45px] rounded-full border-[3px] border-dashed"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
                animate={{ rotateX: [-40, -400], rotateY: [40, 400], rotateZ: [0, -360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Ring */}
              <motion.div 
                className="absolute inset-[80px] rounded-full border-[4px] border-dotted"
                style={{ borderColor: "#ffffff" }}
                animate={{ rotateX: [10, 370], rotateY: [10, 370], rotateZ: [0, 720] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* 3D Spinning Logo */}
              <motion.div
                className="relative w-[170px] h-[170px] md:w-[250px] md:h-[250px]"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Image 
                  src={settings.logoUrl} 
                  alt="Faction Logo" 
                  fill
                  priority
                  quality={100}
                  className="object-contain"
                  sizes="250px"
                />
              </motion.div>
            </motion.div>
          )}
        </div>

      </div>

      {/* Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-5 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium uppercase" style={{ color: settings.textColor || '#ffffff' }}>
          LASTNAME.SITE BY. ganglist
        </p>
      </motion.div>
    </div>
  );
}
