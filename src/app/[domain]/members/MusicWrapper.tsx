"use client";

import { MiniPlayer } from "@/components/music-ui/MiniPlayer";
import { Track } from "@/types/music";

interface MusicWrapperProps {
  youtubeUrl: string;
  ytData: { title: string; artist: string; thumbnail: string } | null;
}

export function MusicWrapper({ youtubeUrl, ytData }: MusicWrapperProps) {
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
    <div className="fixed bottom-[36px] right-[36px] z-50">
      <MiniPlayer 
        track={currentTrack} 
        autoPlay={true}
      />
    </div>
  );
}
