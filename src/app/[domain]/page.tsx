import { getGangBySubdomain } from "@/lib/db";
import { getRentalStatus } from "@/lib/rental";
import GateClient from "./GateClient";
import { GangAnnouncement } from "@/components/GangAnnouncement";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

// ลบ force-dynamic ออก และใช้การ Cache แทน
// ตั้งค่าให้จำหน้าเว็บไว้ 1 ชั่วโมง (3600 วินาที)
// แต่เมื่อมีการกดเซฟตั้งค่า โค้ด revalidatePath ใน action จะล้าง cache ให้ทันที
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  if (!gang) return { title: "ไม่พบเว็บไซต์" };
  
  // Determine the best image for SEO (prioritize seoImageUrl, then logoUrl, then backgroundImageUrl)
  const ogImage = gang.seoImageUrl || gang.logoUrl || gang.backgroundImageUrl || undefined;

  return {
    title: gang.pageTitle,
    description: gang.pageSubtitle,
    openGraph: {
      title: gang.pageTitle,
      description: gang.pageSubtitle,
      type: "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: gang.pageTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: gang.pageTitle,
      description: gang.pageSubtitle,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
    icons: gang.faviconUrl ? {
      icon: [{ url: `/favicon.ico?v=${encodeURIComponent(gang.faviconUrl)}` }],
      shortcut: [`/favicon.ico?v=${encodeURIComponent(gang.faviconUrl)}`],
    } : undefined,
  };
}

// Expired Lock Screen Component
function ExpiredScreen({ gangName }: { gangName: string }) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans selection:bg-[#ef4444] selection:text-white relative overflow-hidden">
      {/* Visual Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-2xl flex items-center justify-center text-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-8">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <div>
          <h1 className="text-3xl sm:text-4xl font-[900] text-white tracking-wide mb-2 uppercase">
            Website Suspended
          </h1>
          <p className="text-[#888] text-sm sm:text-base font-light tracking-wide uppercase">
            ระบบระงับการใช้งานชั่วคราว
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-white/80 leading-relaxed text-sm">
            เว็บไซต์ <strong className="text-white font-bold">{gangName}</strong> หมดอายุสัญญาเช่าและถูกระงับการเข้าถึงชั่วคราว
          </p>
          <p className="text-white/50 text-xs mt-3 leading-relaxed">
            หากคุณเป็นเจ้าของเว็บไซต์ สามารถเข้าสู่ระบบหลังบ้าน (Admin Panel) เพื่อกดปุ่มต่อสัญญาใช้งานได้ทันทีโดยไม่มีค่าใช้จ่ายสำหรับแพ็คเกจเริ่มต้น ข้อมูลทั้งหมดจะยังคงอยู่
          </p>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mt-8">
          <Home className="w-4 h-4" />
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const resolvedParams = await params;
  const gang = await getGangBySubdomain(resolvedParams.domain);
  
  if (!gang) {
    notFound();
  }

  const rental = getRentalStatus(gang);
  
  if (rental.status === "expired") {
    return <ExpiredScreen gangName={gang.pageTitle} />;
  }
  
  return (
    <>
      <GateClient settings={gang} />
      {gang.announcementEnabled && (gang.announcementMessage || (gang.announcementImages && gang.announcementImages.length > 0)) && (
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
