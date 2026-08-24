"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export function BackgroundMedia({ url, className = "" }: { url?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!url) return;
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(ytRegex);
    if (!match || !match[1]) return;
    
    const videoId = match[1];

    const initPlayer = () => {
      if (!containerRef.current) return;
      
      // Clear container in case of re-mount
      containerRef.current.innerHTML = "";
      const playerDiv = document.createElement("div");
      playerDiv.className = "w-full h-full";
      containerRef.current.appendChild(playerDiv);

      playerRef.current = new window.YT.Player(playerDiv, {
        videoId: videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          mute: 1,
          showinfo: 0
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
      
      // Save existing callback if any
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };
    } else if (window.YT.Player) {
      initPlayer();
    } else {
      // API loading but not ready
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [url]);

  if (!url) return null;

  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const isYoutube = ytRegex.test(url);

  if (isYoutube) {
    return (
      <div className={`absolute inset-0 z-[1] overflow-hidden bg-black ${className}`}>
        <div className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div ref={containerRef} className="w-full h-full" />
        </div>
      </div>
    );
  }

  // Fallback to Image
  return (
    <div className={`absolute inset-0 z-[1] ${className}`}>
      <Image src={url} alt="Background" fill priority quality={100} className="object-cover" unoptimized={url.toLowerCase().endsWith(".gif")} />
    </div>
  );
}
