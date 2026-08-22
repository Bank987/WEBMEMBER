import { ArrowDownRight, Check, Globe2, ShieldCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import GangAuth from "@/components/GangAuth";
import { GangPreview, Reveal } from "@/components/LandingMotion";
import { LaunchSequence, MemberSignal } from "@/components/LaunchSequence";
import { DiscordSupportButton } from "@/components/DiscordSupportButton";
import { Snowfall } from "@/components/Snowfall";

export const metadata = {
  title: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1",
  description: "WEBSITE สร้างเว็บรายชื่อแก๊ง อันดับ 1 พร้อมระบบจัดการสมาชิกและหลังบ้านส่วนตัว",
};

const packages = [
  { name: "เริ่มต้น", price: "ฟรี", detail: "พื้นที่สำหรับแก๊งที่ต้องการเริ่มต้นให้เร็วที่สุด", features: ["ซับโดเมนเฉพาะแก๊ง", "จัดการสมาชิก 50 คน", "หลังบ้านส่วนตัว"] },
  { name: "เอมไพร์", price: "89฿", detail: "พื้นที่เต็มรูปแบบสำหรับแก๊งที่ต้องการขยายตัว", features: ["เชื่อมต่อโดเมนของคุณเอง", "สมาชิกไม่จำกัด", "เอฟเฟกต์และเสียงพิเศษ"], featured: true },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090a0c] text-[#f5f7fa]">
      <Snowfall />
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-7 md:px-10">
          <Link href="/" className="flex items-center gap-3 text-[17px] font-[900] tracking-[1px]"><span className="relative grid size-9 place-items-center rounded-full border border-[#b6dcff]/60 bg-[#dceeff] shadow-[0_0_32px_rgba(118,186,255,0.8)]"><span className="size-2 rounded-full bg-[#0b5eab]" /></span>GANGLIST</Link>
          <div className="flex items-center gap-2"><DiscordSupportButton compact /><a href="#auth" className="rounded-full border border-white/15 bg-white/[0.07] px-5 py-2.5 text-[11px] font-[900] tracking-[0.7px] text-white backdrop-blur-md transition hover:bg-white/15">เข้าสู่หลังบ้าน</a></div>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[820px] overflow-hidden px-6 pb-20 pt-36 md:px-10 md:pt-44">
          <div className="absolute inset-0 -z-20 bg-[#090a0c]" />
          <div className="absolute -right-[12%] top-[4%] -z-10 size-[680px] rounded-full bg-[#2387d5]/20 blur-[130px]" />
          <div className="absolute -left-[15%] bottom-[-35%] -z-10 size-[700px] rounded-full bg-[#a743cf]/10 blur-[160px]" />
          <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.5)_0.7px,transparent_0.7px)] [background-size:15px_15px]" />
          <div className="mx-auto grid max-w-[1380px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
            <Reveal>
              <p className="mb-7 flex items-center gap-2 text-[11px] font-[900] tracking-[1.6px] text-[#9fd3ff]"><span className="size-2 rounded-full bg-[#79c0ff] shadow-[0_0_14px_#79c0ff]" /> แพลตฟอร์มสำหรับแก๊งยุคใหม่</p>
              <h1 className="max-w-[720px] text-[52px] font-[900] leading-[1.08] tracking-[0] text-white sm:text-[68px] md:text-[88px]">มีที่ของคุณ<br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.62)]">ในโลกของแก๊ง</span></h1>
              <p className="mt-10 max-w-[530px] text-[16px] leading-[1.9] text-[#b8bec9] md:text-[18px]">สร้างหน้าเว็บไซต์ที่ดูมีตัวตน จัดระเบียบรายชื่อสมาชิก และดูแลทุกอย่างด้วยตัวเองจากหลังบ้านเดียว</p>
              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4"><a href="#auth" className="group flex items-center gap-3 rounded-full bg-[#ecf6ff] px-7 py-4 text-[12px] font-[900] text-[#07111c] transition hover:bg-white">สร้างพื้นที่ของคุณ <ArrowDownRight className="size-4 transition group-hover:translate-x-1 group-hover:translate-y-1" /></a><span className="flex items-center gap-2 text-[11px] text-[#aeb5c0]"><ShieldCheck className="size-4 text-[#72d89b]" /> เริ่มต้นได้ฟรี</span></div>
            </Reveal>
            <GangPreview />
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-12 max-w-[1380px] px-6 md:px-10">
          <div className="grid rounded-[30px] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-xl md:grid-cols-3">
            {[{ icon: Globe2, title: "ชื่อที่เป็นของคุณ", detail: "เลือก URL ของแก๊งและทำให้คนจำคุณได้" }, { icon: Users, title: "สมาชิกเป็นระเบียบ", detail: "สร้างไดเรกทอรีที่ค้นหาและดูแลง่าย" }, { icon: Sparkles, title: "สวยตั้งแต่วันแรก", detail: "ไม่ต้องออกแบบหรือเขียนโค้ดเอง" }].map(({ icon: Icon, title, detail }, index) => <div key={title} className={`flex gap-5 rounded-[23px] p-7 md:p-8 ${index > 0 ? "md:border-l md:border-white/10" : ""}`}><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10"><Icon className="size-5 text-[#9fd3ff]" /></span><div><h2 className="text-[15px] font-[900] text-white">{title}</h2><p className="mt-2.5 text-[12px] leading-[1.75] text-[#a4acb8]">{detail}</p></div></div>)}
          </div>
        </section>

        <section id="auth" className="scroll-mt-8 px-6 py-28 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1160px] rounded-[38px] border border-[#91cbff]/20 bg-[linear-gradient(130deg,rgba(19,71,119,0.65),rgba(14,18,25,0.96)_46%,rgba(63,22,93,0.32))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:p-12">
            <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <Reveal>
                <p className="text-[11px] font-[900] tracking-[1.5px] text-[#a5d8ff]">เริ่มใช้งานในไม่กี่นาที</p>
                <h2 className="mt-5 text-[38px] font-[900] leading-[1.18] text-white md:text-[54px]">เปิดเว็บไซต์<br />ในชื่อของคุณ</h2>
                <p className="mt-7 max-w-[350px] text-[13px] leading-[1.95] text-[#aeb9c8]">ระบบจะสร้างพื้นที่ส่วนตัวและรหัสลับสำหรับเข้าไปดูแลเว็บไซต์ของคุณทันที</p>
                <div className="mt-10 flex gap-3 text-[11px] text-[#d9e7f4]"><span className="grid size-8 place-items-center rounded-full bg-[#dff1ff] font-[900] text-[#095a98]">1</span><span className="grid size-8 place-items-center rounded-full bg-white/10 font-[900]">2</span><span className="grid size-8 place-items-center rounded-full bg-white/10 font-[900]">3</span></div>
              </Reveal>
              <Reveal delay={0.12}><div className="rounded-[28px] bg-[#0c0e12]/80 p-3 shadow-2xl sm:p-5"><GangAuth /></div></Reveal>
            </div>
          </div>
        </section>

        <section className="px-6 pb-28 md:px-10 md:pb-36">
          <div className="mx-auto grid max-w-[1120px] gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <Reveal><LaunchSequence /></Reveal>
            <Reveal delay={0.1}><MemberSignal /></Reveal>
          </div>
        </section>

        <section className="border-t border-white/[0.08] bg-[#07080a] px-6 py-28 md:px-10">
          <div className="mx-auto max-w-[1200px]">
            <Reveal className="max-w-[640px]"><p className="text-[11px] font-[900] tracking-[1.5px] text-[#93ceff]">แพ็กเกจบริการ</p><h2 className="mt-4 text-[42px] font-[900] leading-[1.1] text-white md:text-[60px]">เล็กพอที่จะเริ่ม<br />ใหญ่พอที่จะเติบโต</h2></Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2">{packages.map((item) => <Reveal key={item.name} delay={item.featured ? 0.1 : 0}><article className={`group relative flex min-h-[390px] flex-col rounded-[30px] p-7 transition duration-500 hover:-translate-y-1 md:p-9 ${item.featured ? "overflow-hidden bg-[#e9f5ff] text-[#0a1826]" : "border border-white/10 bg-[#101216]"}`}>
              {item.featured && <div className="absolute -right-20 -top-20 size-[260px] rounded-full bg-[#4baff4]/45 blur-[50px]" />}
              <div className="relative"><p className={`text-[12px] font-[900] tracking-[1.4px] ${item.featured ? "text-[#185d91]" : "text-[#93ceff]"}`}>{item.featured && <Sparkles className="mr-2 inline size-4" />}{item.name}</p><div className="mt-5 flex items-baseline gap-2"><span className="text-[52px] font-[900]">{item.price}</span>{item.featured && <span className="text-[13px] opacity-60">/ เดือน</span>}</div><p className="mt-3 max-w-[330px] text-[13px] leading-relaxed opacity-70">{item.detail}</p></div>
              <div className="relative mt-10 space-y-4 border-t border-current/10 pt-7">{item.features.map((feature) => <div key={feature} className="flex gap-3 text-[13px] leading-relaxed"><Check className={`mt-0.5 size-4 shrink-0 ${item.featured ? "text-[#17669e]" : "text-[#7bd6a0]"}`} />{feature}</div>)}</div>
              {item.featured ? <div className="relative mt-10 flex items-center justify-center gap-2 rounded-full bg-[#0c2335]/80 px-5 py-4 text-[11px] font-[900] text-[#b8cde0]"><span className="size-1.5 animate-pulse rounded-full bg-[#ffbd68]" /> กำลังปิดปรับปรุง</div> : <a href="#auth" className="relative mt-10 flex items-center justify-between rounded-full bg-white/10 px-5 py-4 text-[11px] font-[900] text-white">เลือกแพ็กเกจนี้ <ArrowDownRight className="size-4" /></a>}
            </article></Reveal>)}</div>
            <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.035] px-6 py-6 text-center sm:flex-row sm:text-left"><div><p className="text-[15px] font-[900] text-white">ต้องการความช่วยเหลือก่อนเริ่มต้น?</p><p className="mt-1 text-[12px] text-[#97a3af]">พูดคุยกับทีมดูแลและชุมชนผ่าน Discord</p></div><DiscordSupportButton /></div>
          </div>
        </section>
      </main>
    </div>
  );
}
