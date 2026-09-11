const fs = require('fs');
let content = fs.readFileSync('src/lib/db.ts', 'utf-8');

// Fix the nested if blocks
content = content.replace(
  'if (!GangModel.schema.path("backgroundImageUrl")) {\n  if (!GangModel.schema.path("membersLayout")) { GangModel.schema.add({ membersLayout: { type: String, default: "classic" } }); }\n    if (!GangModel.schema.path("membersBackgroundImageUrl"))',
  'if (!GangModel.schema.path("membersLayout")) { GangModel.schema.add({ membersLayout: { type: String, default: "classic" } }); }\n  if (!GangModel.schema.path("backgroundImageUrl")) {\n    if (!GangModel.schema.path("membersBackgroundImageUrl"))'
);

fs.writeFileSync('src/lib/db.ts', content);
console.log('Fixed db.ts schema.add');
