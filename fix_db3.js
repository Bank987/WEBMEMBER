const fs = require('fs');
let content = fs.readFileSync('src/lib/db.ts', 'utf-8');

const anchor = 'if (!GangModel.schema.path("buttonShape")) {';
const newAddition = 'if (!GangModel.schema.path("membersLayout")) { GangModel.schema.add({ membersLayout: { type: String, default: "classic" } }); }\n';

if (!content.includes('GangModel.schema.path("membersLayout")')) {
  content = content.replace(anchor, newAddition + anchor);
  fs.writeFileSync('src/lib/db.ts', content);
  console.log('Added schema path check');
}
