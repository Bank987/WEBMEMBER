const fs = require('fs');

let content = fs.readFileSync('src/actions/settings.ts', 'utf-8');

content = content.replace(
  'youtubeMusicUrl: sanitizeUrl(formData.get("youtubeMusicUrl") as string),',
  'youtubeMusicUrl: sanitizeUrl(formData.get("youtubeMusicUrl") as string),\n    defaultVolume: Number(formData.get("defaultVolume")) || 100,'
);

fs.writeFileSync('src/actions/settings.ts', content);
console.log('Updated settings action for defaultVolume');
