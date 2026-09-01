import { Activity, ArrowUpRight, Crown, ExternalLink, HardDrive, Shield, Sparkles, Users, Zap, AlertTriangle, Clock } from "lucide-react";
import Link from "next/link";
import { getMembersByGang, getActivityLogs } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getGangUrl } from "@/lib/site-url";
import { ActivityFeed } from "@/components/ActivityFeed";
import { getRentalStatus } from "@/lib/rental";
import { RenewalModal } from "@/components/RenewalModal";

// Since RenewalModal requires useState and context, we'll extract the client part
import { RenewalDashboardCard } from "./_components/RenewalDashboardCard";
import { RentalCountdown } from "./_components/RentalCountdown";

export default async function AdminDashboard() {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");
  
  const members = await getMembersByGang(gang.id);
  const logs = await getActivityLogs(gang.id, 15);
  const foundersCount = members.filter((member) => member.role === "FOUNDER").length;
  const leadersCount = members.filter((member) => member.role === "LEADER").length;
  
  const rental = getRentalStatus(gang);
  const isSiteActive = rental.status !== "expired";

  return <div className="space-y-7">
    {/* Rental Warning Card */}
    {(rental.status === "grace" || rental.status === "expired") && (
       <RenewalDashboardCard status={rental.status} daysRemaining={rental.daysRemaining} />
    )}

    <section className="relative overflow-hidden rounded-[30px] border border-[#65b8f0]/25 bg-[linear-gradient(135deg,#101e2b,#0c1118_58%,#1a1425)] p-6 sm:p-8">
      <div className="absolute -right-20 -top-24 size-[300px] rounded-full bg-[#1689df]/15 blur-[75px]" />
      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-[900] tracking-[1.5px] text-[#91ceff]">
            <span className={`size-2 rounded-full shadow-[0_0_10px_currentColor] ${isSiteActive ? 'bg-[#66dfa0] text-[#66dfa0]' : 'bg-[#ef7777] text-[#ef7777]'}`} /> 
            {isSiteActive ? "เว็บไซต์ออนไลน์" : "เว็บไซต์ถูกระงับ"}
          </p>
          <h2 className="mt-5 max-w-[650px] text-[32px] font-[900] leading-[1.12] text-white sm:text-[46px]">สวัสดี, {gang.pageTitle}</h2>
          <p className="mt-4 max-w-[520px] text-[12px] leading-[1.8] text-[#9eafbf]">ศูนย์จัดการเว็บไซต์และรายชื่อสมาชิกของคุณ พร้อมให้ปรับแต่งได้ทุกเวลา</p>
        </div>
        <a href={getGangUrl(gang.subdomain)} target="_blank" rel="noreferrer" className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#dceeff] px-5 py-3.5 text-[11px] font-[900] text-[#0b3150] transition hover:bg-white">
          เปิดเว็บไซต์ <ExternalLink className="size-4" />
        </a>
      </div>
      <div className="relative mt-8 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-black/15 px-3 py-2 text-[10px] text-[#b8c8d6]">{gang.subdomain}.lastname.site</span>
        <span className={`rounded-full border px-3 py-2 text-[10px] ${isSiteActive ? 'border-[#65dfa0]/20 bg-[#65dfa0]/10 text-[#8debb2]' : 'border-[#ef7777]/20 bg-[#ef7777]/10 text-[#ff9c9c]'}`}>
          {isSiteActive ? "พร้อมเผยแพร่" : "หมดอายุการใช้งาน"}
        </span>
      </div>

      <RentalCountdown expiresAt={rental.expiresAt.toISOString()} isVip={!!gang.isVip} />
    </section>

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Stat title="สมาชิกทั้งหมด" value={members.length} icon={<Users />} tone="blue" />
      <Stat title="ผู้ก่อตั้ง" value={foundersCount} icon={<Crown />} tone="yellow" />
      <Stat title="หัวหน้า" value={leadersCount} icon={<Shield />} tone="red" />
      <Stat title="เว็บไซต์ออนไลน์" value={isSiteActive ? "พร้อม" : "ระงับ"} icon={<Activity />} tone={isSiteActive ? "green" : "red"} />
    </section>

    <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[28px] border border-white/10 bg-[#0c1016] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-[900] tracking-[1.5px] text-[#82c8ff]">QUICK ACTIONS</p>
            <h3 className="mt-2 text-[21px] font-[900] text-white">จัดการเว็บไซต์ของคุณ</h3>
          </div>
          <Sparkles className="size-5 text-[#82c8ff]" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <QuickAction href="/admin/members/new" icon={<Users />} title="เพิ่มสมาชิก" detail="เพิ่มโปรไฟล์เข้าสู่ไดเรกทอรี" />
          <QuickAction href="/admin/members" icon={<ArrowUpRight />} title="ดูรายชื่อสมาชิก" detail="ตรวจสอบและจัดการข้อมูล" />
          <QuickAction href="/admin/settings" icon={<Zap />} title="ปรับแต่งเว็บไซต์" detail="เพลง รูปแบบ และ favicon" />
          <QuickAction href={getGangUrl(gang.subdomain)} external icon={<ExternalLink />} title="เปิดหน้าเว็บไซต์" detail="ดูผลลัพธ์แบบสาธารณะ" />
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#0c1016] p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-[900] tracking-[1.5px] text-[#82c8ff]">ACTIVITY LOG</p>
            <h3 className="mt-2 text-[18px] font-[900] text-white">กิจกรรมล่าสุด</h3>
          </div>
          <Activity className="size-5 text-[#82c8ff]" />
        </div>
        <ActivityFeed logs={logs} />
      </div>
    </section>
  </div>;
}

function Stat({ title, value, icon, tone }: { title: string; value: number | string; icon: React.ReactNode; tone: "blue" | "yellow" | "red" | "green" }) { 
  const styles = { 
    blue: "border-[#65b8f0]/20 bg-[#0e1a25] text-[#83ceff]", 
    yellow: "border-[#e9c75b]/20 bg-[#19170e] text-[#f4d875]", 
    red: "border-[#ef7777]/20 bg-[#1c1114] text-[#ff9c9c]", 
    green: "border-[#65dfa0]/20 bg-[#0d1c17] text-[#83e5aa]" 
  }; 
  return <div className={"flex items-center justify-between rounded-[23px] border p-5 " + styles[tone]}><div><p className="text-[10px] font-[900] text-[#8d9baa]">{title}</p><p className="mt-2 text-[28px] font-[900] text-white">{typeof value === "number" ? value.toLocaleString("th-TH") : value}</p></div><span className="grid size-11 place-items-center rounded-2xl bg-white/[0.07] [&>svg]:size-5">{icon}</span></div>; 
}

function QuickAction({ href, icon, title, detail, external = false }: { href: string; icon: React.ReactNode; title: string; detail: string; external?: boolean }) { 
  const content = <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#398dca]/40 hover:bg-[#14202b]"><span className="grid size-10 place-items-center rounded-xl bg-[#238ddd]/10 text-[#80c9ff] [&>svg]:size-4">{icon}</span><span className="min-w-0 flex-1"><span className="block text-[12px] font-[900] text-white">{title}</span><span className="mt-1 block truncate text-[10px] text-[#7f8d9c]">{detail}</span></span><ArrowUpRight className="size-4 text-[#607386] transition group-hover:text-white" /></div>; 
  return external ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : <Link href={href}>{content}</Link>; 
}
