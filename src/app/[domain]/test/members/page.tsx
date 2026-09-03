import MembersClient from "../../members/MembersClient";
import { MusicWrapper } from "../../MusicWrapper";

export default async function TestMembersPage() {
  const mockMembers = [
    { id: "1", name: "BANKDEV", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", imageType: "avatar", order: 0 },
    { id: "2", name: "THUNDER", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", imageType: "avatar", order: 1 },
    { id: "3", name: "SHADOW", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", imageType: "avatar", order: 2 },
    { id: "4", name: "CIPHER", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", imageType: "avatar", order: 3 },
    { id: "5", name: "NOVA", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", imageType: "avatar", order: 4 },
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
      />
    </>
  );
}
