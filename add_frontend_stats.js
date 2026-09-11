const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

// 1. Calculate totals
content = content.replace(
  'const founders = filteredMembers.filter(m => m.role === "FOUNDER");',
  `const totalFounders = initialMembers.filter(m => m.role === "FOUNDER").length;
  const totalLeaders = initialMembers.filter(m => m.role === "LEADER").length;
  const totalSupports = initialMembers.filter(m => m.role === "SUPPORT").length;
  const totalMembers = initialMembers.filter(m => m.role === "MEMBER").length;

  const founders = filteredMembers.filter(m => m.role === "FOUNDER");`
);

// 2. Inject Stats Bar before Directory Sections
const statsBarStr = `
        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-[54px] -mt-[24px] px-4 relative z-10"
        >
          {totalFounders > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#facc15]/5 border border-[#facc15]/20 shadow-[0_0_15px_rgba(250,204,21,0.05)] backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-[pulse_2s_ease-in-out_infinite]"></div>
              <span className="text-[9px] font-bold text-[#facc15] tracking-widest uppercase">FOUNDER</span>
              <span className="text-[10px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{totalFounders}</span>
            </div>
          )}
          
          {totalLeaders > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ef4444]/5 border border-[#ef4444]/20 shadow-[0_0_15px_rgba(239,68,68,0.05)] backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-[pulse_2s_ease-in-out_infinite] delay-75"></div>
              <span className="text-[9px] font-bold text-[#ef4444] tracking-widest uppercase">LEADER</span>
              <span className="text-[10px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{totalLeaders}</span>
            </div>
          )}

          {totalSupports > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb3d9]/5 border border-[#ffb3d9]/20 shadow-[0_0_15px_rgba(255,179,217,0.05)] backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb3d9] shadow-[0_0_8px_rgba(255,179,217,0.8)] animate-[pulse_2s_ease-in-out_infinite] delay-150"></div>
              <span className="text-[9px] font-bold text-[#ffb3d9] tracking-widest uppercase">SUPPORT</span>
              <span className="text-[10px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{totalSupports}</span>
            </div>
          )}

          {totalMembers > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
              <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase">MEMBER</span>
              <span className="text-[10px] font-black text-white ml-1 bg-black/50 px-2 py-0.5 rounded-md border border-white/5">{totalMembers}</span>
            </div>
          )}
        </motion.div>
`;

content = content.replace('{/* Directory Sections */}', statsBarStr + '\n        {/* Directory Sections */}');

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Added frontend stats bar correctly');
