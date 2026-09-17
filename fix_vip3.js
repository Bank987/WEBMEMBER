const fs = require('fs');

const file = 'src/app/admin/vip/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace everything from {/* Buy Modal */} to the end of file (assuming it's at the end)
// Wait, is it at the end? Let's check.
const idx = code.indexOf('{/* Buy Modal */}');
if (idx !== -1) {
  // Find the last closing tags of the component
  const lastReturn = code.lastIndexOf('  );');
  if (lastReturn !== -1 && lastReturn > idx) {
    code = code.substring(0, idx) + '\n' + code.substring(lastReturn);
  }
}

fs.writeFileSync(file, code);
console.log("Removed Buy Modal completely");