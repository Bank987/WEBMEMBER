const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const regex = /\{settings\.logoUrl && \([\s\S]*?<Image[\s\S]*?sizes="220px"[\s\S]*?\/>\s*<\/motion\.div>\s*<\/div>\s*\)\}/;

const newLogoCode = `{settings.logoUrl && (
            <div 
              className="relative w-[340px] h-[340px] mb-[40px] mt-[24px] flex items-center justify-center mx-auto"
              style={{ perspective: "1500px" }}
            >
              {/* Fierce B&W Core Glow */}
              <motion.div 
                className="absolute -inset-[60px] rounded-full pointer-events-none mix-blend-screen"
                style={{ 
                  background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)", 
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Fierce Outer Ring (Sharp White) */}
              <motion.div 
                className="absolute inset-[10px] rounded-full border-[2px] border-solid"
                style={{ borderColor: "rgba(255,255,255,0.9)" }}
                animate={{ rotateX: [20, 380], rotateY: [-20, 340], rotateZ: [0, 360], scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Fierce Middle Ring (Darker/Translucent White) */}
              <motion.div 
                className="absolute inset-[35px] rounded-full border-[3px] border-dashed"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
                animate={{ rotateX: [-40, -400], rotateY: [40, 400], rotateZ: [0, -360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Fierce Inner Ring (Dotted Stark White) */}
              <motion.div 
                className="absolute inset-[60px] rounded-full border-[4px] border-dotted"
                style={{ borderColor: "#ffffff" }}
                animate={{ rotateX: [10, 370], rotateY: [10, 370], rotateZ: [0, 720] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Floating & Spinning Logo in 3D */}
              <motion.div
                className="relative w-[220px] h-[220px]"
                animate={{ 
                  rotateY: [0, 360],
                  y: [-12, 12, -12]
                }}
                transition={{ 
                  rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
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
  console.log('Successfully changed to fierce B&W rings');
} else {
  console.log('Regex did not match');
}
