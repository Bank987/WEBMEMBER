const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/GateClient.tsx', 'utf-8');

const newReturn = `  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden" 
      style={{
        backgroundColor: '#050505',
        fontFamily: settings.fontFamily ? \`"\${settings.fontFamily}", sans-serif\` : "inherit",
        cursor: settings.customCursor ? \`url(\${settings.customCursor}), auto\` : 'auto'
      }}
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: settings.backgroundImageUrl ? \`url(\${settings.backgroundImageUrl})\` : 'none',
          opacity: 0.4
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[10] px-8 max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 w-full mb-20 md:mb-0">
        
        {/* Left Side: Actions (Button, Social, Partners) */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start justify-center md:justify-start gap-[18px] w-full"
          >
            <div className={
              settings.buttonShape === 'rectangle' ? "w-[240px] h-[64px] sm:w-[320px] sm:h-[72px]" :
              settings.buttonShape === 'parallelogram' ? "w-[240px] h-[64px] sm:w-[320px] sm:h-[72px]" :
              settings.buttonShape === 'trapezoid' ? "w-[280px] h-[64px] sm:w-[340px] sm:h-[72px]" :
              "w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]"
            }>
              <NeonTypingButton 
                label={settings.buttonText} 
                loadingText={\`ACCESSING_\${settings.buttonText}...\`} 
                href="/members" 
                className="block w-full h-full"
                textClassName="text-[16px] text-center md:text-left"
                imageSrc={settings.buttonImage || undefined}
                shape={settings.buttonShape}
              />
            </div>

            {settings.partnersEnabled && settings.partners && settings.partners.length > 0 && (
              <>
                <div className="flex items-center justify-center md:justify-start w-full max-w-[400px] mt-[32px] opacity-60">
                  <span className="pr-[12px] text-[12px] font-[800] tracking-[0.3em] text-white/50 uppercase">
                    Partner
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                <div className="flex flex-row justify-center md:justify-start gap-[16px] mt-[16px] w-full max-w-[600px]">
                  {settings.partners.map((partner, idx) => (
                    <a href={partner.url} key={idx} className="w-full max-w-[180px] group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-[28px] flex flex-col items-center justify-center rounded-[20px] bg-[#0a0a0a]/50 border border-white/5 hover:border-white/10 hover:bg-[#1a1a1a]/60 transition-all duration-300 backdrop-blur-md group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      >
                        <span className="text-[16px] font-[900] text-[#a0a0a0] group-hover:text-white uppercase tracking-wide leading-none mb-[8px] transition-colors line-clamp-1">
                          {partner.name}
                        </span>
                        <span className="text-[11px] font-[800] text-[#666666] group-hover:text-[#888888] uppercase tracking-[0.2em] leading-none transition-colors">
                          Partner
                        </span>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </>
            )}

            {(settings.discordUrl || settings.facebookUrl) && (
            <div className="flex items-center justify-center md:justify-start gap-[18px] mt-[18px]">
              {settings.discordUrl && (
                <a href={settings.discordUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[#5865F2] hover:bg-[#5865F2] text-white/50 hover:text-white transition-all z-20 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-current" viewBox="0 0 127.14 96.36">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                </a>
              )}
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-[12px] rounded-full border border-white/10 hover:border-[#1877F2] hover:bg-[#1877F2] text-white/50 hover:text-white transition-all z-20 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-current" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          </motion.div>
        </div>

        {/* Right Side: Logo & Titles */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-1/2">
          {settings.logoUrl && (
            <div 
              className="relative w-[340px] h-[340px] mb-[40px] mt-[24px] flex items-center justify-center md:ml-auto md:mr-0 mx-auto"
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
              
              {/* Spinning Logo in 3D (Left to Right ONLY) */}
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
              </motion.div>
            </div>
          )}

          <div className="mt-8 mb-4 flex flex-col items-center md:items-end">
            <motion.h2 
              {...getAnimationProps(settings.entryAnimation, settings.logoUrl ? 1 : 0)}
               className="text-[color:var(--gang-accent)] font-[900] text-[22.5px] tracking-[-0.5625px] mb-[9px] uppercase"
            >
              {settings.pageTitle}
            </motion.h2>
            
            <motion.h1 
              {...getAnimationProps(settings.entryAnimation, settings.logoUrl ? 2 : 1)}
              className="text-[45px] font-[900] tracking-[-1.125px] leading-[45px] mb-[18px] uppercase inline-block"
              style={{ color: settings.textColor || '#ededed' }}
            >
              {settings.pageSubtitle}
            </motion.h1>
          </div>
        </div>

      </div>

      {/* Subtle Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-[8px] sm:text-[9px] tracking-[0.3em] font-medium uppercase" style={{ color: settings.textColor || '#ffffff' }}>
          LASTNAME.SITE BY. ganglist
        </p>
      </motion.div>
      </div>
    </div>
  );
}
`;

const splitContent = content.split('  return (');
if (splitContent.length > 1) {
  content = splitContent[0] + newReturn;
  fs.writeFileSync('src/app/[domain]/GateClient.tsx', content);
  console.log('Successfully replaced return block');
} else {
  console.log('Could not find return block');
}
