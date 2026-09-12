const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="150px"[\s\S]*?\/>\s*<\/motion\.div>\s*<\/div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <div 
              className="relative w-[340px] h-[340px] mb-[40px] mt-[24px] flex items-center justify-center mx-auto"
              style={{ perspective: "1500px" }}
            >
              {/* Soft Ambient Core Glow (Non-3D) */}
              <motion.div 
                className="absolute -inset-[40px] rounded-full pointer-events-none"
                style={{ 
                  background: "radial-gradient(circle, var(--gang-accent) 0%, transparent 65%)", 
                  opacity: 0.35 
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* 3D Holographic Outer Ring */}
              <motion.div 
                className="absolute inset-[10px] rounded-full border-[2px] border-solid"
                style={{ 
                  borderColor: "var(--gang-accent)", 
                  opacity: 0.5
                }}
                animate={{ rotateX: [20, 380], rotateY: [-20, 340], rotateZ: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* 3D Dashed Middle Ring */}
              <motion.div 
                className="absolute inset-[40px] rounded-full border-[3px] border-dashed"
                style={{ borderColor: "var(--gang-accent)", opacity: 0.6 }}
                animate={{ rotateX: [-40, -400], rotateY: [40, 400], rotateZ: [0, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* 3D Dotted Inner Ring */}
              <motion.div 
                className="absolute inset-[70px] rounded-full border-[4px] border-dotted"
                style={{ borderColor: "white", opacity: 0.3 }}
                animate={{ rotateX: [10, 370], rotateY: [10, 370], rotateZ: [0, 720] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Floating & Spinning Logo */}
              <motion.div
                className="relative w-[220px] h-[220px]"
                animate={{ 
                  rotateY: [0, 360],
                  y: [-12, 12, -12]
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
                  sizes="220px"
                />
              </motion.div>
            </div>
          )}`;

if (regex.test(content)) {
  content = content.replace(regex, newLogoCode);
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Successfully made 3D logo MASSIVE via regex');
} else {
  console.log('Regex did not match');
}
