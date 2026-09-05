"use client";

import { MiniPlayer } from "@/components/music-ui/MiniPlayer";
import { PremiumPlayer } from "@/components/music-ui/PremiumPlayer";
import { VinylPlayer } from "@/components/music-ui/VinylPlayer";
import { Track } from "@/types/music";
import { usePathname } from "next/navigation";

interface MusicWrapperProps {
  youtubeUrl: string;
  ytData: { title: string; artist: string; thumbnail: string } | null;
  playerStyle?: string;
}

export function MusicWrapper({ youtubeUrl, ytData, playerStyle = "classic" }: MusicWrapperProps) {
  const pathname = usePathname();
  const isGatePage = !pathname || pathname === '/';

  if (!youtubeUrl) return null;

  const currentTrack: Track = {
    id: 1,
    title: ytData?.title || "FREZHGANG Audio",
    artist: ytData?.artist || "System Background",
    duration: 0,
    albumArt: ytData?.thumbnail || "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=200&h=200&fit=crop",
    url: youtubeUrl
  };

  return (
    <div className={`fixed bottom-[36px] right-[36px] z-50 ${isGatePage ? "opacity-0 pointer-events-none" : ""}`}>
      {playerStyle === "premium" ? (
        <PremiumPlayer track={currentTrack} autoPlay={true} />
      ) : playerStyle === "vinyl" ? (
        <VinylPlayer track={currentTrack} initialExpanded={true} />
      ) : (
        <MiniPlayer track={currentTrack} autoPlay={true} />
      )}
    </div>
  );
}


