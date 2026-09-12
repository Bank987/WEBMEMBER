const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const oldGlow = `{/* Intense Core Glow matching the Theme */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-[50px] mix-blend-screen"
                style={{ backgroundColor: "var(--gang-accent)", opacity: 0.4 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />`;

const newGlow = `{/* Intense Core Glow matching the Theme */}
              <motion.div 
                className="absolute -inset-[50px] rounded-full mix-blend-screen pointer-events-none"
                style={{ background: "radial-gradient(circle, var(--gang-accent) 0%, transparent 60%)", opacity: 0.3 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />`;

if (content.includes(oldGlow)) {
  content = content.replace(oldGlow, newGlow);
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Fixed glowing box');
} else {
  // Try regex if whitespace is weird
  const regex = /\{\/\* Intense Core Glow matching the Theme \*\/\}[\s\S]*?ease: "easeInOut" \}\}\s*\/>/;
  if (regex.test(content)) {
    content = content.replace(regex, newGlow);
    fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
    console.log('Fixed glowing box via regex');
  } else {
    console.log('Could not find glow box');
  }
}
