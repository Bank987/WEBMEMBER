const fs = require('fs');

const file = 'src/app/admin/vip/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace button with anchor tag
code = code.replace(
  /<button \s*onClick=\{\(\) \=\> setShowBuyModal\(true\)\}\s*className="text-xs font-bold text-\[#0084ff\] hover:text-\[#339cff\] flex items-center gap-1 bg-\[#0084ff\]\/10 hover:bg-\[#0084ff\]\/20 px-3 py-1 rounded-full transition"\s*>\s*<ShoppingCart className="size-3" \/>\s*สั่งซื้อ VIP Key\s*<\/button>/g,
  `<a \n                href="https://bydseal.xcsxs.xyz"\n                target="_blank"\n                rel="noreferrer"\n                className="text-xs font-bold text-[#0084ff] hover:text-[#339cff] flex items-center gap-1 bg-[#0084ff]/10 hover:bg-[#0084ff]/20 px-3 py-1 rounded-full transition"\n              >\n                <ShoppingCart className="size-3" />\n                สั่งซื้อ VIP Key\n              </a>`
);

// Delete modal code (remove lines between {/* Buy Modal */} and the end of AnimatePresence)
const startIdx = code.indexOf('{/* Buy Modal */}');
if (startIdx !== -1) {
  const endMarker = '          </motion.div>\n        )}\n      </AnimatePresence>';
  const endIdx = code.indexOf(endMarker, startIdx);
  if (endIdx !== -1) {
    code = code.substring(0, startIdx) + code.substring(endIdx + endMarker.length);
  }
}

// Remove showBuyModal state
code = code.replace(/const \[showBuyModal, setShowBuyModal\] = useState\(false\);\n/, '');

fs.writeFileSync(file, code);
console.log("Updated admin vip page");