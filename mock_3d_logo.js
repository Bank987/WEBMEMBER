const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="120px"[\s\S]*?\/>\s*<\/motion\.div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <motion.div 
              className="relative w-[180px] h-[180px] mb-[24px] flex items-center justify-center"
              style={{ perspective: "1000px" }}
              {...getAnimationProps(settings.entryAnimation, 0)}
            >
              {/* Core Glow */}
              <div className="absolute inset-0 bg-[color:var(--gang-accent)]/20 blur-[40px] rounded-full"></div>

              {/* 3D Holographic Rings */}
              <motion.div 
                className="absolute inset-[10px] rounded-full border-[2px] border-dashed"
                style={{ borderColor: "var(--gang-accent)", opacity: 0.6, transformStyle: "preserve-3d" }}
                animate={{ rotateX: [0, 360], rotateY: [0, 180], rotateZ: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-[25px] rounded-full border-[1px] border-solid shadow-[0_0_15px_var(--gang-accent)]"
                style={{ borderColor: "var(--gang-accent)", opacity: 0.4, transformStyle: "preserve-3d" }}
                animate={{ rotateX: [0, -360], rotateY: [0, 360], rotateZ: [0, -180] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-[5px] rounded-full border-[3px] border-dotted"
                style={{ borderColor: "white", opacity: 0.2, transformStyle: "preserve-3d" }}
                animate={{ rotateX: [0, 180], rotateY: [0, -360], rotateZ: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* The Logo - 3D Spinning Coin Effect */}
              <motion.div
                className="relative w-[110px] h-[110px] drop-shadow-[0_0_20px_var(--gang-accent)]"
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
                  sizes="110px"
                />
              </motion.div>
            </motion.div>
          )}`;

if (regex.test(content)) {
  content = content.replace(regex, newLogoCode);
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Successfully injected 3D logo via regex');
} else {
  console.log('Regex did not match');
}
