const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');

const regex = /(<div className="absolute bottom-0 left-1\/2 -translate-x-1\/2 h-\[1px\] w-0 bg-text-secondary[\s\S]*?z-20"><\/div>\s*<\/div>)/;

const searchButtonStr = `
          <AnimatePresence>
            {!showStats && (
              <motion.button
                key="show-stats-btn"
                initial={{ opacity: 0, scale: 0.5, x: -10, width: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, scale: 0.5, x: -10, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setShowStats(true)}
                className="group flex items-center justify-center w-[40px] h-[40px] rounded-[6px] bg-[#050505]/80 hover:bg-white/5 border border-white/10 hover:border-[#facc15]/30 shadow-lg transition-colors overflow-hidden shrink-0"
                title="Show Stats"
              >
                <BarChart2 className="w-4 h-4 text-white/40 group-hover:text-[#facc15] transition-colors shrink-0" />
              </motion.button>
            )}
          </AnimatePresence>`;

if (regex.test(content)) {
  content = content.replace(regex, '$1' + searchButtonStr);
  fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
  console.log('Successfully injected button');
} else {
  console.log('Regex still failed');
}
