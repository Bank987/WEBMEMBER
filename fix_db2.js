const fs = require('fs');
let content = fs.readFileSync('src/lib/db.ts', 'utf-8');

// Just remove it from where it is and append it at the end of the schema additions
content = content.replace(
  '  if (!GangModel.schema.path("membersLayout")) { GangModel.schema.add({ membersLayout: { type: String, default: "classic" } }); }\n',
  ''
);

const appendTarget = 'if (!GangModel.schema.path("musicPlayerStyle")) {\n  GangModel.schema.add({ musicPlayerStyle: { type: String, default: "classic", enum: ["classic", "premium", "vinyl"] } });\n}';
const newAddition = 'if (!GangModel.schema.path("membersLayout")) {\n  GangModel.schema.add({ membersLayout: { type: String, default: "classic" } });\n}\n';

content = content.replace(appendTarget, appendTarget + '\n' + newAddition);

fs.writeFileSync('src/lib/db.ts', content);
console.log('Fixed db.ts permanently');
