"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundEffects({ type }: { type?: string }) {
  if (!type || type === "none") return null;

  if (type === "scanlines") {
    return <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-[5]" />;
  }

  if (type === "snow") {
    return <SnowEffects />;
  }

  if (type === "orbs") {
    return <OrbsEffects />;
  }

  if (type === "matrix") {
    return <MatrixEffects />;
  }

  return null;
}

function SnowEffects() {
  const [flakes, setFlakes] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);
  useEffect(() => {
    setFlakes(Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 18,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {flakes.map(f => (
        <motion.div
          key={f.id}
          className="absolute top-[-10%] w-[3px] h-[3px] bg-white rounded-full opacity-50"
          style={{ left: `${f.left}%` }}
          animate={{ top: "110%", opacity: [0, 0.8, 0], x: [0, Math.random() * 50 - 25] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function OrbsEffects() {
  const [orbs, setOrbs] = useState<{ id: number; left: number; top: number; delay: number; duration: number }[]>([]);
  useEffect(() => {
    setOrbs(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {orbs.map(o => (
        <motion.div
          key={o.id}
          className="absolute w-[100px] h-[100px] rounded-full bg-[color:var(--gang-accent)] filter blur-[50px] opacity-20"
          style={{ left: `${o.left}%`, top: `${o.top}%` }}
          animate={{ 
            x: [0, Math.random() * 100 - 50, 0], 
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: o.duration, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MatrixEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array.from({ length: columns }).map(() => 1);
    
    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue("--gang-accent") || "#0f0";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = accent.trim();
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1] opacity-30" />;
}
