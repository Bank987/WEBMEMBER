import { ReactNode } from "react";
import { getGangBySubdomain } from "@/lib/db";
import { MusicWrapper } from "./MusicWrapper";

async function getYoutubeData(url: string) {
  if (!url) return null;
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
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
}

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
    </>
  );
}



