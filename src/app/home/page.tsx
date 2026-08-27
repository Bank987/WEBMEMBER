import { ShieldCheck, Command, ArrowDownRight, Check, Target, Crosshair } from "lucide-react";
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
  { name: "เริ่มต้น", price: "ฟรี", detail: "พื้นที่สำหรับแก๊งที่ต้องการเริ่มต้นให้เร็วที่สุด", features: ["ซับโดเมนเฉพาะแก๊ง", "จัดการสมาชิก 50 คน", "หลังบ้านส่วนตัว"] },
  { name: "เอมไพร์", price: "89฿", detail: "พื้นที่เต็มรูปแบบสำหรับแก๊งที่ต้องการขยายตัว", features: ["สมาชิกไม่จำกัด", "ลูกเล่นบนเว็บ และ Theme Premium มากมาย ที่ไม่เหมือนใคร"], featured: true },
];

export default async function LandingPage() {
  const announcement = await getAnnouncement();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030303] text-[#f5f7fa] selection:bg-[#0084ff] selection:text-white font-sans">
      <AnnouncementModal data={announcement} />
      
      {/* Background (Blue, Black, White tone) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Snow Effect */}
        <BackgroundEffects type="snow" />
        
        {/* Deep Glows */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-[100%] bg-[#0084ff]/15 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[60vw] rounded-full bg-[#004b99]/10 blur-[150px] mix-blend-screen" />
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-8 md:px-10 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 text-[17px] font-[900] tracking-[2px] text-white uppercase group">
            <span className="relative grid size-10 place-items-center rounded-lg border border-[#0084ff]/50 bg-black shadow-[0_0_20px_rgba(0,132,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,132,255,0.6)] transition-shadow">
              <Command className="size-4 text-[#0084ff]" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#0084ff] rounded-bl-sm" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#0084ff] rounded-tr-sm" />
            </span>
            GANGLIST
          </Link>
          <div className="flex items-center gap-4">
            <GuideButton />
            <DiscordSupportButton compact />
            <Link href="#auth" className="hidden sm:block relative overflow-hidden rounded-full p-[1px] group">
              <span className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#00bfff] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#050505] px-6 py-2.5 rounded-full text-[11px] font-[900] tracking-[1px] text-white transition-all group-hover:bg-transparent">
                เข้าสู่ระบบหลังบ้าน
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-40 pb-20 md:pt-52">
        {/* Hero Section */}
        <section className="relative px-6 pb-20 md:px-10">
          <div className="mx-auto grid max-w-[1380px] gap-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            
            <Reveal className="flex flex-col items-start text-left relative z-20">
              {/* HUD Elements */}
              <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0084ff]/30 to-transparent hidden xl:block" />
              <Crosshair className="absolute -left-12 top-0 size-4 text-[#0084ff]/50 hidden xl:block" />
              
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0084ff]/30 bg-black/50 px-4 py-1.5 mb-8 backdrop-blur-sm">
                <span className="flex size-2 rounded-full bg-[#0084ff] shadow-[0_0_10px_#0084ff] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#0084ff] uppercase">แพลตฟอร์มสร้างหน้าเว็บ รายชื่อแก๊ง ที่ดีที่สุด</span>
              </div>
              
              <h1 className="text-[46px] font-[900] leading-[1.05] tracking-tight text-white sm:text-[64px] lg:text-[84px] mb-8 relative">
                WEBSITE<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#0084ff]/50">
                  สร้างเว็บรายชื่อแก๊ง อันดับ 1
                </span>
              </h1>
              
              <p className="max-w-[500px] text-[16px] leading-[1.9] text-[#89909b] md:text-[18px] font-light">
                จัดการสมาชิก ปรับแต่งสไตล์ตามใจชอบ เลือกระบบเสียง พื้นหลัง สีธีม หรือเอฟเฟกต์เฉพาะตัว ด้วยหลังบ้านที่ใช้งานง่าย และโดเมนเนมส่วนตัว
              </p>
              
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <a href="#auth" className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[12px] font-[900] tracking-[1px] text-black transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    สร้างเว็บไซต์ของคุณ <ArrowDownRight className="size-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#004b99] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute z-10 inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    สร้างเว็บไซต์ของคุณ <ArrowDownRight className="size-4" />
                  </span>
                </a>
                
                <span className="flex items-center gap-2 text-[11px] text-[#89909b] font-medium tracking-[0.5px]">
                  <ShieldCheck className="size-4 text-[#0084ff]" /> ปลอดภัย ไม่ต้องใช้บัตรเครดิต
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto z-10">
              <div className="absolute -top-10 -right-10 size-40 bg-[#0084ff]/20 blur-[60px] rounded-full mix-blend-screen" />
              <div className="absolute -bottom-10 -left-10 size-40 bg-white/5 blur-[60px] rounded-full mix-blend-screen" />
              
              {/* HUD Frame around Auth */}
              <div className="absolute -inset-4 border border-[#0084ff]/20 rounded-[40px] pointer-events-none hidden sm:block">
                <div className="absolute top-1/2 -left-1 w-2 h-8 bg-[#0084ff] -translate-y-1/2" />
                <div className="absolute top-1/2 -right-1 w-2 h-8 bg-[#0084ff] -translate-y-1/2" />
                <div className="absolute -top-3 left-10 px-2 bg-[#030303] text-[9px] text-[#0084ff] font-mono tracking-[2px]">SYS.AUTH</div>
              </div>

              <div id="auth" className="scroll-mt-32 relative">
                <GangAuth />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-24 border-t border-white/5 bg-black/40 relative overflow-hidden">
          
          <div className="mx-auto max-w-[1380px] relative z-10 md:px-4">
            <Reveal className="max-w-[640px] text-center mx-auto mb-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
                <Target className="size-3 text-[#0084ff]" />
                <span className="text-[10px] font-[900] tracking-[2px] text-white uppercase">แพ็กเกจบริการ</span>
              </div>
              <h2 className="text-[42px] font-[900] leading-[1.1] text-white md:text-[56px] tracking-tight">
                เล็กพอที่จะเริ่ม<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084ff] to-[#80c0ff]">ใหญ่พอที่จะเติบโต</span>
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 max-w-[1000px] mx-auto">
              {packages.map((item, index) => (
                <Reveal key={item.name} delay={item.featured ? 0.1 : 0}>
                  <article className={`group relative flex min-h-[420px] flex-col rounded-[32px] p-8 transition duration-500 hover:-translate-y-2 md:p-10 overflow-hidden backdrop-blur-xl ${item.featured ? "border border-[#0084ff]/40 bg-[linear-gradient(145deg,rgba(0,132,255,0.1),rgba(0,0,0,0.8)_60%)] shadow-[0_30px_60px_rgba(0,132,255,0.15)]" : "border border-white/10 bg-[#0a0a0a]"}`}>
                    
                    {item.featured && <div className="absolute -right-20 -top-20 size-[300px] rounded-full bg-[#0084ff]/20 blur-[70px] pointer-events-none" />}
                    
                    <div className="relative z-10">
                      <p className={`text-[11px] font-[900] tracking-[2px] uppercase ${item.featured ? "text-[#0084ff]" : "text-white/50"}`}>
                        {item.name}
                      </p>
                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-[56px] font-[900] text-white tracking-tighter">{item.price}</span>
                        {item.featured && <span className="text-[13px] font-[900] tracking-[1px] text-white/40 uppercase">/ เดือน</span>}
                      </div>
                      <p className="mt-4 max-w-[330px] text-[14px] leading-relaxed text-[#89909b]">{item.detail}</p>
                    </div>

                    <div className="relative z-10 mt-10 space-y-5 border-t border-white/10 pt-8">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex gap-4 text-[14px] font-medium text-white/80">
                          <div className={`mt-0.5 size-5 shrink-0 rounded-full flex items-center justify-center ${item.featured ? "bg-[#0084ff]/20 text-[#0084ff]" : "bg-white/10 text-white/60"}`}>
                            <Check className="size-3" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="relative z-10 mt-auto pt-10">
                      {item.featured ? (
                        <BuyVipButton />
                      ) : (
                        <a href="#auth" className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-[11px] font-[900] tracking-[1px] text-white hover:bg-white/10 hover:border-white/20 transition-all">
                          เลือกแพ็กเกจนี้ <ArrowDownRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={0.2} className="mt-16 mx-auto max-w-[1000px] flex flex-col items-center justify-between gap-6 rounded-[32px] border border-white/10 bg-white/[0.02] p-8 text-center sm:flex-row sm:text-left backdrop-blur-2xl">
              <div>
                <p className="text-[16px] font-[900] text-white">ต้องการความช่วยเหลือก่อนเริ่มต้น?</p>
                <p className="mt-2 text-[13px] text-[#89909b]">พูดคุยกับทีมดูแลและชุมชนผ่าน Discord</p>
              </div>
              <DiscordSupportButton />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020202] py-16 text-center relative z-10 flex flex-col items-center gap-6">
        <Link href="/" className="flex items-center gap-2 text-[14px] font-[900] tracking-[2px] text-white/30 uppercase">
          <Command className="size-4" /> GANGLIST
        </Link>
        <p className="text-[10px] font-[900] tracking-[2px] text-[#555] uppercase">
          © 2026 LASTNAME.SITE
        </p>
      </footer>
    </div>
  );
}

