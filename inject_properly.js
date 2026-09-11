const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const anchor = '<motion.main \n        initial={{ opacity: 0 }}';
const alternativeAnchor = '<motion.main \r\n        initial={{ opacity: 0 }}';

const topStatsStr = `{/* Floating Stats - Top Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute top-6 right-6 z-40 flex flex-col items-end gap-2 hidden sm:flex"
        >
          {totalFounders > 0 && (
            <div className="group flex items-center justify-between w-[120px] px-1.5 py-1.5 pr-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#facc15]/10 border border-[#facc15]/20 group-hover:bg-[#facc15]/20 group-hover:shadow-[0_0_10px_rgba(250,204,21,0.2)] transition-all duration-300">
                  <Crown className="w-3 h-3 text-[#facc15]" />
                </div>
                <span className="text-[8px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">FOUNDER</span>
              </div>
              <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-white/90">
                {totalFounders}
              </div>
            </div>
          )}

          {totalLeaders > 0 && (
            <div className="group flex items-center justify-between w-[120px] px-1.5 py-1.5 pr-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:bg-[#ef4444]/20 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all duration-300">
                  <Shield className="w-3 h-3 text-[#ef4444]" />
                </div>
                <span className="text-[8px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">LEADER</span>
              </div>
              <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-white/90">
                {totalLeaders}
              </div>
            </div>
          )}

          {totalSupports > 0 && (
            <div className="group flex items-center justify-between w-[120px] px-1.5 py-1.5 pr-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ffb3d9]/10 border border-[#ffb3d9]/20 group-hover:bg-[#ffb3d9]/20 group-hover:shadow-[0_0_10px_rgba(255,179,217,0.2)] transition-all duration-300">
                  <Heart className="w-3 h-3 text-[#ffb3d9]" />
                </div>
                <span className="text-[8px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">SUPPORT</span>
              </div>
              <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-white/90">
                {totalSupports}
              </div>
            </div>
          )}

          {totalMembers > 0 && (
            <div className="group flex items-center justify-between w-[120px] px-1.5 py-1.5 pr-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 cursor-default">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300">
                  <User className="w-3 h-3 text-white/50" />
                </div>
                <span className="text-[8px] font-bold text-white/60 tracking-[0.15em] uppercase group-hover:text-white/90 transition-colors duration-300">MEMBER</span>
              </div>
              <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-white/90">
                {totalMembers}
              </div>
            </div>
          )}
        </motion.div>\n\n        `;

if (content.includes(anchor)) {
  content = content.replace(anchor, topStatsStr + anchor);
} else if (content.includes(alternativeAnchor)) {
  content = content.replace(alternativeAnchor, topStatsStr + alternativeAnchor);
} else {
  // Try regex
  const regexAnchor = /<motion\.main\s*initial=\{\{ opacity: 0 \}\}/;
  if (regexAnchor.test(content)) {
    content = content.replace(regexAnchor, topStatsStr + '<motion.main \n        initial={{ opacity: 0 }}');
  } else {
    console.log('Could not find anchor!');
  }
}

fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Injected properly this time');
