import { Globe2, ShieldCheck, Command, ArrowDownRight, Check, Users } from "lucide-react";
import Link from "next/link";
import GangAuth from "@/components/GangAuth";
import { Reveal, FloatingHero } from "@/components/LandingMotion";
import { DiscordSupportButton } from "@/components/DiscordSupportButton";

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
    <div className="min-h-screen overflow-x-hidden bg-black text-[#f5f7fa] selection:bg-[#0084ff] selection:text-white font-sans">
      
      {/* Background (Blue, Black, White tone) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#0084ff]/20 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#004b99]/15 blur-[160px] mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,0.5)_0.7px,transparent_0.7px)] [background-size:15px_15px]" />
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-7 md:px-10">
          <Link href="/" className="flex items-center gap-3 text-[17px] font-[900] tracking-[1px] text-white">
            <span className="relative grid size-9 place-items-center rounded-full border border-[#b6dcff]/60 bg-[#dceeff] shadow-[0_0_32px_rgba(118,186,255,0.8)]">
              <span className="size-2 rounded-full bg-[#0b5eab]" />
            </span>
            GANGLIST
          </Link>
          <div className="flex items-center gap-2">
            <DiscordSupportButton compact />
            <Link href="#auth" className="rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-[11px] font-[900] tracking-[0.7px] text-white backdrop-blur-md transition hover:bg-white/15">
              เข้าสู่ระบบหลังบ้าน
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-36 pb-20 md:pt-44">
        {/* Hero Section */}
        <section className="relative px-6 pb-20 md:px-10">
          <div className="mx-auto grid max-w-[1380px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <Reveal className="flex flex-col items-start text-left">
              <p className="mb-7 flex items-center gap-2 text-[11px] font-[900] tracking-[1.6px] text-[#9fd3ff]">
                <span className="size-2 rounded-full bg-[#79c0ff] shadow-[0_0_14px_#79c0ff]" /> แพลตฟอร์มสร้างหน้าเว็บ รายชื่อแก๊ง ที่ดีที่สุด
              </p>
              <h1 className="max-w-[720px] text-[52px] font-[900] leading-[1.08] tracking-[0] text-white sm:text-[68px] md:text-[88px]">
                WEBSITE<br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.62)]">สร้างเว็บรายชื่อแก๊ง อันดับ 1</span>
              </h1>
              <p className="mt-10 max-w-[530px] text-[16px] leading-[1.9] text-[#b8bec9] md:text-[18px]">
                จัดการสมาชิก ปรับแต่งสไตล์ตามใจชอบ เลือกระบบเสียง พื้นหลัง สีธีม หรือเอฟเฟกต์เฉพาะตัว ด้วยหลังบ้านที่ใช้งานง่าย และโดเมนเนมส่วนตัว
              </p>
              
              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4">
                <a href="#auth" className="group flex items-center gap-3 rounded-full bg-[#ecf6ff] px-7 py-4 text-[12px] font-[900] text-[#07111c] transition hover:bg-white">
                  สร้างเว็บไซต์ของคุณ <ArrowDownRight className="size-4 transition group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>
                <span className="flex items-center gap-2 text-[11px] text-[#aeb5c0]">
                  <ShieldCheck className="size-4 text-[#0084ff]" /> ปลอดภัย ไม่ต้องใช้บัตรเครดิต
                </span>
              </div>
            </Reveal>

            {/* Auth / Input component replacing the floating hero */}
            <Reveal delay={0.2} className="relative w-full max-w-[600px] mx-auto lg:mx-0">
              <div id="auth" className="scroll-mt-32">
                <GangAuth />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-[1200px]">
            <Reveal className="max-w-[640px]">
              <p className="text-[11px] font-[900] tracking-[1.5px] text-[#0084ff] uppercase">แพ็กเกจบริการ</p>
              <h2 className="mt-4 text-[42px] font-[900] leading-[1.1] text-white md:text-[60px]">เล็กพอที่จะเริ่ม<br />ใหญ่พอที่จะเติบโต</h2>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {packages.map((item, index) => (
                <Reveal key={item.name} delay={item.featured ? 0.1 : 0}>
                  <article className={`group relative flex min-h-[390px] flex-col rounded-[30px] p-7 transition duration-500 hover:-translate-y-1 md:p-9 overflow-hidden ${item.featured ? "border border-[#0084ff]/50 bg-[linear-gradient(145deg,rgba(0,132,255,0.13),#050505_45%)] shadow-[0_0_50px_rgba(0,132,255,0.12)]" : "border border-white/10 bg-[#0a0a0a]"}`}>
                    {item.featured && <div className="absolute -right-20 -top-20 size-[260px] rounded-full bg-[#0084ff]/20 blur-[50px] pointer-events-none" />}
                    <div className="relative">
                      <p className={`text-[12px] font-[900] tracking-[1.4px] ${item.featured ? "text-[#76baff]" : "text-[#93ceff]"}`}>
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
                          <Check className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-[#0084ff]" : "text-white/60"}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                    {item.featured ? (
                      <div className="relative mt-auto pt-10 flex items-center justify-center gap-2 rounded-full bg-[#0084ff]/10 border border-[#0084ff]/30 px-5 py-4 text-[11px] font-[900] text-[#76baff]">
                        <span className="size-1.5 animate-pulse rounded-full bg-[#0084ff]" /> กำลังปิดปรับปรุง
                      </div>
                    ) : (
                      <a href="#auth" className="relative mt-auto pt-10 flex items-center justify-between rounded-full bg-white/10 px-5 py-4 text-[11px] font-[900] text-white hover:bg-white/20 transition-colors">
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
      </main>

      <footer className="border-t border-white/5 bg-black py-12 text-center relative z-10 flex flex-col items-center gap-4">
        <p className="text-[11px] font-[900] tracking-[2px] text-slate-500 uppercase">
          © 2026 LASTNAME.SITE
        </p>
      </footer>
    </div>
  );
}
