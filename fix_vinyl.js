const fs = require('fs');
let content = fs.readFileSync('src/components/music-ui/VinylPlayer.tsx', 'utf-8');

content = content.replace(
  'initialExpanded?: boolean;\n}',
  'initialExpanded?: boolean;\n  defaultVolume?: number;\n}'
);

content = content.replace(
  'export function VinylPlayer({ track, initialExpanded = false }: VinylPlayerProps) {',
  'export function VinylPlayer({ track, initialExpanded = false, defaultVolume = 100 }: VinylPlayerProps) {'
);

fs.writeFileSync('src/components/music-ui/VinylPlayer.tsx', content);
console.log('Fixed VinylPlayer');
