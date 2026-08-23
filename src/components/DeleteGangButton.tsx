"use client";

import { useTransition } from "react";

export function DeleteGangButton({ deleteAction }: { deleteAction: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการยุบแก๊งนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
      startTransition(async () => {
        try {
          await deleteAction();
        } catch (error: any) {
          alert(error.message || "เกิดข้อผิดพลาดในการยุบแก๊ง");
        }
      });
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleDelete}
      disabled={isPending}
      className={`bg-[#ff0000]/10 hover:bg-[#ff0000]/30 text-[#ff4444] border border-[#ff0000]/30 px-[18px] py-[9px] rounded-full text-[11px] font-[900] tracking-[1px] transition-all ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? 'กำลังดำเนินการ...' : 'ยุบแก๊งและลบข้อมูลทั้งหมด'}
    </button>
  );
}
