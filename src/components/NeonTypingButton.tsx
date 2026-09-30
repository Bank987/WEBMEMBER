"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Props {
  label?: string;
  loadingText?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  imageSrc?: string;
  shape?: string;
  buttonStyle?: string;
  pageTransition?: string;
}

export function NeonTypingButton({ 
  label = "MEMBER", 
  loadingText = "ACCESSING_SYSTEM...", 
  href = "/members",
  className = "",
  textClassName = "text-[12px]",
  imageSrc,
  shape = "square",
  buttonStyle = "neon",
    pageTransition = "default",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;
    window.dispatchEvent(new Event('force-play-music'));
    setIsNavigating(true);
    if (pageTransition === 'cinematic') {
      window.dispatchEvent(new CustomEvent('cinematic-transition', { detail: { href } }));
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setTextIndex((prev) => (prev < loadingText.length ? prev + 1 : prev));
      }, 50); // Typing speed
    } else {
      setTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, loadingText]);

  const [imageError, setImageError] = useState(false);
  const [useProxy, setUseProxy] = useState(false);

  return (
    <> <a href={href} className={className} onClick={handleNavigate}>
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`w-full h-full relative group flex flex-col items-center justify-center transition-all duration-300 ${imageSrc && !imageError && shape === 'square' ? 'p-0' : 'gap-[9px] p-[16px]'} ${
          buttonStyle === 'solid' ? (shape === 'square' ? 'rounded-[32px]' : 'rounded-full') :
          shape === 'parallelogram' ? 'rounded-none -skew-x-[15deg]' :
          shape === 'rectangle' ? 'rounded-[16px]' :
          shape === 'trapezoid' ? 'rounded-none [clip-path:polygon(10%_0,90%_0,100%_100%,0%_100%)]' :
          'rounded-[16px]'
        }`}
        style={{
          boxShadow: (isHovered && buttonStyle !== "solid") ? "0 0 25px rgba(0, 132, 255, 0.3)" : "0 0 0px rgba(0, 132, 255, 0)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 1. Base Layer (Blur and BG) */}
        <div className={`absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-300 ${
          buttonStyle === 'solid' ? (isHovered ? 'bg-[#333333] text-white border border-white/10' : 'bg-[#1f1f1f] text-white border border-white/5') :
          buttonStyle === 'glow' ? (isHovered ? 'bg-white/20 backdrop-blur-md shadow-[0_0_30px_var(--gang-accent)]' : 'bg-white/10 backdrop-blur-md shadow-[0_0_15px_var(--gang-accent)]') :
          (isHovered ? 'bg-[color:var(--gang-accent)]/5' : 'bg-black/10 backdrop-blur-sm')
        }`} />

        {/* 2. Animated Spinning Border (Neon Style Only) */}
        {buttonStyle === 'neon' && (
          <div 
            className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-0"
            style={{
              padding: '1.5px', // Border thickness
              background: 'transparent',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-spin transition-colors duration-500 ${
              isHovered 
                ? 'bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,var(--gang-accent)_80%,var(--gang-accent)_100%)]' 
                : 'bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,white_80%,white_100%)]'
            }`} style={{ animationDuration: '2s', willChange: 'transform' }} />
          </div>
        )}

        {imageSrc && !imageError && shape === 'square' ? (
          /* Image Mode - Smart Auto Fit */
          <div className="relative w-full h-full flex items-center justify-center p-[8px] z-10">
            <Image 
              src={useProxy ? `/api/image-proxy?url=${encodeURIComponent(imageSrc)}` : imageSrc} 
              alt={label}
              fill
              sizes="(max-width: 640px) 200px, 240px"
              priority
              quality={100}
              onError={() => {
                if (!useProxy) {
                  setUseProxy(true); // Try proxy first
                } else {
                  setImageError(true); // Proxy failed too, fallback to text
                }
              }}
              className={`object-contain rounded-[12px] transition-all duration-500 ${isHovered ? 'scale-110 filter brightness-125 drop-shadow-[0_0_15px_rgba(0,132,255,0.5)]' : 'filter brightness-90'}`} 
            />
            {/* Hover overlay glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-[#0084ff]/0 via-[#0084ff]/20 to-[#0084ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>
        ) : (
          /* Text Mode - Neon Typing Effect */
          <>
            <div className={`relative z-10 flex flex-col items-center justify-center font-sans tracking-[1.8px] ${buttonStyle === "solid" ? "font-[700]" : "font-[900] uppercase"} ${textClassName} h-full w-full px-2 ${shape === 'parallelogram' ? 'skew-x-[15deg]' : ''}`}>
              <div className="flex justify-center items-center text-center break-words w-full max-w-full">
                {buttonStyle === 'solid' ? (
                  <div className={`flex items-center justify-center gap-2 ${isHovered ? 'text-white' : 'text-gray-400'} transition-colors`}>
                    <span className="leading-tight break-words">{label}</span>
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                ) : !isHovered ? (
                  <span className="text-white leading-tight break-words">{label}</span>
                ) : (
                  <span className="text-[color:var(--gang-accent)] leading-tight break-words">
                    {loadingText.slice(0, textIndex)}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[6px] h-[12px] bg-[color:var(--gang-accent)] ml-[3px] align-middle"
                    />
                  </span>
                )}
              </div>
            </div>

            {/* Scanline / Glitch effect overlay on hover */}
            {isHovered && buttonStyle === 'neon' && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
            )}
          </>
        )}
      </motion.button>
    </a></>
  );
}


