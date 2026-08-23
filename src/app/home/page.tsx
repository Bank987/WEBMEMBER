import { Globe2, Users, Shield, Sparkles, Command, CheckCircle2, ArrowDownRight, Check, Zap, Lock, Layers } from "lucide-react";
import Link from "next/link";
import GangAuth from "@/components/GangAuth";
import { Reveal, FloatingHero, GlowingButton } from "@/components/LandingMotion";
import { DiscordSupportButton } from "@/components/DiscordSupportButton";
import { Marquee, SpotlightCard, StickyScroll } from "@/components/AdvancedUI";
import Image from "next/image";

export const metadata = {
  title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
  description: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1 พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
  openGraph: {
    title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
    description: "สร้างเว็บรายชื่อแก๊ง พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
    type: "website",
  },
};

const packages = [
  { name: "เริ่มต้น", price: "ฟรี", detail: "พื้นที่สำหรับแก๊งที่ต้องการเริ่มต้นให้เร็วที่สุด", features: ["ซับโดเมนเฉพาะแก๊ง", "จัดการสมาชิก 50 คน", "หลังบ้านส่วนตัว"] },
  { name: "เอมไพร์", price: "89฿", detail: "พื้นที่เต็มรูปแบบสำหรับแก๊งที่ต้องการขยายตัว", features: ["เชื่อมต่อโดเมนของคุณเอง", "สมาชิกไม่จำกัด", "เอฟเฟกต์และเสียงพิเศษ"], featured: true },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020202] text-slate-200 selection:bg-[#0084ff] selection:text-white font-sans">
      
      {/* Abstract Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#141e30,transparent_50%)] opacity-40" />
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#0084ff]/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#7a00ff]/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-white/5 bg-black/30">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0084ff] to-[#004b99] shadow-[0_0_30px_rgba(0,132,255,0.5)]">
              <Command className="size-5 text-white" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </div>
            <span className="text-lg font-[900] tracking-widest text-white uppercase">GANGLIST</span>
          </Link>
          <div className="flex items-center gap-4">
            <DiscordSupportButton compact />
            <Link href="#auth" className="relative group overflow-hidden rounded-full p-[1px] hidden sm:block">
              <span className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#7a00ff] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black px-6 py-2.5 rounded-full text-xs font-[800] tracking-wider text-white transition-all group-hover:bg-transparent">
                เข้าสู่หลังบ้าน
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 pt-10 md:pt-20 pb-20">
          <div className="mx-auto max-w-[1380px] grid lg:grid-cols-[1fr_1fr] gap-16 items-center md:px-4">
            <Reveal className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0084ff]/30 bg-[#0084ff]/10 px-4 py-1.5 mb-8">
                <span className="flex size-2 rounded-full bg-[#0084ff] shadow-[0_0_10px_#0084ff] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#0084ff] uppercase">แพลตฟอร์มสำหรับแก๊งยุคใหม่</span>
              </div>
              <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6.5rem] font-[900] leading-[0.9] tracking-tighter text-white mb-8">
                ยกระดับ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084ff] to-[#7a00ff]">แก๊งของคุณ</span>
              </h1>
              <p className="max-w-md text-lg text-slate-400 mb-10 leading-relaxed font-light">
                สร้างหน้าเว็บไซต์ที่ดูมีตัวตน จัดระเบียบรายชื่อสมาชิก และดูแลทุกอย่างด้วยตัวเองจากหลังบ้านเดียว
              </p>
              <GlowingButton href="#auth" text="เริ่มต้นสร้างพื้นที่" />
            </Reveal>

            <FloatingHero />
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-10 border-y border-white/5 bg-black">
          <Marquee text="THE ULTIMATE GANG HUB SYSTEM" />
        </section>

        {/* Spotlight Cards Layout */}
        <section className="px-6 py-32 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-[1380px] md:px-4">
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-[900] text-center mb-16 tracking-tight text-white uppercase">
                ฟีเจอร์ระดับ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084ff] to-[#00bfff]">มืออาชีพ</span>
              </h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard className="p-8 md:col-span-2 min-h-[300px] flex flex-col justify-end">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#0084ff]/20 blur-[80px]" />
                <Globe2 className="size-8 text-[#0084ff] mb-4 relative z-10" />
                <h3 className="text-2xl font-[900] text-white uppercase relative z-10 mb-2">เชื่อมต่อซับโดเมนส่วนตัว</h3>
                <p className="text-slate-400 font-light relative z-10 max-w-sm">
                  ประกาศอาณาเขตของคุณให้โลกจำ ใช้ชื่อแก๊งของคุณเป็นซับโดเมนได้ทันทีโดยไม่ต้องตั้งค่าให้ยุ่งยาก
                </p>
              </SpotlightCard>
              
              <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-end">
                <Users className="size-8 text-[#7a00ff] mb-4 relative z-10" />
                <h3 className="text-2xl font-[900] text-white uppercase relative z-10 mb-2">จัดการรายชื่อ</h3>
                <p className="text-slate-400 font-light relative z-10">
                  จัดเรียงรายชื่อสมาชิกตามตำแหน่ง จัดการบทบาทได้แบบ Real-time
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-end">
                <Sparkles className="size-8 text-[#00ffcc] mb-4 relative z-10" />
                <h3 className="text-2xl font-[900] text-white uppercase relative z-10 mb-2">เอฟเฟกต์สุดล้ำ</h3>
                <p className="text-slate-400 font-light relative z-10">
                  เอฟเฟกต์หิมะ, เส้นสแกน CRT และแสงเลเซอร์ สะกดทุกสายตาตั้งแต่แรกเห็น
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-8 md:col-span-2 min-h-[300px] flex flex-col justify-end">
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#7a00ff]/20 blur-[80px]" />
                <Layers className="size-8 text-white mb-4 relative z-10" />
                <h3 className="text-2xl font-[900] text-white uppercase relative z-10 mb-2">ระบบหลังบ้านสมบูรณ์แบบ</h3>
                <p className="text-slate-400 font-light relative z-10 max-w-sm">
                  ควบคุมและปรับแต่งทุกอย่างจากระบบหลังบ้านสไตล์ Dark Mode ใช้งานง่าย และรวดเร็ว
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Sticky Scroll Flow */}
        <section className="hidden md:block py-20">
          <StickyScroll content={[
            {
              title: "1. เข้าสู่ระบบแบบไร้รอยต่อ",
              description: "ไม่ต้องจำรหัสผ่านให้ยุ่งยาก ใช้แค่ Master Key ของคุณก็สามารถเข้าถึงศูนย์บัญชาการได้จากทุกที่ ทุกเวลา",
              content: <div className="size-full bg-gradient-to-br from-[#050505] to-[#111] flex items-center justify-center border border-white/5"><Lock className="size-20 text-[#0084ff]" /></div>
            },
            {
              title: "2. ปรับแต่งอย่างอิสระ",
              description: "เปลี่ยนสี รูปแบบฟอนต์ พื้นหลัง และเอฟเฟกต์ เพื่อสะท้อนความเป็นตัวตนของแก๊งคุณให้เด่นชัดที่สุดในเซิร์ฟเวอร์",
              content: <div className="size-full bg-gradient-to-bl from-[#050505] to-[#111] flex items-center justify-center border border-white/5"><Sparkles className="size-20 text-[#7a00ff]" /></div>
            },
            {
              title: "3. รวดเร็วดั่งสายฟ้า",
              description: "ระบบถูกออกแบบมาให้ตอบสนองทันที ทรงพลังด้วยสถาปัตยกรรมระดับโลก ไร้ซึ่งความหน่วง",
              content: <div className="size-full bg-gradient-to-t from-[#050505] to-[#111] flex items-center justify-center border border-white/5"><Zap className="size-20 text-[#00ffcc]" /></div>
            }
          ]} />
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-32 bg-black/60 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#141e30,transparent_50%)] opacity-30" />
          <div className="mx-auto max-w-[1200px] relative z-10">
            <Reveal className="max-w-[640px]">
              <p className="text-[11px] font-[900] tracking-[1.5px] text-[#0084ff] uppercase">บริการของเรา</p>
              <h2 className="mt-4 text-[42px] font-[900] leading-[1.1] text-white md:text-[60px] uppercase">แพ็กเกจระดับ<br />พรีเมียม</h2>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {packages.map((item, index) => (
                <Reveal key={item.name} delay={item.featured ? 0.1 : 0}>
                  <article className={`group relative flex min-h-[390px] flex-col rounded-[30px] p-7 transition duration-500 hover:-translate-y-1 md:p-9 overflow-hidden ${item.featured ? "border border-[#0084ff]/50 bg-[linear-gradient(145deg,rgba(0,132,255,0.13),#080808_45%)] shadow-[0_0_50px_rgba(0,132,255,0.12)]" : "border border-white/10 bg-[#0a0a0a]"}`}>
                    {item.featured && <div className="absolute -right-20 -top-20 size-[260px] rounded-full bg-[#0084ff]/30 blur-[60px] pointer-events-none" />}
                    <div className="relative">
                      <p className={`text-[12px] font-[900] tracking-[1.4px] ${item.featured ? "text-[#76baff]" : "text-[#93ceff]"}`}>
                        {item.featured && <Sparkles className="mr-2 inline size-4" />}
                        {item.name}
                      </p>
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-[52px] font-[900] text-white">{item.price}</span>
                        {item.featured && <span className="text-[13px] opacity-60 text-white">/ เดือน</span>}
                      </div>
                      <p className="mt-3 max-w-[330px] text-[13px] leading-relaxed opacity-70 text-slate-300">{item.detail}</p>
                    </div>
                    <div className="relative mt-10 space-y-4 border-t border-white/10 pt-7">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-[13px] leading-relaxed text-slate-300">
                          <Check className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-[#0084ff]" : "text-[#7bd6a0]"}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                    {item.featured ? (
                      <div className="relative mt-10 flex items-center justify-center gap-2 rounded-full bg-[#0084ff]/10 border border-[#0084ff]/30 px-5 py-4 text-[11px] font-[900] text-[#76baff]">
                        <span className="size-1.5 animate-pulse rounded-full bg-[#ffbd68]" /> กำลังปิดปรับปรุง
                      </div>
                    ) : (
                      <a href="#auth" className="relative mt-10 flex items-center justify-between rounded-full bg-white/10 px-5 py-4 text-[11px] font-[900] text-white hover:bg-white/20 transition-colors">
                        เลือกแพ็กเกจนี้ <ArrowDownRight className="size-4" />
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={0.2} className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.035] px-6 py-6 text-center sm:flex-row sm:text-left backdrop-blur-md">
              <div>
                <p className="text-[15px] font-[900] text-white">ต้องการความช่วยเหลือก่อนเริ่มต้น?</p>
                <p className="mt-1 text-[12px] text-[#97a3af]">พูดคุยกับทีมดูแลและชุมชนผ่าน Discord</p>
              </div>
              <DiscordSupportButton />
            </Reveal>
          </div>
        </section>

        {/* Auth / Terminal Section */}
        <section id="auth" className="px-6 py-20 scroll-mt-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative rounded-[38px] overflow-hidden border border-[#0084ff]/20 bg-[linear-gradient(130deg,rgba(0,132,255,0.2),rgba(10,10,10,0.96)_46%,rgba(122,0,255,0.1))] p-1 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
              
              <div className="relative rounded-[34px] bg-[#050505]/90 border border-white/5 p-8 md:p-16 grid lg:grid-cols-[0.78fr_1.22fr] gap-14 items-center backdrop-blur-xl">
                <Reveal delay={0.2} className="space-y-8">
                  <div className="space-y-4">
                    <Shield className="size-12 text-[#0084ff] drop-shadow-[0_0_15px_rgba(0,132,255,0.5)]" />
                    <h2 className="text-4xl md:text-5xl font-[900] text-white tracking-tight uppercase leading-none">
                      เปิดเว็บไซต์<br />ในชื่อของคุณ
                    </h2>
                    <p className="text-sm text-[#aeb9c8] leading-relaxed max-w-sm">
                      ระบบจะสร้างพื้นที่ส่วนตัวและรหัสลับสำหรับเข้าไปดูแลเว็บไซต์ของคุณทันที
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {["รวดเร็วทันใจใน 1 นาที", "ข้อมูลเข้ารหัสปลอดภัย", "ไม่ต้องใช้บัตรเครดิต"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#d9e7f4] font-medium">
                        <CheckCircle2 className="size-4 text-[#0084ff]" /> {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                
                <Reveal delay={0.4} className="relative z-10">
                  <div className="rounded-[28px] bg-black border border-white/10 p-3 shadow-2xl relative sm:p-5">
                    <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <GangAuth />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black backdrop-blur-lg py-12 text-center relative z-10 flex flex-col items-center gap-4">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
          © 2026 GANGLIST. Neural Network Secured.
        </p>
        <DiscordSupportButton compact />
      </footer>
    </div>
  );
}
