const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{\/\* Floating & Spinning Logo in 3D \*\/\}[\s\S]*?<Image[\s\S]*?sizes="220px"[\s\S]*?\/>\s*<\/motion\.div>/;

const newLogoCode = `{/* Spinning Logo in 3D (Left to Right ONLY) */}
              <motion.div
                className="relative w-[220px] h-[220px]"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Image 
                  src={settings.logoUrl} 
                  alt="Faction Logo" 
                  fill
                  priority
                  quality={100}
                  className="object-contain"
                  sizes="220px"
                />
              </motion.div>`;

if (regex.test(content)) {
  content = content.replace(regex, newLogoCode);
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Successfully stopped vertical bouncing');
} else {
  console.log('Regex did not match');
}
