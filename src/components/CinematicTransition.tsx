"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CinematicTransition({ logoUrl, gangName }: { logoUrl?: string; gangName?: string }) {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetHref = customEvent.detail?.href || "/members";
      
      if (isActive) return;
      setIsActive(true);
      setStep(1); // Slide in black screen

      setTimeout(() => {
        setStep(2); // Logo appears and glows
        router.push(targetHref); // Load member page in background
        
        setTimeout(() => {
          setStep(3); // Fade out black screen revealing member page
          
          setTimeout(() => {
            setIsActive(false);
            setStep(0);
          }, 2500); // Wait for fade out to complete
        }, 2500); // Hold logo for 2.5 seconds
      }, 800); // Slide duration
    };

    window.addEventListener("cinematic-transition", handleTrigger);
    return () => window.removeEventListener("cinematic-transition", handleTrigger);
  }, [isActive, router]);

  // Typing effect logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (step >= 2 && gangName) {
      let i = 0;
      interval = setInterval(() => {
        setTypedName(gangName.slice(0, i + 1));
        i++;
        if (i >= gangName.length) clearInterval(interval);
      }, 80); // 80ms per letter typing speed
    } else if (step === 0) {
      setTypedName("");
    }
    return () => clearInterval(interval);
  }, [step, gangName]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ x: "100%" }}
          animate={step >= 3 ? { x: 0, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: step >= 3 ? 2.5 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <AnimatePresence>
              {step >= 2 && logoUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, filter: "drop-shadow(0 0 0px rgba(255,255,255,0))" }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    filter: "drop-shadow(0 0 50px rgba(255,255,255,0.4)) drop-shadow(0 0 20px rgba(255,255,255,0.2))" 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                >
                  <Image 
                    src={logoUrl} 
                    alt="Gang Logo" 
                    fill 
                    className="object-contain"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing Name */}
            <AnimatePresence>
              {step >= 2 && gangName && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <h2 
                    className="text-white text-2xl sm:text-3xl md:text-4xl font-[900] tracking-[4px] uppercase text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  >
                    {typedName}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[6px] sm:w-[8px] h-[24px] sm:h-[32px] bg-white ml-[6px] align-middle"
                    />
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
