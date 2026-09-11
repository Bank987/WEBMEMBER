const fs = require('fs');
let miniContent = fs.readFileSync('src/components/music-ui/MiniPlayer.tsx', 'utf-8');

miniContent = miniContent.replace(
  'autoPlay?: boolean;\n  className?: string;\n}',
  'autoPlay?: boolean;\n  className?: string;\n  defaultVolume?: number;\n}'
);

fs.writeFileSync('src/components/music-ui/MiniPlayer.tsx', miniContent);
console.log('Fixed MiniPlayer interface');
