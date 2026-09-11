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


const statsStr = `
        {/* Stats Bar - Refined Capsules */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2.5 mb-[54px] -mt-[20px] px-4 relative z-10"
        >
          {totalFounders > 0 && (
            <div className="group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#facc15]/10 border border-[#facc15]/20 group-hover:bg-[#facc15]/20 group-hover:shadow-[0_0_10px_rgba(250,204,21,0.2)] transition-all duration-300">
                <Crown className="w-3.5 h-3.5 text-[#facc15]" />
              </div>
              <span className="text-[9px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">FOUNDER</span>
              <div className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-white/5 border border-white/5 rounded-full text-[10.5px] font-black text-white/90">
                {totalFounders}
              </div>
            </div>
          )}

          {totalLeaders > 0 && (
            <div className="group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:bg-[#ef4444]/20 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all duration-300">
                <Shield className="w-3.5 h-3.5 text-[#ef4444]" />
              </div>
              <span className="text-[9px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">LEADER</span>
              <div className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-white/5 border border-white/5 rounded-full text-[10.5px] font-black text-white/90">
                {totalLeaders}
              </div>
            </div>
          )}

          {totalSupports > 0 && (
            <div className="group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#ffb3d9]/10 border border-[#ffb3d9]/20 group-hover:bg-[#ffb3d9]/20 group-hover:shadow-[0_0_10px_rgba(255,179,217,0.2)] transition-all duration-300">
                <Heart className="w-3.5 h-3.5 text-[#ffb3d9]" />
              </div>
              <span className="text-[9px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">SUPPORT</span>
              <div className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-white/5 border border-white/5 rounded-full text-[10.5px] font-black text-white/90">
                {totalSupports}
              </div>
            </div>
          )}

          {totalMembers > 0 && (
            <div className="group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300">
                <User className="w-3.5 h-3.5 text-white/50" />
              </div>
              <span className="text-[9px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">MEMBER</span>
              <div className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 bg-white/5 border border-white/5 rounded-full text-[10.5px] font-black text-white/90">
                {totalMembers}
              </div>
            </div>
          )}
        </motion.div>
`;

content = content.replace('{/* Directory Sections */}', statsStr + '\n        {/* Directory Sections */}');

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Injected clean stats bar');
