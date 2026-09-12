"use client";

import { useState } from "react";

export function VolumeSlider({ defaultValue }: { defaultValue: number }) {
  const [volume, setVolume] = useState(defaultValue);

  return (
    <div className="flex items-center gap-4 w-[400px] max-w-full">
      <input 
        type="range" 
        name="defaultVolume"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-full accent-[#0084ff]"
      />
      <span className="text-[12px] font-bold text-white min-w-[48px] text-right bg-white/5 px-2 py-1 rounded border border-white/10">
        {volume}%
      </span>
    </div>
  );
}
