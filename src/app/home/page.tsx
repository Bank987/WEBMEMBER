import { ShieldCheck, Command, ArrowRight, Check, Target, Crosshair, Sparkles, Zap, Globe, Lock } from "lucide-react";
import Link from "next/link";
import GangAuth from "@/components/GangAuth";
import { Reveal } from "@/components/LandingMotion";
import { DiscordSupportButton } from "@/components/DiscordSupportButton";
import { BuyVipButton } from "@/components/BuyVipButton";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { GuideButton } from "@/components/GuideButton";

export const metadata = {
  title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
  description: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1 พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
  openGraph: {
    title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
    description: "สร้างเว็บรายชื่อแก๊ง พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
    type: "website",
  },
};

import { getAnnouncement } from "@/actions/announcement";
import { AnnouncementModal } from "@/components/AnnouncementModal";

const packages = [
  { name: "เริ่มต้น (FREE)", price: "฿0", detail: "พื้นที่สำหรับแก๊งที่ต้องการเริ่มต้นแบบรวดเร็ว พร้อมระบบพื้นฐานครบจบ", features: ["ซับโดเมนเฉพาะแก๊ง", "จัดการสมาชิกสูงสุด 50 คน", "แผงควบคุมส่วนตัว (Admin Panel)"] },
  { name: "VIP (EMPIRE)", price: "฿89", detail: "พื้นที่เต็มรูปแบบ ไร้ขีดจำกัด พร้อมเปิดโลกการปรับแต่งแบบ Exclusive", features: ["จัดการสมาชิกแบบไม่จำกัด", "ปลดล็อค Theme ระดับ Premium", "ลูกเล่นเอฟเฟกต์หน้าเว็บแบบจัดเต็ม", "ระบบประกาศข่าวสารสุดล้ำ"], featured: true },
];

