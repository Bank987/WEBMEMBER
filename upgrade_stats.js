const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

// The old stats bar started with `{/* Stats Bar */}` and ended before `{/* Directory Sections */}`
const oldStatsRegex = /\{\/\* Stats Bar \*\/\}(.|\n)*?(?=\{\/\* Directory Sections \*\/\})/g;

const newStatsStr = `{/* Stats Bar - Ultra Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-[54px] -mt-[24px] px-4 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2.5 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-4xl relative overflow-hidden">
            
            {/* Ambient Background Glow inside HUD */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-gradient-to-r from-[#facc15]/5 via-[#ef4444]/5 to-[#ffb3d9]/5 blur-3xl pointer-events-none"></div>

            {/* Founder Stat */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.08] border border-white/[0.05] hover:border-[#facc15]/30 rounded-[18px] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#facc15]/10 blur-2xl group-hover:bg-[#facc15]/20 transition-all"></div>
              <div className="w-10 h-10 rounded-2xl bg-[#facc15]/10 border border-[#facc15]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                <Crown className="w-5 h-5 text-[#facc15]" />
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-[9px] font-black text-[#facc15]/80 tracking-[0.2em] uppercase mb-0.5">FOUNDERS</span>
                <span className="text-[22px] font-black text-white leading-none tracking-tighter drop-shadow-md">{totalFounders}</span>
              </div>
            </div>

            {/* Leader Stat */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.08] border border-white/[0.05] hover:border-[#ef4444]/30 rounded-[18px] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ef4444]/10 blur-2xl group-hover:bg-[#ef4444]/20 transition-all"></div>
              <div className="w-10 h-10 rounded-2xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <Shield className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-[9px] font-black text-[#ef4444]/80 tracking-[0.2em] uppercase mb-0.5">LEADERS</span>
                <span className="text-[22px] font-black text-white leading-none tracking-tighter drop-shadow-md">{totalLeaders}</span>
              </div>
            </div>

            {/* Support Stat */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.08] border border-white/[0.05] hover:border-[#ffb3d9]/30 rounded-[18px] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffb3d9]/10 blur-2xl group-hover:bg-[#ffb3d9]/20 transition-all"></div>
              <div className="w-10 h-10 rounded-2xl bg-[#ffb3d9]/10 border border-[#ffb3d9]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(255,179,217,0.1)]">
                <Heart className="w-5 h-5 text-[#ffb3d9]" />
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-[9px] font-black text-[#ffb3d9]/80 tracking-[0.2em] uppercase mb-0.5">SUPPORTS</span>
                <span className="text-[22px] font-black text-white leading-none tracking-tighter drop-shadow-md">{totalSupports}</span>
              </div>
            </div>

            {/* Member Stat */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-white/[0.03] to-transparent hover:from-white/[0.08] border border-white/[0.05] hover:border-white/30 rounded-[18px] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl group-hover:bg-white/10 transition-all"></div>
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <User className="w-5 h-5 text-white/60" />
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-[9px] font-black text-white/50 tracking-[0.2em] uppercase mb-0.5">MEMBERS</span>
                <span className="text-[22px] font-black text-white leading-none tracking-tighter drop-shadow-md">{totalMembers}</span>
              </div>
            </div>

          </div>
        </motion.div>
        
        `;

content = content.replace(oldStatsRegex, newStatsStr);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Upgraded frontend stats bar');
