const fs = require('fs');

let dbContent = fs.readFileSync('src/lib/db.ts', 'utf-8');

// 1. Interface
if (!dbContent.includes('membersLayout?: string;')) {
  dbContent = dbContent.replace(
    'membersBackgroundImageUrl?: string;',
    'membersBackgroundImageUrl?: string;\n  membersLayout?: string;'
  );
}

// 2. Schema
if (!dbContent.includes('membersLayout: { type: String, default: "classic" }')) {
  dbContent = dbContent.replace(
    'membersBackgroundImageUrl: { type: String, default: "" },',
    'membersBackgroundImageUrl: { type: String, default: "" },\n  membersLayout: { type: String, default: "classic" },'
  );
}

// 3. Schema additions
if (!dbContent.includes('path("membersLayout")')) {
  dbContent = dbContent.replace(
    'if (!GangModel.schema.path("membersBackgroundImageUrl"))',
    'if (!GangModel.schema.path("membersLayout")) { GangModel.schema.add({ membersLayout: { type: String, default: "classic" } }); }\n  if (!GangModel.schema.path("membersBackgroundImageUrl"))'
  );
}

// 4. Map Function
if (!dbContent.includes('membersLayout: doc.membersLayout || "classic",')) {
  dbContent = dbContent.replace(
    'membersBackgroundImageUrl: doc.membersBackgroundImageUrl || "",',
    'membersBackgroundImageUrl: doc.membersBackgroundImageUrl || "",\n    membersLayout: doc.membersLayout || "classic",'
  );
}

fs.writeFileSync('src/lib/db.ts', dbContent);
console.log('db.ts updated successfully');
