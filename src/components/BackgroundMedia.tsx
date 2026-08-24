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
      <div className={`absolute inset-0 z-[1] overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
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
