const fs = require('fs');

let content = fs.readFileSync('src/app/admin/members/_components/MembersLayoutToggle.tsx', 'utf-8');

// 1. Update props
content = content.replace(
  'export function MembersLayoutToggle({ initialLayout }: { initialLayout: string }) {',
  'import { Crown } from "lucide-react";\nexport function MembersLayoutToggle({ initialLayout, isVip }: { initialLayout: string, isVip: boolean }) {'
);

// 2. Update handler
content = content.replace(
  'const handleLayoutChange = (layout: string) => {',
  'const handleLayoutChange = (layout: string) => {\n    if (!isVip && layout === "premium") return;'
);

// 3. Update Premium label & input
// Find the Premium Layout Option section
const premiumLabelStart = "{/* Premium Layout Option */}";
const premiumLabelRegex = /\{\/\* Premium Layout Option \*\/\}\s*<label className={`relative block cursor-pointer group transition-all duration-300 \$\{isPending \? 'opacity-50 pointer-events-none' : ''\}`}/;

content = content.replace(
  premiumLabelRegex,
  `{/* Premium Layout Option */}
        <label className={\`relative block transition-all duration-300 \${!isVip ? 'cursor-not-allowed opacity-60 grayscale' : 'cursor-pointer'} \${isPending ? 'opacity-50 pointer-events-none' : ''} group\`}`
);

// Disable the input
content = content.replace(
  'checked={optimisticLayout === \'premium\'}',
  'checked={optimisticLayout === \'premium\'}\n            disabled={!isVip}'
);

// Add VIP Badge next to "รูปแบบใหม่ 3D (แนะนำ)"
content = content.replace(
  '<p className="text-[10px] text-[#0084ff] font-bold tracking-widest uppercase">รูปแบบใหม่ 3D (แนะนำ)</p>',
  `<div className="flex items-center gap-2">
                      <p className="text-[10px] text-[#0084ff] font-bold tracking-widest uppercase">รูปแบบใหม่ 3D (แนะนำ)</p>
                      {!isVip && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/30">
                          <Crown className="w-2 h-2" />
                          <span>VIP ONLY</span>
                        </div>
                      )}
                    </div>`
);

fs.writeFileSync('src/app/admin/members/_components/MembersLayoutToggle.tsx', content);
console.log('Updated MembersLayoutToggle for VIP');
