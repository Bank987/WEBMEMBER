import { getGangBySubdomain } from "@/lib/db";
import GateClient from "./GateClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  if (!gang) return { title: "ไม่พบเว็บไซต์" };
  
  return {
    title: gang.pageTitle,
    icons: gang.faviconUrl ? {
      icon: [{ url: `/favicon.ico?v=${encodeURIComponent(gang.faviconUrl)}` }],
      shortcut: [`/favicon.ico?v=${encodeURIComponent(gang.faviconUrl)}`],
    } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  
  if (!gang) {
    notFound();
  }
  
  return (
    <GateClient settings={gang} />
  );
}
