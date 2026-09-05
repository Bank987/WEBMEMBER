import { ReactNode } from "react";
import { getGangBySubdomain } from "@/lib/db";
import { MusicWrapper } from "./MusicWrapper";
import { GangAnnouncement } from "@/components/GangAnnouncement";

import { unstable_cache } from "next/cache";

const getYoutubeData = async (url: string) => {
  const extractId = (u: string) => {
    const match = u.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const vid = extractId(url);
  if (!vid) return null;
  
  const cleanUrl = `https://www.youtube.com/watch?v=${vid}`;

  const fetchCached = unstable_cache(
    async (u: string) => {
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(u)}&format=json`);
        if (!res.ok) throw new Error("OEmbed failed");
        const data = await res.json();
        return {
          title: data.title,
          artist: data.author_name,
          thumbnail: data.thumbnail_url
        };
      } catch {
        // Fallback to predictible thumbnail if OEmbed fails (e.g. video is private, unlisted, or age restricted)
        return {
          title: "YouTube Audio Stream",
          artist: "System Background",
          thumbnail: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`
        };
      }
    },
    [`youtube-oembed-${vid}`],
    { revalidate: 86400 }
  );
  return fetchCached(cleanUrl);
};

export default async function DomainLayout({ children, params }: { children: ReactNode, params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  const ytData = gang ? await getYoutubeData(gang.youtubeMusicUrl) : null;
  
  return (
    <>
      {children}
      {gang && (
        <MusicWrapper 
          youtubeUrl={gang.youtubeMusicUrl} 
          ytData={ytData}
          playerStyle={gang.musicPlayerStyle}
        />
      )}
    </>
  );
}



