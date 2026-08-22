"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export function RisingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 50 particles with random properties
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position percentage
      size: Math.random() * 4 + 2, // random size between 2px and 6px
      duration: Math.random() * 10 + 10, // random duration between 10s and 20s
      delay: Math.random() * 10, // random start delay
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-[-10%] rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-120vh"], // move upwards past the top
            x: ["0px", `${(Math.random() - 0.5) * 100}px`, "0px"], // gentle sway
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
