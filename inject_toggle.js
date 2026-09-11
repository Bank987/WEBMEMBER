const fs = require('fs');
let content = fs.readFileSync('src/app/admin/members/page.tsx', 'utf-8');

// Add import
content = content.replace(
  'import { AddMemberButton } from "@/components/AddMemberButton";',
  'import { AddMemberButton } from "@/components/AddMemberButton";\nimport { MembersLayoutToggle } from "./_components/MembersLayoutToggle";'
);

// Add component
content = content.replace(
  '<div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden shadow-2xl relative">',
  '<MembersLayoutToggle initialLayout={gang.membersLayout || "classic"} />\n\n      <div className="bg-[#050505] border border-[#111111] rounded-[18px] overflow-hidden shadow-2xl relative">'
);

fs.writeFileSync('src/app/admin/members/page.tsx', content);
console.log('Injected MembersLayoutToggle');
