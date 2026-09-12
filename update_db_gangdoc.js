const fs = require('fs');
let c = fs.readFileSync('src/lib/db.ts','utf8');
c = c.replace('buttonShape?: string;', 'buttonShape?: string;\n  gateLayout?: string;');
fs.writeFileSync('src/lib/db.ts', c);
