import MembersTemplatePremium from "../../members/MembersTemplatePremium";
import { MusicWrapper } from "../../MusicWrapper";

export default async function TestMembersPage() {
  const mockMembers: any = [
    // FOUNDERS (4)
    { id: "f1", name: "BANKDEV", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=f1" },
    { id: "f2", name: "DARKSIDE", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=f2" },
    { id: "f3", name: "ZENITH", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=f3" },
    { id: "f4", name: "PHOENIX", role: "FOUNDER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=f4" },
    // LEADERS (6)
    { id: "l1", name: "THUNDER", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l1" },
    { id: "l2", name: "VORTEX", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l2" },
    { id: "l3", name: "BLAZE", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l3" },
    { id: "l4", name: "NEXUS", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l4" },
    { id: "l5", name: "RONIN", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l5" },
    { id: "l6", name: "ECLIPSE", role: "LEADER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=l6" },
    // MEMBERS (12)
    { id: "m1", name: "SHADOW", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m1" },
    { id: "m2", name: "CIPHER", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m2" },
    { id: "m3", name: "NOVA", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m3" },
    { id: "m4", name: "HEALER", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m4" },
    { id: "m5", name: "STORM", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m5" },
    { id: "m6", name: "RAVEN", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m6" },
    { id: "m7", name: "FROST", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m7" },
    { id: "m8", name: "WOLF", role: "MEMBER", facebookUrl: "", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m8" },
    { id: "m9", name: "JINX", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m9" },
    { id: "m10", name: "SPECTRE", role: "MEMBER", facebookUrl: "", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m10" },
    { id: "m11", name: "KRONOS", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m11" },
    { id: "m12", name: "DRACO", role: "MEMBER", facebookUrl: "https://facebook.com", gangId: "mock", avatar: "https://i.pravatar.cc/150?u=m12" },
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
      <MembersTemplatePremium 
        initialMembers={mockMembers}
        pageTitle="MOCKUP GANG"
        pageSubtitle="Premium Template Preview"
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
