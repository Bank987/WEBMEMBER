"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function BackgroundMedia({ url, className = "" }: { url?: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<any>(null);
  
  useEffect(() => setMounted(true), []);

  if (!url) return null;

  // Check if YouTube URL
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(ytRegex);

  if (match && match[1]) {
    const videoId = match[1];
    return (
      <div className={`absolute inset-0 z-[1] overflow-hidden bg-black ${className}`}>
        {mounted && (
          <ReactPlayer
            ref={playerRef}
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={true}
            muted={true}
            controls={false}
            width="100vw"
            height="56.25vw"
            onEnded={() => {
              if (playerRef.current) {
                playerRef.current.seekTo(0);
                // Also force play again in case seekTo pauses
                playerRef.current.getInternalPlayer()?.playVideo?.();
              }
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minHeight: "100vh",
              minWidth: "177.77vh",
              pointerEvents: "none"
            }}
            config={{
              youtube: {
                // @ts-ignore
                playerVars: {
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  disablekb: 1,
                  iv_load_policy: 3,
                  fs: 0,
                  playsinline: 1,
                }
              }
            }}
          />
        )}
      </div>
    );
  }

  // Fallback to Image
  return (
    <div className={`absolute inset-0 z-[1] ${className}`}>
      <Image 
        src={url} 
        alt="Background" 
        fill 
        priority
        quality={100} 
        className="object-cover" 
        unoptimized={url.toLowerCase().endsWith(".gif")}
      />
    </div>
  );
}
