const fs = require('fs');

const file1 = `src/components/BuyVipButton.tsx`;
let content1 = `"use client";

import { ShoppingCart } from "lucide-react";

const VIP_BUY_URL = "https://bydseal.xcsxs.xyz";

export function BuyVipButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={VIP_BUY_URL}
      target="_blank"
      rel="noreferrer"
      className={\`group relative inline-flex items-center overflow-hidden rounded-full border border-yellow-500/40 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_10px_28px_rgba(234,179,8,0.28)] transition hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] \${compact ? "gap-2 px-4 py-2.5 text-[10px]" : "gap-3 px-5 py-3 text-[11px]"}\`}
    >
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative grid size-6 place-items-center rounded-full bg-black/15">
        <ShoppingCart className="size-3.5 text-black" />
      </span>
      <span className="relative font-[900] tracking-[1px] uppercase text-black">สั่งซื้อ VIP</span>
    </a>
  );
}
`;
fs.writeFileSync(file1, content1);
console.log("Updated BuyVipButton");