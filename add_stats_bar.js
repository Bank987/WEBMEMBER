const fs = require('fs');

let content = fs.readFileSync('src/app/admin/members/page.tsx', 'utf-8');

// 1. Calculate counts
content = content.replace(
  'const members = await getMembersByGang(gang.id);',
  `const members = await getMembersByGang(gang.id);\n\n  const founderCount = members.filter(m => m.role === "FOUNDER").length;\n  const leaderCount = members.filter(m => m.role === "LEADER").length;\n  const supportCount = members.filter(m => m.role === "SUPPORT").length;\n  const memberCount = members.filter(m => m.role === "MEMBER").length;`
);

// 2. Inject stats bar
const statsBar = `        {/* Stats Bar */}
        <div className="px-[18px] py-[12px] border-b border-[#111111] bg-[#050505] flex items-center gap-3 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#facc15]/5 border border-[#facc15]/20 shadow-[0_0_15px_rgba(250,204,21,0.05)] min-w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse"></div>
            <span className="text-[10px] font-bold text-[#facc15] tracking-widest uppercase">FOUNDER</span>
            <span className="text-[11px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{founderCount}</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ef4444]/5 border border-[#ef4444]/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] min-w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
            <span className="text-[10px] font-bold text-[#ef4444] tracking-widest uppercase">LEADER</span>
            <span className="text-[11px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{leaderCount}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ffb3d9]/5 border border-[#ffb3d9]/20 shadow-[0_0_15px_rgba(255,179,217,0.05)] min-w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffb3d9] shadow-[0_0_8px_rgba(255,179,217,0.8)] animate-pulse"></div>
            <span className="text-[10px] font-bold text-[#ffb3d9] tracking-widest uppercase">SUPPORT</span>
            <span className="text-[11px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{supportCount}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)] min-w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
            <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">MEMBER</span>
            <span className="text-[11px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{memberCount}</span>
          </div>
        </div>

        <table className="w-full text-left border-collapse relative z-10">`;

content = content.replace(
  '<table className="w-full text-left border-collapse relative z-10">',
  statsBar
);

fs.writeFileSync('src/app/admin/members/page.tsx', content);
console.log('Added stats bar');
