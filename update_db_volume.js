const fs = require('fs');

let content = fs.readFileSync('src/lib/db.ts', 'utf-8');

// 1. Add to gangSchema
content = content.replace(
  'youtubeMusicUrl: { type: String, default: "" },',
  'youtubeMusicUrl: { type: String, default: "" },\n    defaultVolume: { type: Number, default: 100 },'
);

// 2. Add fallback schema add
content = content.replace(
  'export const GangModel = mongoose.models.Gang || mongoose.model("Gang", gangSchema);',
  `export const GangModel = mongoose.models.Gang || mongoose.model("Gang", gangSchema);\n  if (!GangModel.schema.path("defaultVolume")) {
    GangModel.schema.add({ defaultVolume: { type: Number, default: 100 } });
  }`
);

// 3. Add to interface
content = content.replace(
  'youtubeMusicUrl: string;',
  'youtubeMusicUrl: string;\n    defaultVolume?: number;'
);

// 4. Add to mapGang
content = content.replace(
  'youtubeMusicUrl: doc.youtubeMusicUrl || "",',
  'youtubeMusicUrl: doc.youtubeMusicUrl || "",\n      defaultVolume: doc.defaultVolume !== undefined ? doc.defaultVolume : 100,'
);

fs.writeFileSync('src/lib/db.ts', content);
console.log('Updated db.ts for defaultVolume');
