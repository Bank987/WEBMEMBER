const fs = require('fs');
let c = fs.readFileSync('src/actions/settings.ts','utf8');
c = c.replace('buttonShape: formData.get("buttonShape") as string || "square",', 'buttonShape: formData.get("buttonShape") as string || "square",\n    gateLayout: formData.get("gateLayout") as string || "split",');
fs.writeFileSync('src/actions/settings.ts', c);
