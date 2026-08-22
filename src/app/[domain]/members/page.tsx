import { getMembersByGang, getGangBySubdomain } from "@/lib/db";
import MembersClient from "./MembersClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGangTheme } from "@/lib/themes";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  if (!gang) return { title: "Not Found" };
  
  return {
    title: gang.pageTitle,
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

  return (
    <MembersClient 
      initialMembers={members}
      pageTitle={gang.pageTitle}
      pageSubtitle={gang.pageSubtitle}
      theme={getGangTheme(gang.theme).className}
    />
  );
}
