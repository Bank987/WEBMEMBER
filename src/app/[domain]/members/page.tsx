import { getMembersByGang, getGangBySubdomain } from "@/lib/db";
import MembersClient from "./MembersClient";
import MembersTemplateCards from "./MembersTemplateCards";
// Removed GangAnnouncementModal
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGangTheme } from "@/lib/themes";

// Removed force-dynamic to leverage Next.js ISR
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  if (!gang) return { title: "Not Found" };
  
  return {
    title: gang.pageTitle,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    icons: gang.faviconUrl ? { icon: gang.faviconUrl } : undefined,
  };
}

export default async function MembersPage({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  
  if (!gang) {
    notFound();
  }

  const members = await getMembersByGang(gang.id);
  const themeClass = getGangTheme(gang.theme).className;
  
  const commonProps = {
    initialMembers: members,
    pageTitle: gang.pageTitle,
    pageSubtitle: gang.pageSubtitle,
    theme: themeClass,
    backgroundImageUrl: gang.membersBackgroundImageUrl,
  };

  let TemplateComponent = MembersClient;
  
  switch (gang.membersTemplate) {
    case "glass_profile": TemplateComponent = MembersTemplateCards; break;
    default: TemplateComponent = MembersClient; break;
  }

  return (
    <>
      <TemplateComponent {...commonProps} />
    </>
  );
}


