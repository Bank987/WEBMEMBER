const fs = require('fs');

// Fix db.ts GangDocument
let dbContent = fs.readFileSync('src/lib/db.ts', 'utf-8');
dbContent = dbContent.replace(
  'youtubeMusicUrl?: string;',
  'youtubeMusicUrl?: string;\n  defaultVolume?: number;'
);
fs.writeFileSync('src/lib/db.ts', dbContent);

// Fix MiniPlayer.tsx interface
let miniContent = fs.readFileSync('src/components/music-ui/MiniPlayer.tsx', 'utf-8');
if (!miniContent.includes('defaultVolume?: number;')) {
  miniContent = miniContent.replace(
    'className?: string;\n}',
    'className?: string;\n  defaultVolume?: number;\n}'
  );
  fs.writeFileSync('src/components/music-ui/MiniPlayer.tsx', miniContent);
}

console.log('Fixed typescript issues');
