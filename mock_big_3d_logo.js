const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="110px"[\s\S]*?\/>\s*<\/motion\.div>\s*<\/motion\.div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <motion.div 
              className="relative w-[240px] h-[240px] mb-[32px] mt-[20px] flex items-center justify-center"
              style={{ perspective: "1200px" }}
              {...getAnimationProps(settings.entryAnimation, 0)}
            >
              {/* Intense Core Glow matching the Theme */}
              <motion.div 
                className="absolute inset-0 rounded-full blur-[50px] mix-blend-screen"
                style={{ backgroundColor: "var(--gang-accent)", opacity: 0.4 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* 3D Holographic Outer Ring - Glowing */}
              <motion.div 
                className="absolute inset-[10px] rounded-full border-[2px] border-solid"
                style={{ 
                  borderColor: "var(--gang-accent)", 
                  boxShadow: "0 0 20px var(--gang-accent), inset 0 0 20px var(--gang-accent)",
                  opacity: 0.8, 
                  transformStyle: "preserve-3d" 
                }}
                animate={{ rotateX: [20, 380], rotateY: [-20, 340], rotateZ: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* 3D Dashed Middle Ring */}
              <motion.div 
                className="absolute inset-[30px] rounded-full border-[3px] border-dashed"
                style={{ borderColor: "var(--gang-accent)", opacity: 0.7, transformStyle: "preserve-3d" }}
                animate={{ rotateX: [-40, -400], rotateY: [40, 400], rotateZ: [0, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* 3D Dotted Inner Ring */}
              <motion.div 
                className="absolute inset-[50px] rounded-full border-[4px] border-dotted"
                style={{ borderColor: "white", opacity: 0.3, transformStyle: "preserve-3d" }}
                animate={{ rotateX: [10, 370], rotateY: [10, 370], rotateZ: [0, 720] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Floating & Spinning Logo */}
              <motion.div
                className="relative w-[150px] h-[150px]"
                style={{ 
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 0 25px var(--gang-accent))"
                }}
                animate={{ 
                  rotateY: [0, 360],
                  y: [-8, 8, -8]
                }}
                transition={{ 
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Image 
                  src={settings.logoUrl} 
                  alt="Faction Logo" 
                  fill
                  priority
                  quality={100}
                  className="object-contain"
                  sizes="150px"
                />
              </motion.div>
            </motion.div>
          )}`;

if (regex.test(content)) {
  content = content.replace(regex, newLogoCode);
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Successfully injected BIGGER 3D logo via regex');
} else {
  console.log('Regex did not match');
}
