const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const oldStatsRegex = /\{\/\* Stats Bar - Ultra Premium \*\/\}(.|\n)*?(?=\{\/\* Directory Sections \*\/\})/g;

const newStatsStr = `{/* Stats Bar - Minimal & Beautiful */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mb-[54px] -mt-[18px] px-4 relative z-10"
        >
          {totalFounders > 0 && (
            <div className="flex items-center justify-between w-[130px] px-4 py-3 bg-[#050505]/80 backdrop-blur-xl border border-white/[0.06] hover:border-[#facc15]/30 hover:bg-white/[0.02] rounded-[16px] transition-all duration-300 group shadow-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-semibold text-text-primary/40 tracking-[0.15em] uppercase mb-1.5">FOUNDERS</span>
                <span className="text-[16px] font-medium text-white leading-none">{totalFounders}</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-[#facc15]/10 group-hover:border-[#facc15]/20 transition-all duration-300">
                <Crown className="w-3.5 h-3.5 text-text-primary/40 group-hover:text-[#facc15] transition-colors duration-300" />
              </div>
            </div>
          )}

          {totalLeaders > 0 && (
            <div className="flex items-center justify-between w-[130px] px-4 py-3 bg-[#050505]/80 backdrop-blur-xl border border-white/[0.06] hover:border-[#ef4444]/30 hover:bg-white/[0.02] rounded-[16px] transition-all duration-300 group shadow-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-semibold text-text-primary/40 tracking-[0.15em] uppercase mb-1.5">LEADERS</span>
                <span className="text-[16px] font-medium text-white leading-none">{totalLeaders}</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-[#ef4444]/10 group-hover:border-[#ef4444]/20 transition-all duration-300">
                <Shield className="w-3.5 h-3.5 text-text-primary/40 group-hover:text-[#ef4444] transition-colors duration-300" />
              </div>
            </div>
          )}

          {totalSupports > 0 && (
            <div className="flex items-center justify-between w-[130px] px-4 py-3 bg-[#050505]/80 backdrop-blur-xl border border-white/[0.06] hover:border-[#ffb3d9]/30 hover:bg-white/[0.02] rounded-[16px] transition-all duration-300 group shadow-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-semibold text-text-primary/40 tracking-[0.15em] uppercase mb-1.5">SUPPORTS</span>
                <span className="text-[16px] font-medium text-white leading-none">{totalSupports}</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-[#ffb3d9]/10 group-hover:border-[#ffb3d9]/20 transition-all duration-300">
                <Heart className="w-3.5 h-3.5 text-text-primary/40 group-hover:text-[#ffb3d9] transition-colors duration-300" />
              </div>
            </div>
          )}

          {totalMembers > 0 && (
            <div className="flex items-center justify-between w-[130px] px-4 py-3 bg-[#050505]/80 backdrop-blur-xl border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02] rounded-[16px] transition-all duration-300 group shadow-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-semibold text-text-primary/40 tracking-[0.15em] uppercase mb-1.5">MEMBERS</span>
                <span className="text-[16px] font-medium text-white leading-none">{totalMembers}</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                <User className="w-3.5 h-3.5 text-text-primary/40 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          )}
        </motion.div>
        
        `;

content = content.replace(oldStatsRegex, newStatsStr);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Applied minimal premium stats');
