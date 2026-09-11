const fs = require('fs');

// 1. Update layout.tsx
let layoutContent = fs.readFileSync('src/app/[domain]/layout.tsx', 'utf-8');
layoutContent = layoutContent.replace(
  'youtubeUrl={gang.youtubeMusicUrl}',
  'youtubeUrl={gang.youtubeMusicUrl}\n            defaultVolume={gang.defaultVolume}'
);
fs.writeFileSync('src/app/[domain]/layout.tsx', layoutContent);

// 2. Update MusicWrapper.tsx
let wrapperContent = fs.readFileSync('src/app/[domain]/MusicWrapper.tsx', 'utf-8');
wrapperContent = wrapperContent.replace(
  'playerStyle?: string;\n}',
  'playerStyle?: string;\n  defaultVolume?: number;\n}'
);
wrapperContent = wrapperContent.replace(
  'export function MusicWrapper({ youtubeUrl, ytData, playerStyle = "classic" }: MusicWrapperProps) {',
  'export function MusicWrapper({ youtubeUrl, ytData, playerStyle = "classic", defaultVolume }: MusicWrapperProps) {'
);
wrapperContent = wrapperContent.replace(
  '<PremiumPlayer track={currentTrack} autoPlay={true} />',
  '<PremiumPlayer track={currentTrack} autoPlay={true} defaultVolume={defaultVolume} />'
);
wrapperContent = wrapperContent.replace(
  '<VinylPlayer track={currentTrack} initialExpanded={true} />',
  '<VinylPlayer track={currentTrack} initialExpanded={true} defaultVolume={defaultVolume} />'
);
wrapperContent = wrapperContent.replace(
  '<MiniPlayer track={currentTrack} autoPlay={true} />',
  '<MiniPlayer track={currentTrack} autoPlay={true} defaultVolume={defaultVolume} />'
);
fs.writeFileSync('src/app/[domain]/MusicWrapper.tsx', wrapperContent);

// Function to update players
function updatePlayer(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(
    'className?: string;\n}',
    'className?: string;\n  defaultVolume?: number;\n}'
  );
  content = content.replace(
    /export function (.*?)({.*?}): (.*?)Props\) {/,
    'export function $1($2, defaultVolume}: $3Props) {'
  );
  content = content.replace(
    'const [volume, setVolume] = useState(0.5);',
    'const [volume, setVolume] = useState(defaultVolume !== undefined ? defaultVolume / 100 : 0.5);'
  );
  content = content.replace(
    'const [volume, setVolume] = useState(50);', // PremiumPlayer might use 0-100 instead of 0-1
    'const [volume, setVolume] = useState(defaultVolume !== undefined ? defaultVolume : 50);'
  );
  fs.writeFileSync(filePath, content);
}

// Manually update each to be safe instead of regex guessing
