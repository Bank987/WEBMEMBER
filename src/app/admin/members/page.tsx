import { getMembersByGang } from "@/lib/db";
import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, ArrowUpRight } from "lucide-react";
import { deleteMember } from "@/actions/members";
import { AddMemberButton } from "@/components/AddMemberButton";

export default async function AdminMembersPage() {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");
  const members = await getMembersByGang(gang.id);

  return (
    <div className="space-y-[36px]">
      <div className="flex items-center justify-between border-b border-[#111111] pb-[18px]">
        <div>
          <h2 className="text-[28px] font-[900] tracking-[-0.5625px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888888]">
            รายชื่อสมาชิก
          </h2>
          <p className="text-[10.5px] text-[#0084ff] tracking-[3px] uppercase mt-[6px]">
            จัดการข้อมูลสมาชิกในเว็บไซต์
          </p>
        </div>
        
        <AddMemberButton isVip={gang.isVip || false} memberCount={members.length} />
      </div>

      <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden shadow-2xl relative">
        <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-[#0084ff] blur-[150px] opacity-10 pointer-events-none" />
        
        {/* Toolbar */}
        <div className="p-[18px] border-b border-[#111111] flex items-center justify-between bg-[#0a0a0a]/50 backdrop-blur-md">
          <div className="relative w-[300px]">
            <Search className="w-[14px] h-[14px] text-[#888888] absolute left-[15px] top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="ค้นหาสมาชิก..." 
              className="w-full bg-black/50 border border-white/10 rounded-full py-[9px] pl-[42px] pr-[18px] text-[10.5px] text-white focus:border-[#0084ff] outline-none tracking-[1.8px] uppercase transition-colors"
            />
          </div>
          <div className="text-[10.5px] tracking-[1.8px] text-[#888888] uppercase">
            ทั้งหมด: <span className="text-white font-[900]">{members.length}</span>
          </div>
        </div>

        <table className="w-full text-left border-collapse relative z-10">
          <thead>
            <tr className="border-b border-[#111111] bg-black/20">
              <th className="p-[24px] text-[10px] font-[900] text-[#888888] tracking-[3px]">สมาชิก</th>
              <th className="p-[24px] text-[10px] font-[900] text-[#888888] tracking-[3px]">ระดับ</th>
              <th className="p-[24px] text-[10px] font-[900] text-[#888888] tracking-[3px] text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-[45px] text-center text-[#888888] text-[12px] uppercase tracking-[2px]">
                   ยังไม่มีข้อมูลสมาชิก
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member.id} className="group border-b border-[#111111] last:border-0 hover:bg-[#111111]/80 transition-all duration-300">
                  <td className="p-[24px]">
                    <div className="flex items-center gap-[18px]">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-[45px] h-[45px] rounded-[12px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" />
                        <div className="absolute -bottom-[2px] -right-[2px] w-[12px] h-[12px] bg-[#0084ff] rounded-full border-[2px] border-[#050505]" />
                      </div>
                      <div>
                        <span className="block text-[14px] font-[900] text-text-inverse mb-[3px]">{member.name}</span>
                        {member.facebookUrl && (
                          <a href={member.facebookUrl} target="_blank" className="flex items-center gap-[3px] text-[9px] text-[#0084ff] uppercase tracking-[1.8px] hover:underline">
                            Facebook Profile <ArrowUpRight className="w-[9px] h-[9px]" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-[24px]">
                    <span className={`text-[10px] font-[900] uppercase tracking-[2px] px-[12px] py-[6px] rounded-[6px] border 
                      ${member.role === 'FOUNDER' ? 'border-[#facc15]/30 text-[#facc15] bg-[#facc15]/5' : 
                        member.role === 'LEADER' ? 'border-[#ef4444]/30 text-[#ef4444] bg-[#ef4444]/5' : 
                        'border-white/10 text-[#888888] bg-white/5'}
                    `}>
                      {member.role}
                    </span>
                  </td>
                  <td className="p-[24px] text-right">
                    <div className="flex items-center justify-end gap-[12px] opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/members/${member.id}/edit`} className="p-[9px] text-[#888888] hover:text-[#0084ff] transition-colors rounded-[8px] hover:bg-[#0084ff]/10 border border-transparent hover:border-[#0084ff]/20">
                        <Edit className="w-[16px] h-[16px]" />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteMember(member.id);
                      }}>
                        <button type="submit" className="p-[9px] text-[#888888] hover:text-[#ef4444] transition-colors rounded-[8px] hover:bg-[#ef4444]/10 border border-transparent hover:border-[#ef4444]/20">
                          <Trash2 className="w-[16px] h-[16px]" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
