"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export function BackgroundMedia({ url, className = "" }: { url?: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
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
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={true}
            muted={true}
            loop={true}
            controls={false}
            width="100vw"
            height="56.25vw"
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

  // Fallback to Image (works for GIF, JPG, PNG)
  return (
    <div className={`absolute inset-0 z-[1] ${className}`}>
      <Image 
        src={url} 
        alt="Background" 
        fill 
        priority
        quality={100} 
        className="object-cover" 
        unoptimized={url.toLowerCase().endsWith(".gif")} // Next.js optimizes gifs by taking the first frame sometimes, unoptimized prevents it from breaking animation
      />
    </div>
  );
}

