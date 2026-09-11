const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

// 1. Add state and update filter
const stateStr = `  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);

  const filteredMembers = initialMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRoleFilter ? m.role === activeRoleFilter : true;
    return matchesSearch && matchesRole;
  });`;

content = content.replace(
  /const \[searchQuery[\s\S]*?m\.name\.toLowerCase\(\)\.includes\(searchQuery\.toLowerCase\(\)\)\n\s*\);/,
  stateStr
);

// 2. Replace the static capsules with interactive ones
const oldStatsRegex = /\{\/\* Stats Bar - Expandable\/Collapsible \*\/\}(.|\n)*?(?=\{\/\* Directory Sections \*\/\})/g;

const interactiveStatsStr = `{/* Stats Bar - Expandable/Collapsible (Interactive) */}
        <div className="flex justify-center mb-[54px] -mt-[20px] px-4">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div 
                key="stats-expanded"
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="flex flex-wrap justify-center items-center gap-2.5 relative z-10 origin-top overflow-hidden"
              >
                {totalFounders > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'FOUNDER' ? null : 'FOUNDER')}
                    className={\`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer \${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/20 border border-[#facc15]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} \${activeRoleFilter && activeRoleFilter !== 'FOUNDER' ? 'opacity-40 grayscale' : 'opacity-100'}\`}
                  >
                    <div className={\`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 \${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/30 border border-[#facc15]/50 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-[#facc15]/10 border border-[#facc15]/20 group-hover:bg-[#facc15]/20 group-hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]'}\`}>
                      <Crown className={\`w-3.5 h-3.5 \${activeRoleFilter === 'FOUNDER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#facc15]'}\`} />
                    </div>
                    <span className={\`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 \${activeRoleFilter === 'FOUNDER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}\`}>FOUNDER</span>
                    <div className={\`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black \${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/30 border border-[#facc15]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}\`}>
                      {totalFounders}
                    </div>
                  </div>
                )}

                {totalLeaders > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'LEADER' ? null : 'LEADER')}
                    className={\`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer \${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/20 border border-[#ef4444]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} \${activeRoleFilter && activeRoleFilter !== 'LEADER' ? 'opacity-40 grayscale' : 'opacity-100'}\`}
                  >
                    <div className={\`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 \${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/30 border border-[#ef4444]/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:bg-[#ef4444]/20 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]'}\`}>
                      <Shield className={\`w-3.5 h-3.5 \${activeRoleFilter === 'LEADER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#ef4444]'}\`} />
                    </div>
                    <span className={\`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 \${activeRoleFilter === 'LEADER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}\`}>LEADER</span>
                    <div className={\`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black \${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/30 border border-[#ef4444]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}\`}>
                      {totalLeaders}
                    </div>
                  </div>
                )}

                {totalSupports > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'SUPPORT' ? null : 'SUPPORT')}
                    className={\`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer \${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/20 border border-[#ffb3d9]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} \${activeRoleFilter && activeRoleFilter !== 'SUPPORT' ? 'opacity-40 grayscale' : 'opacity-100'}\`}
                  >
                    <div className={\`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 \${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/30 border border-[#ffb3d9]/50 shadow-[0_0_15px_rgba(255,179,217,0.4)]' : 'bg-[#ffb3d9]/10 border border-[#ffb3d9]/20 group-hover:bg-[#ffb3d9]/20 group-hover:shadow-[0_0_10px_rgba(255,179,217,0.2)]'}\`}>
                      <Heart className={\`w-3.5 h-3.5 \${activeRoleFilter === 'SUPPORT' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#ffb3d9]'}\`} />
                    </div>
                    <span className={\`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 \${activeRoleFilter === 'SUPPORT' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}\`}>SUPPORT</span>
                    <div className={\`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black \${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/30 border border-[#ffb3d9]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}\`}>
                      {totalSupports}
                    </div>
                  </div>
                )}

                {totalMembers > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'MEMBER' ? null : 'MEMBER')}
                    className={\`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer \${activeRoleFilter === 'MEMBER' ? 'bg-white/20 border border-white/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} \${activeRoleFilter && activeRoleFilter !== 'MEMBER' ? 'opacity-40 grayscale' : 'opacity-100'}\`}
                  >
                    <div className={\`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 \${activeRoleFilter === 'MEMBER' ? 'bg-white/30 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]'}\`}>
                      <User className={\`w-3.5 h-3.5 \${activeRoleFilter === 'MEMBER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-white/50'}\`} />
                    </div>
                    <span className={\`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 \${activeRoleFilter === 'MEMBER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}\`}>MEMBER</span>
                    <div className={\`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black \${activeRoleFilter === 'MEMBER' ? 'bg-white/30 border border-white/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}\`}>
                      {totalMembers}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <button 
                  onClick={() => setShowStats(false)}
                  className="group flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-xl border border-white/5 hover:border-white/20 shadow-lg transition-all duration-300 ml-1 hover:scale-110 active:scale-95 shrink-0"
                  title="Hide Stats"
                >
                  <X className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        `;

content = content.replace(oldStatsRegex, interactiveStatsStr);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Made capsules clickable');
