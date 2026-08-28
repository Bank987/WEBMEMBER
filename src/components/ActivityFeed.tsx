import { UserPlus, UserCog, UserMinus, Settings, Megaphone } from "lucide-react";
import type { ActivityLog } from "@/lib/db";

const icons: Record<string, { icon: typeof UserPlus; color: string; bg: string }> = {
  member_add:         { icon: UserPlus,    color: "text-emerald-400", bg: "bg-emerald-500/10" },
  member_edit:        { icon: UserCog,     color: "text-sky-400",     bg: "bg-sky-500/10" },
  member_delete:      { icon: UserMinus,   color: "text-red-400",     bg: "bg-red-500/10" },
  settings_update:    { icon: Settings,    color: "text-amber-400",   bg: "bg-amber-500/10" },
  announcement_update:{ icon: Megaphone,   color: "text-violet-400",  bg: "bg-violet-500/10" },
};

const actionLabels: Record<string, string> = {
  member_add: "เพิ่มสมาชิก",
  member_edit: "แก้ไขสมาชิก",
  member_delete: "ลบสมาชิก",
  settings_update: "อัปเดตตั้งค่า",
  announcement_update: "อัปเดตประกาศ",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "เมื่อกี้";
  if (mins < 60) return mins + " นาทีที่แล้ว";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + " ชั่วโมงที่แล้ว";
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + " วันที่แล้ว";
  return new Date(dateStr).toLocaleDateString("th-TH", { day: "numeric", month: "short" });
}

export function ActivityFeed({ logs }: { logs: ActivityLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-10 rounded-2xl bg-white/5 grid place-items-center mb-4">
          <Settings className="size-4 text-white/20" />
        </div>
        <p className="text-[12px] text-[#556677]">ยังไม่มีกิจกรรม</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.04]">
      {logs.map((log) => {
        const cfg = icons[log.action] || icons.settings_update;
        const Icon = cfg.icon;
        return (
          <div key={log.id} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
            <span className={"mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl " + cfg.bg}>
              <Icon className={"size-3.5 " + cfg.color} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-white/90 font-medium leading-snug">
                <span className={"font-bold " + cfg.color}>{actionLabels[log.action] || log.action}</span>
                {" "}
                <span className="text-white/70">{log.label}</span>
              </p>
              <p className="mt-1 text-[10px] text-white/30">{timeAgo(log.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
