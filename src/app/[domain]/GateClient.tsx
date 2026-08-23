"use client";

import { motion } from "framer-motion";
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
        backgroundImage: settings.backgroundImageUrl ? `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${settings.backgroundImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ["--gang-accent" as string]: settings.customAccentColor || theme.accent,
        color: settings.textColor || '#ededed'
      }}
    >
      <BackgroundEffects type={settings.particleEffect} />
      
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
          <motion.img 
            src={settings.logoUrl} 
            alt="Faction Logo" 
            className="w-[120px] h-[120px] object-contain mb-[24px] drop-shadow-[0_0_15px_var(--gang-accent)]"
            {...getAnimationProps(settings.entryAnimation, 0)}
          />
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
          
          <motion.p 
            {...getAnimationProps(settings.entryAnimation, settings.logoUrl ? 3 : 2)}
            className="text-[10.5px] max-w-2xl mx-auto leading-[15px] tracking-[3.15px] font-normal uppercase mt-[27px]"
            style={{ color: settings.textColor ? settings.textColor : '#999999', opacity: settings.textColor ? 0.7 : 1 }}
          >
            System Initialization / Faction Access
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-[18px] mt-[18px] w-full"
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

          {(settings.discordUrl || settings.facebookUrl) && (
            <div className="flex items-center justify-center gap-[18px] mt-[18px]">
              {settings.discordUrl && (
                <a href={settings.discordUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[color:var(--gang-accent)] text-white/50 hover:text-[color:var(--gang-accent)] hover:bg-[color:var(--gang-accent)] hover:bg-opacity-10 transition-all z-20">
                  <Discord className="w-[18px] h-[18px]" />
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[color:var(--gang-accent)] text-white/50 hover:text-[color:var(--gang-accent)] hover:bg-[color:var(--gang-accent)] hover:bg-opacity-10 transition-all z-20">
                  <Facebook className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
