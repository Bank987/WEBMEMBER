const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="220px"[\s\S]*?\/>\s*<\/motion\.div>\s*<\/div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <div 
              className="relative w-[340px] h-[340px] mb-[40px] mt-[24px] flex items-center justify-center mx-auto"
              style={{ perspective: "1500px" }}
            >
              {/* Background Ambient Glow */}
              <motion.div 
                className="absolute -inset-[40px] rounded-full pointer-events-none mix-blend-screen"
                style={{ 
                  background: "radial-gradient(circle, var(--gang-accent) 0%, transparent 65%)", 
                  opacity: 0.25 
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Flat 2D Spinning Circle (Radar Style) */}
              <motion.div 
                className="absolute inset-[20px] rounded-full mix-blend-screen"
                style={{ 
                  background: "conic-gradient(from 0deg, transparent 0%, var(--gang-accent) 50%, transparent 100%)", 
                  opacity: 0.7,
                  filter: "blur(4px)"
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Optional Thin 2D Ring for detail */}
              <motion.div 
                className="absolute inset-[35px] rounded-full border-[1px] border-solid"
                style={{ borderColor: "var(--gang-accent)", opacity: 0.4 }}
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* 3D Spinning Logo (Left to Right Only) */}
              <motion.div
                className="relative w-[220px] h-[220px]"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
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
  console.log('Successfully changed to 2D circle and left-right 3D logo');
} else {
  console.log('Regex did not match');
}
