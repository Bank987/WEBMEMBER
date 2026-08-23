"use client";

import { useState } from "react";

export function ButtonSettings({ initialText, initialImage, initialShape }: { initialText?: string, initialImage?: string, initialShape?: string }) {
  const [shape, setShape] = useState(initialShape || "square");

  return (
    <>
      <div>
        <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปแบบปุ่ม (Button Shape)</p>
        <select 
          name="buttonShape" 
          value={shape} 
          onChange={(e) => setShape(e.target.value)} 
          className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none"
        >
          <option value="square">สี่เหลี่ยมจัตุรัส (ดั้งเดิม)</option>
          <option value="rectangle">สี่เหลี่ยมผืนผ้า (แบบยาว)</option>
          <option value="parallelogram">สี่เหลี่ยมด้านขนาน (Parallelogram)</option>
        </select>
      </div>
      <div>
        <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">ข้อความปุ่มเข้าสู่เว็บไซต์</p>
        <input type="text" name="buttonText" defaultValue={initialText} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
      </div>
      {shape === "square" ? (
        <div className="sm:col-span-2">
          <p className="text-[10.5px] text-[#888888] mb-[6px] tracking-[1px]">รูปปุ่มเข้าสู่เว็บไซต์ (ใช้แทนข้อความ เฉพาะแบบจัตุรัส)</p>
          <input type="text" name="buttonImage" defaultValue={initialImage} className="w-full bg-black/50 border border-white/10 rounded-[6px] px-[12px] py-[9px] text-[12px] text-white outline-none" />
        </div>
      ) : (
        <input type="hidden" name="buttonImage" value="" />
      )}
    </>
  );
}
