import { ReactNode } from "react";
import { getGangBySubdomain } from "@/lib/db";
import { MusicWrapper } from "./MusicWrapper";
import { GangAnnouncement } from "@/components/GangAnnouncement";

import { unstable_cache } from "next/cache";

const getYoutubeData = async (url: string) => {
  const fetchCached = unstable_cache(
    async (u: string) => {
      if (!u) return null;
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(u)}&format=json`);
        if (!res.ok) return null;
        const data = await res.json();
        return {
          title: data.title,
          artist: data.author_name,
          thumbnail: data.thumbnail_url
        };
      } catch {
        return null;
      }
    },
    [`youtube-oembed-${url}`],
    { revalidate: 86400 } // Cache for 1 day
  );
  return fetchCached(url);
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
        />
      )}
      
      {gang && gang.announcementEnabled && (
        <GangAnnouncement 
          message={gang.announcementMessage || ""} 
          gangId={gang.id}
          images={gang.announcementImages}
          theme={gang.announcementTheme || "chromium"}
        />
      )}
    </>
  );
}



