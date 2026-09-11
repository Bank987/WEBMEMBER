const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const oldAnimate = `                initial={{ opacity: 0, scale: 0.5, x: -10, width: 0 }}\n                animate={{ opacity: 1, scale: 1, x: 0, width: "auto" }}\n                exit={{ opacity: 0, scale: 0.5, x: -10, width: 0 }}`;
const newAnimate = `                initial={{ opacity: 0, scale: 0.5, x: -10 }}\n                animate={{ opacity: 1, scale: 1, x: 0 }}\n                exit={{ opacity: 0, scale: 0.5, x: -10 }}`;

content = content.replace(oldAnimate, newAnimate);

const oldClass = 'className="group flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/10 transition-all duration-300 shrink-0 shadow-sm"';
const newClass = 'className="group flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/10 transition-all duration-300 shrink-0 shadow-sm ml-2"';

content = content.replace(oldClass, newClass);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Fixed button squeeze');
