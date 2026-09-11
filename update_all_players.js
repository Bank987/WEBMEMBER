const fs = require('fs');

function replaceVolume(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Add prop to interface
  if (!content.includes('defaultVolume?: number;')) {
    content = content.replace(
      'className?: string;\n}',
      'className?: string;\n  defaultVolume?: number;\n}'
    );
  }

  // Add prop to component signature
  content = content.replace(
    /export function ([a-zA-Z]+Player)\({ (.*?), className = "" }: (.*?)Props\) {/,
    'export function $1({ $2, className = "", defaultVolume = 100 }: $3Props) {'
  );

  // Replace hardcoded 50 with defaultVolume
  content = content.replace(/setVolume\(50\)/g, 'setVolume(defaultVolume)');

  // For MiniPlayer which uses state
  if (content.includes('const [volume, setVolume] = useState(0.5);')) {
    content = content.replace('const [volume, setVolume] = useState(0.5);', 'const [volume, setVolume] = useState(defaultVolume / 100);');
  }

  fs.writeFileSync(filePath, content);
}

replaceVolume('src/components/music-ui/MiniPlayer.tsx');
replaceVolume('src/components/music-ui/PremiumPlayer.tsx');
replaceVolume('src/components/music-ui/VinylPlayer.tsx');

console.log('Updated players for defaultVolume');
