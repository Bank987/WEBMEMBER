const fs = require('fs');
let c = fs.readFileSync('src/lib/db.ts','utf8');
c = c.replace('buttonShape: doc.buttonShape || "square",', 'buttonShape: doc.buttonShape || "square",\n    gateLayout: doc.gateLayout || "split",');
fs.writeFileSync('src/lib/db.ts', c);
