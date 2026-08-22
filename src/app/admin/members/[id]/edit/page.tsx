import MemberForm from "../../_components/MemberForm";
import { getMember } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAuthenticatedGang } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const gang = await getAuthenticatedGang();
  if (!gang) redirect("/#auth");
  const { id } = await params;
  const member = await getMember(id);

  if (!member || member.gangId !== gang.id) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-[22.5px] font-[900] tracking-[-0.5625px] mb-[27px] text-text-inverse">แก้ไขข้อมูลสมาชิก</h2>
      <MemberForm member={member} />
    </div>
  );
}
