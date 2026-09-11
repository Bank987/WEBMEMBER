const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const oldClass = 'className="group flex items-center justify-center w-[40px] h-[40px] rounded-[6px] bg-[#050505]/80 hover:bg-white/5 border border-white/10 hover:border-[#facc15]/30 shadow-lg transition-colors overflow-hidden shrink-0"';
const newClass = 'className="group flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/10 transition-all duration-300 shrink-0 shadow-sm"';

content = content.replace(oldClass, newClass);

const oldIcon = '<BarChart2 className="w-4 h-4 text-white/40 group-hover:text-[#facc15] transition-colors shrink-0" />';
const newIcon = '<BarChart2 className="w-[14px] h-[14px] text-text-primary/40 group-hover:text-text-secondary transition-colors duration-300 shrink-0" />';

content = content.replace(oldIcon, newIcon);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Made button minimal');
