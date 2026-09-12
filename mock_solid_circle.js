const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="220px"[\s\S]*?\/>\s*<\/motion\.div>\s*<\/div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <div 
              className="relative w-[340px] h-[340px] mb-[40px] mt-[24px] flex items-center justify-center mx-auto"
              style={{ perspective: "1500px" }}
            >
              {/* Soft Ambient Core Glow */}
              <motion.div 
                className="absolute -inset-[40px] rounded-full pointer-events-none mix-blend-screen"
                style={{ 
                  background: "radial-gradient(circle, var(--gang-accent) 0%, transparent 65%)", 
                  opacity: 0.35 
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Solid 3D Rotating Disc */}
              <motion.div 
                className="absolute inset-[20px] rounded-full overflow-hidden"
                style={{ 
                  background: "linear-gradient(135deg, var(--gang-accent) 20%, transparent 80%)", 
                  opacity: 0.5,
                  boxShadow: "inset 0 0 40px var(--gang-accent)"
                }}
                animate={{ rotateX: [30, 390], rotateY: [-30, 330], rotateZ: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Spinning Radar Aura (2D Spin behind the 3D Logo) */}
              <motion.div 
                className="absolute inset-[30px] rounded-full pointer-events-none mix-blend-screen"
                style={{ 
                  background: "conic-gradient(from 0deg, transparent 0%, var(--gang-accent) 50%, transparent 100%)", 
                  opacity: 0.7,
                  filter: "blur(15px)"
                }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating & Spinning Logo in 3D */}
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
  console.log('Successfully changed to solid circle 3D');
} else {
  console.log('Regex did not match');
}
