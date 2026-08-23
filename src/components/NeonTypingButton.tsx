"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  label?: string;
  loadingText?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  imageSrc?: string;
}

export function NeonTypingButton({ 
  label = "MEMBER", 
  loadingText = "ACCESSING_SYSTEM...", 
  href = "/members",
  className = "",
  textClassName = "text-[12px]",
  imageSrc,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

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
    <Link href={href} className={className}>
      <motion.button
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`w-full h-full relative group flex flex-col items-center justify-center rounded-[16px] overflow-hidden transition-all duration-300 border ${
          isHovered ? "border-[#0084ff] bg-[#0084ff]/5" : "border-[rgba(255,255,255,0.1)] bg-black/20 backdrop-blur-sm"
        } ${imageSrc && !imageError ? 'p-0' : 'gap-[9px] p-[16px]'}`}
        style={{
          boxShadow: isHovered 
            ? "0 0 25px rgba(0, 132, 255, 0.3)" 
            : "0 0 0px rgba(0, 132, 255, 0)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {imageSrc && !imageError ? (
          /* Image Mode - Smart Auto Fit */
          <div className="relative w-full h-full flex items-center justify-center p-[8px]">
            <img 
              src={useProxy ? `/api/image-proxy?url=${encodeURIComponent(imageSrc)}` : imageSrc} 
              alt={label} 
              referrerPolicy="no-referrer"
              onError={() => {
                if (!useProxy) {
                  setUseProxy(true); // Try proxy first
                } else {
                  setImageError(true); // Proxy failed too, fallback to text
                }
              }}
              className={`w-full h-full object-cover rounded-[12px] transition-all duration-500 ${isHovered ? 'scale-110 filter brightness-125 drop-shadow-[0_0_15px_rgba(0,132,255,0.5)]' : 'filter brightness-90'}`} 
            />
            {/* Hover overlay glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-[#0084ff]/0 via-[#0084ff]/20 to-[#0084ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>
        ) : (
          /* Text Mode - Neon Typing Effect */
          <>
            <div className={`relative z-10 flex flex-col items-center justify-center font-sans tracking-[1.8px] font-[900] uppercase ${textClassName} h-full w-full px-2`}>
              <div className="flex justify-center items-center text-center break-words w-full max-w-full">
                {!isHovered ? (
                  <span className="text-[#ffffff] leading-tight break-words">{label}</span>
                ) : (
                  <span className="text-[#0084ff] leading-tight break-words">
                    {loadingText.slice(0, textIndex)}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[6px] h-[12px] bg-[#0084ff] ml-[3px] align-middle"
                    />
                  </span>
                )}
              </div>
            </div>

            {/* Scanline / Glitch effect overlay on hover */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
            )}
          </>
        )}
      </motion.button>
    </Link>
  );
}
