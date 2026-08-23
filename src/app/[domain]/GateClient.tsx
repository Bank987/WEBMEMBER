"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { NeonTypingButton } from "@/components/NeonTypingButton";
import { getGangTheme } from "@/lib/themes";
import { BackgroundEffects } from "@/components/BackgroundEffects";
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
  // fade
  return {
    initial: { opacity: 0, filter: "blur(10px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    transition: { duration: 1, delay, ease: "easeOut" }
  };
};

export default function GateClient({ settings }: { settings: Settings }) {
  const theme = getGangTheme(settings.theme);
  const fontClass = settings.fontFamily === 'serif' ? 'font-serif' : settings.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
  
  let cursorClass = "";
  if (settings.customCursor === 'crosshair') cursorClass = "cursor-crosshair";
  
  useEffect(() => {
    if (settings.customCursor === 'glow') {
      const handleMouseMove = (e: MouseEvent) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [settings.customCursor]);

  return (
    <div 
      className={`min-h-screen overflow-hidden relative flex flex-col items-center justify-center ${fontClass} ${theme.className} ${cursorClass}`} 
      style={{ 
        backgroundColor: theme.background,
        ["--gang-accent" as string]: settings.customAccentColor || theme.accent,
        color: settings.textColor || '#ededed'
      }}
    >
      {settings.backgroundImageUrl && (
        <>
          <div className="absolute inset-0 z-[1]">
            <Image 
              src={settings.backgroundImageUrl} 
              alt="Background" 
              fill 
              priority
              quality={100}
              className="object-contain object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 to-black/90" />
        </>
      )}

      <div className="absolute inset-0 z-[3]">
        <BackgroundEffects type={settings.particleEffect} />
      </div>
      
      {settings.customCursor === 'glow' && (
        <div className="pointer-events-none fixed inset-0 z-[50] mix-blend-screen hidden md:block">
          <div className="absolute w-[300px] h-[300px] bg-[color:var(--gang-accent)] rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2" 
               style={{
                 left: 'var(--mouse-x, 50%)',
                 top: 'var(--mouse-y, 50%)',
                 transition: 'left 0.1s ease-out, top 0.1s ease-out'
               }} 
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-[10] text-center px-4 max-w-4xl mx-auto flex flex-col items-center w-full">
        
        {settings.logoUrl && (
          <motion.div 
            className="relative w-[120px] h-[120px] mb-[24px] drop-shadow-[0_0_15px_var(--gang-accent)]"
            {...getAnimationProps(settings.entryAnimation, 0)}
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

        <div className="mb-12">
          <motion.h2 
            {...getAnimationProps(settings.entryAnimation, settings.logoUrl ? 1 : 0)}
             className="text-[color:var(--gang-accent)] font-[900] text-[22.5px] tracking-[-0.5625px] mb-[9px] uppercase"
          >
            {settings.pageTitle}
          </motion.h2>
          
          <motion.h1 
            {...getAnimationProps(settings.entryAnimation, settings.logoUrl ? 2 : 1)}
            className="text-[45px] font-[900] tracking-[-1.125px] leading-[45px] mb-[18px] uppercase inline-block"
            style={{ color: settings.textColor || '#ededed' }}
          >
            {settings.pageSubtitle}
          </motion.h1>
          
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-[18px] mt-[24px] w-full"
        >
          <div className={
            settings.buttonShape === 'rectangle' ? "w-[240px] h-[64px] sm:w-[320px] sm:h-[72px]" :
            settings.buttonShape === 'parallelogram' ? "w-[240px] h-[64px] sm:w-[320px] sm:h-[72px]" :
            "w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]"
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

          {(settings.discordUrl || settings.facebookUrl) && (
            <div className="flex items-center justify-center gap-[18px] mt-[18px]">
              {settings.discordUrl && (
                <a href={settings.discordUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[#5865F2] hover:bg-[#5865F2] text-white/50 hover:text-white transition-all z-20 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2] text-white/50 hover:text-white transition-all z-20 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-current" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Subtle Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium uppercase" style={{ color: settings.textColor || '#ffffff' }}>
          LASTNAME.SITE BY. ganglist
        </p>
      </motion.div>
    </div>
  );
}
