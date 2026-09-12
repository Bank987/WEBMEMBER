const fs = require('fs');
let c = fs.readFileSync('src/lib/db.ts','utf8');
c = c.replace('buttonShape?: string;', 'buttonShape?: string;\n  gateLayout?: string;');
c = c.replace('entryAnimation: { type: String, default: "fade" },', 'entryAnimation: { type: String, default: "fade" },\n  gateLayout: { type: String, default: "split", enum: ["centered", "split"] },');
c = c.replace('buttonShape: (doc as any).buttonShape || "square",', 'buttonShape: (doc as any).buttonShape || "square",\n    gateLayout: (doc as any).gateLayout || "split",');
c = c.replace('if (!GangModel.schema.path("buttonShape"))', 'if (!GangModel.schema.path("gateLayout")) {\n  GangModel.schema.add({ gateLayout: { type: String, default: "split", enum: ["centered", "split"] } });\n}\nif (!GangModel.schema.path("buttonShape"))');
fs.writeFileSync('src/lib/db.ts', c);
