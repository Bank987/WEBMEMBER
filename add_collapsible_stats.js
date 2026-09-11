const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

// 1. Update imports
content = content.replace(
  'import { motion } from "framer-motion";',
  'import { motion, AnimatePresence } from "framer-motion";'
);

content = content.replace(
  'import { Shield, Crown, User, Search, Plus, Heart } from "lucide-react";',
  'import { Shield, Crown, User, Search, Plus, Heart, X, BarChart2 } from "lucide-react";'
);

// 2. Add state
content = content.replace(
  'const [searchQuery, setSearchQuery] = useState("");',
  'const [searchQuery, setSearchQuery] = useState("");\n  const [showStats, setShowStats] = useState(true);'
);

// 3. Replace Stats Bar
const oldStatsRegex = /\{\/\* Stats Bar - Refined Capsules \*\/\}(.|\n)*?(?=\{\/\* Directory Sections \*\/\})/g;

const newStatsStr = `{/* Stats Bar - Expandable/Collapsible */}
        <div className="flex justify-center mb-[54px] -mt-[20px] px-4">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div 
                key="stats-expanded"
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="flex flex-wrap justify-center items-center gap-2.5 relative z-10 origin-top overflow-hidden pb-2"
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

                {/* Close Button */}
                <button 
                  onClick={() => setShowStats(false)}
                  className="group flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-xl border border-white/5 hover:border-white/20 shadow-lg transition-all duration-300 ml-1 hover:scale-110 active:scale-95"
                  title="Hide Stats"
                >
                  <X className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="stats-collapsed"
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -10 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                className="flex justify-center"
              >
                <button 
                  onClick={() => setShowStats(true)}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <BarChart2 className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] font-bold text-white/40 tracking-[0.15em] uppercase group-hover:text-white/80 transition-colors">Show Stats</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        `;

content = content.replace(oldStatsRegex, newStatsStr);

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Added collapsible stats bar');
