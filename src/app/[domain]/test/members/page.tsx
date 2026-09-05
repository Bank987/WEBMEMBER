import MembersClient from "../../members/MembersClient";
import { MusicWrapper } from "../../MusicWrapper";

export default async function TestMembersPage() {
  const mockMembers: any = [
    { id: "1", name: "BANKDEV", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "2", name: "THUNDER", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "2.5", name: "HEALER", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: "3", name: "SHADOW", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: "4", name: "CIPHER", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: "5", name: "NOVA", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=5" },
  ];

  const youtubeUrl = "https://www.youtube.com/watch?v=oCsaLoxNWsQ";
  let ytData = null;
  
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`);
    if (res.ok) {
      const data = await res.json();
      ytData = {
        title: data.title,
        artist: data.author_name,
        thumbnail: data.thumbnail_url
      };
    }
  } catch (e) {}

  return (
    <>
      <MembersClient 
        initialMembers={mockMembers}
        pageTitle="MOCKUP GANG"
        pageSubtitle="Premium Player Preview"
        theme="theme-default"
        backgroundImageUrl=""
      />
      <MusicWrapper 
        youtubeUrl={youtubeUrl}
        ytData={ytData}
        playerStyle="vinyl"
      />
    </>
  );
}
