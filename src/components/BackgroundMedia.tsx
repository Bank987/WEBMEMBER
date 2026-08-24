"use client";

import Image from "next/image";

export function BackgroundMedia({ url, className = "" }: { url?: string; className?: string }) {
  if (!url) return null;

  // Check if YouTube URL
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(ytRegex);

  if (match && match[1]) {
    const videoId = match[1];
    return (
      <div className={`absolute inset-0 z-[1] overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`}
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 w-[120vw] h-[67.5vw] min-h-[120vh] min-w-[213.33vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none scale-[1.3]"
          title="Background Video"
        />
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