export default async function LandingPage() {
  const announcement = await getAnnouncement();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#000000] text-white selection:bg-white selection:text-black font-sans relative">
      <AnnouncementModal data={announcement} />
      
      {/* Premium Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Abstract Mesh Gradients */}
        <div className="absolute top-[-30%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#112a52]/30 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-[#3d1c52]/20 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#143d42]/20 blur-[120px] mix-blend-screen" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <BackgroundEffects type="snow" />
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-12 border-b border-white/[0.05] bg-black/10 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-3 text-[18px] font-black tracking-[3px] text-white uppercase group">
            <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:border-white/30 transition-colors">
              <Command className="size-4 text-white" />
            </span>
            LASTNAME.SITE
          </Link>
          <div className="flex items-center gap-4">
            <GuideButton />
            <DiscordSupportButton compact />
            <Link href="#auth" className="hidden sm:block relative overflow-hidden rounded-full p-[1px] group transition-transform hover:scale-105">
              <span className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-white/40 rounded-full group-hover:rotate-180 transition-transform duration-1000" />
              <div className="relative bg-[#050505] px-6 py-2.5 rounded-full text-[11px] font-[900] tracking-[1px] text-white group-hover:bg-black transition-colors flex items-center gap-2">
                <Lock className="size-3" />
                เข้าสู่ระบบ
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-40 pb-20 md:pt-48">
        {/* Hero Section */}
        <section className="relative px-6 pb-24 md:px-12">
          <div className="mx-auto grid max-w-[1440px] gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            <Reveal className="flex flex-col items-start text-left relative z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Sparkles className="size-3 text-[#79c0ff]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#79c0ff] uppercase">แพลตฟอร์มรายชื่อแก๊ง ที่สมบูรณ์แบบที่สุด</span>
              </div>
              
              <h1 className="text-[52px] font-black leading-[1.05] tracking-tighter text-white sm:text-[72px] lg:text-[88px] mb-8 relative">
                ELEVATE<br />
                YOUR GANG<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6f0fa] via-[#79c0ff] to-[#3a8ceb]">
                  IDENTITY.
                </span>
              </h1>
              
              <p className="max-w-[540px] text-[16px] leading-[1.9] text-[#a1aab5] md:text-[18px] font-light">
                หมดยุคของการใช้เว็บรูปแบบเดิมๆ สร้างสรรค์ตัวตนของแก๊งคุณให้โดดเด่นด้วยดีไซน์ระดับพรีเมียม เอฟเฟกต์สุดล้ำ และระบบจัดการสมาชิกที่ง่ายกว่าที่เคย
              </p>
              
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <a href="#auth" className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4.5 text-[12px] font-black tracking-[1px] text-black transition-all hover:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  เริ่มต้นสร้างหน้าเว็บ <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <span className="flex items-center gap-2 text-[12px] text-[#a1aab5] font-medium tracking-[0.5px]">
                  <ShieldCheck className="size-4 text-[#79c0ff]" /> ปลอดภัย ไม่ต้องใช้บัตรเครดิต
                </span>
              </div>

              {/* Stats/Features row */}
              <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-white/10 w-full max-w-[540px]">
                <div>
                  <h4 className="text-white font-black text-2xl">99%</h4>
                  <p className="text-[#a1aab5] text-[11px] font-bold tracking-wider uppercase mt-1">Uptime</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl flex items-center gap-2"><Zap className="size-5 text-[#79c0ff]" /> FAST</h4>
                  <p className="text-[#a1aab5] text-[11px] font-bold tracking-wider uppercase mt-1">Performance</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl flex items-center gap-2"><Globe className="size-5 text-[#79c0ff]" /> VIP</h4>
                  <p className="text-[#a1aab5] text-[11px] font-bold tracking-wider uppercase mt-1">Subdomain</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto z-10">
              <div className="absolute -top-20 -right-20 size-[300px] bg-[#3a8ceb]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 size-[300px] bg-[#8944b5]/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
              
              {/* Glassmorphism Frame around Auth */}
              <div className="relative rounded-[32px] p-2 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
                <div className="absolute top-6 -left-3 px-3 py-1 bg-black border border-white/10 text-[9px] text-white/50 font-mono tracking-[2px] rounded shadow-lg transform -rotate-90 origin-left">
                  SYSTEM.AUTH
                </div>
                <div id="auth" className="scroll-mt-32 relative bg-[#050505] rounded-[24px] overflow-hidden border border-white/5">
                  <GangAuth />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-32 border-t border-white/[0.05] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(58,140,235,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="mx-auto max-w-[1440px] relative z-10 md:px-12">
            <Reveal className="max-w-[700px] text-center mx-auto mb-24">
              <h2 className="text-[48px] font-black leading-[1.1] text-white md:text-[64px] tracking-tighter">
                CHOOSE YOUR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#79c0ff] to-[#b183f0]">TIER</span>
              </h2>
              <p className="mt-6 text-[16px] text-[#a1aab5] leading-relaxed font-light">
                เลือกแพ็กเกจที่เหมาะสมกับสเกลแก๊งของคุณ เริ่มต้นฟรีและอัปเกรดเมื่อคุณพร้อมที่จะก้าวไปสู่ระดับที่เหนือกว่า
              </p>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2 max-w-[1040px] mx-auto">
              {packages.map((item, index) => (
                <Reveal key={item.name} delay={item.featured ? 0.1 : 0}>
                  <article className={'group relative flex min-h-[460px] flex-col rounded-[40px] p-10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ' + (item.featured ? 'bg-[#050914] border border-[#3a8ceb]/30 shadow-[0_40px_80px_rgba(58,140,235,0.15)]' : 'bg-[#080808] border border-white/10')}>
                    
                    {item.featured && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3a8ceb]/10 to-transparent opacity-50" />
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3a8ceb]/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        
                        {/* Premium Tag */}
                        <div className="absolute top-0 right-10 bg-gradient-to-b from-[#3a8ceb] to-[#1d599f] px-4 py-2 rounded-b-xl shadow-lg">
                          <span className="text-[10px] font-black text-white tracking-[2px]">RECOMMENDED</span>
                        </div>
                      </>
                    )}
                    
                    <div className="relative z-10">
                      <p className={'text-[13px] font-black tracking-[3px] uppercase ' + (item.featured ? 'text-[#79c0ff]' : 'text-white/40')}>
                        {item.name}
                      </p>
                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-[64px] font-black text-white tracking-tighter leading-none">{item.price}</span>
                        {item.featured && <span className="text-[14px] font-bold tracking-[1px] text-white/40 uppercase">/ ถาวร</span>}
                      </div>
                      <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-[#a1aab5] font-light">{item.detail}</p>
                    </div>

                    <div className="relative z-10 mt-12 space-y-6 border-t border-white/10 pt-10">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex gap-4 text-[15px] text-white/90 font-light">
                          <div className={'mt-1 size-5 shrink-0 rounded-full flex items-center justify-center ' + (item.featured ? 'bg-[#3a8ceb]/20 text-[#79c0ff]' : 'bg-white/10 text-white/50')}>
                            <Check className="size-3" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="relative z-10 mt-auto pt-12">
                      {item.featured ? (
                        <div className="shadow-[0_0_40px_rgba(58,140,235,0.3)] rounded-2xl">
                          <BuyVipButton />
                        </div>
                      ) : (
                        <a href="#auth" className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-8 py-5 text-[12px] font-black tracking-[1px] text-white hover:bg-white/10 hover:border-white/30 transition-all">
                          ใช้งานฟรี <ArrowRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={0.2} className="mt-24 mx-auto max-w-[1040px] flex flex-col items-center justify-between gap-6 rounded-[32px] border border-white/10 bg-black/40 p-10 text-center sm:flex-row sm:text-left backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              <div>
                <p className="text-[18px] font-black text-white">ต้องการความช่วยเหลือก่อนเริ่มต้น?</p>
                <p className="mt-2 text-[14px] text-[#a1aab5] font-light">พูดคุยกับทีมดูแลและชุมชนผ่านระบบ Discord ของเรา</p>
              </div>
              <DiscordSupportButton />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#000000] py-20 text-center relative z-10 flex flex-col items-center gap-8">
        <Link href="/" className="flex items-center gap-3 text-[16px] font-black tracking-[3px] text-white/40 uppercase hover:text-white/80 transition-colors">
          <Command className="size-5" /> LASTNAME.SITE
        </Link>
        <p className="text-[11px] font-bold tracking-[2px] text-[#444] uppercase">
          © 2026 LASTNAME.SITE. All rights reserved.
        </p>
      </footer>
    </div>
  );
}