const fs = require('fs');

let content = fs.readFileSync('src/app/[domain]/members/MembersClient.tsx', 'utf-8');
const startMarker = '{/* Member Modal (Ultra Premium Visuals + Role Colors + Logo) */}';
const endMarker = '</AnimatePresence>';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker) + endMarker.length;

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found');
  process.exit(1);
}

const newModal = `{/* Member Modal (Ultra Premium Visuals + Role Colors + Centered Logo) */}
        <AnimatePresence>
          {selectedMember && (() => {
            const getRoleColor = (role) => {
              if (role === 'FOUNDER') return '#facc15';
              if (role === 'LEADER') return '#ef4444';
              if (role === 'SUPPORT') return '#ffb3d9';
              return '#ffffff';
            };
            const rColor = getRoleColor(selectedMember.role);
            return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 perspective-[1000px]">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 bg-[#020202]/70"
                onClick={() => setSelectedMember(null)}
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, rotateX: 20, y: 40 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 10, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-[380px] rounded-[32px] p-[1px] overflow-visible"
              >
                {/* Animated Gradient Border using wrapper */}
                <div className="absolute inset-0 rounded-[32px] opacity-70" style={{ backgroundImage: \`linear-gradient(to bottom right, \${rColor}, transparent, \${rColor}4D)\` }}></div>
                
                {/* Inner Card Container */}
                <div className="relative w-full h-full bg-[#050505]/95 backdrop-blur-3xl rounded-[31px] overflow-hidden flex flex-col shadow-[0_20px_100px_rgba(0,0,0,0.8)]">
                  
                  {/* Background Aurora / Glow Effects */}
                  <div className="absolute -top-[100px] -right-[100px] w-[250px] h-[250px] rounded-full blur-[90px]" style={{ backgroundColor: \`\${rColor}33\` }}></div>
                  <div className="absolute -bottom-[100px] -left-[100px] w-[200px] h-[200px] bg-[#1877F2]/10 rounded-full blur-[70px]"></div>
                  
                  {/* Top Bar (Gang & Close) */}
                  <div className="relative w-full pt-5 px-6 z-10 flex justify-center min-h-[60px]">
                    {/* Centered Logo/Badge */}
                    <div className="flex flex-col items-center justify-center pointer-events-none mt-2">
                      {logoUrl ? (
                        <>
                          <img src={logoUrl} alt="Gang Logo" className="w-14 h-14 object-contain drop-shadow-xl mb-2" />
                          <span className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">{pageTitle}</span>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                          <Shield className="w-3 h-3 text-white/50" />
                          <span className="text-[9px] font-black tracking-[0.2em] text-white/80 uppercase">{pageTitle}</span>
                        </div>
                      )}
                    </div>

                    {/* Close Button at Absolute Top Right */}
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="absolute top-5 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all hover:rotate-90 duration-300 z-20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col items-center px-8 pb-8 relative z-10 mt-2">
                    
                    {/* Avatar Showcase */}
                    <div className="relative mb-6 mt-2 group">
                      {/* Spinning outer ring */}
                      <div className="absolute -inset-[10px] border-[2px] border-dashed rounded-full animate-[spin_8s_linear_infinite]" style={{ borderColor: \`\${rColor}80\` }}></div>
                      {/* Glow behind avatar */}
                      <div className="absolute inset-0 blur-2xl rounded-full duration-500" style={{ backgroundColor: \`\${rColor}66\` }}></div>
                      
                      <div className="relative w-[110px] h-[110px] rounded-full p-[3px]" style={{ backgroundImage: \`linear-gradient(to bottom, \${rColor}, \${rColor}80, transparent)\` }}>
                        <img 
                          src={selectedMember.avatar} 
                          alt={selectedMember.name}
                          className="w-full h-full rounded-full object-cover bg-[#050505] border-4 border-[#050505]"
                        />
                      </div>
                      
                      {/* Status indicator */}
                      <div className="absolute bottom-1 right-3 w-4 h-4 bg-green-500 rounded-full border-[3px] border-[#050505] shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                    </div>

                    {/* Member Name & Role */}
                    <div className="text-center mb-6">
                      <h2 className="text-[28px] font-black uppercase tracking-tight text-transparent bg-clip-text mb-2 drop-shadow-md" style={{ backgroundImage: \`linear-gradient(to right, #ffffff, \${rColor})\` }}>
                        {selectedMember.name}
                      </h2>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ backgroundColor: \`\${rColor}1A\`, borderColor: \`\${rColor}4D\` }}>
                        <Crown className="w-3.5 h-3.5" style={{ color: rColor }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: rColor }}>
                          {selectedMember.role} {selectedMember.supportPosition ? \`- LV \${selectedMember.supportPosition}\` : ''}
                        </span>
                      </div>
                    </div>

                    {/* The Quote */}
                    <div className="relative w-full px-4 py-4 mb-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-center">
                      <div className="absolute top-0 left-4 -translate-y-1/2 text-2xl font-serif" style={{ color: \`\${rColor}4D\` }}>"</div>
                      <p className="text-[12px] font-medium text-white/50 italic leading-relaxed">
                        Loyalty is a two-way street. If I'm asking for it from you, then you're getting it from me.
                      </p>
                      <div className="absolute bottom-0 right-4 translate-y-1/2 text-2xl font-serif" style={{ color: \`\${rColor}4D\` }}>"</div>
                    </div>

                    {/* Information Grid */}
                    <div className="w-full grid grid-cols-2 gap-3 mb-8">
                      <div className="flex flex-col items-center justify-center py-3 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">JOINED</span>
                        <span className="text-[12px] font-bold text-white/80">
                          {selectedMember.createdAt ? new Date(selectedMember.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center py-3 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">STATUS</span>
                        <span className="text-[12px] font-bold text-green-400">ACTIVE</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {selectedMember.facebookUrl ? (
                      <a 
                        href={selectedMember.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full relative group overflow-hidden rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 transition-all hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 hover:shadow-[0_0_30px_rgba(24,119,242,0.3)]"
                      >
                        {/* Shine effect */}
                        <div className="absolute top-0 bottom-0 left-[-100%] w-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out" />
                        
                        <div className="flex items-center justify-center gap-3 py-4 text-[#1877F2] font-black uppercase tracking-[0.15em] text-[13px] relative z-10">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                          <span>Facebook</span>
                        </div>
                      </a>
                    ) : (
                      <div className="w-full py-4 text-center text-[11px] uppercase tracking-[0.2em] text-white/20 font-bold border border-white/5 rounded-2xl bg-white/[0.02]">
                        NO CONTACT LINKED
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
            );
          })()}
        </AnimatePresence>`;

content = content.substring(0, startIdx) + newModal + content.substring(endIdx);
fs.writeFileSync('src/app/[domain]/members/MembersClient.tsx', content);
console.log('Updated successfully');
