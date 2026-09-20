"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Crown, User, Search, Heart, X, BarChart2 } from "lucide-react";
import { useState } from "react";
import { Member, Role } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersTemplateCards({ 
  initialMembers, 
  pageTitle, 
  pageSubtitle,
  theme,
  backgroundImageUrl
}: { 
  initialMembers: Member[], 
  pageTitle: string, 
  pageSubtitle: string,
  theme?: string,
  backgroundImageUrl?: string
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);

  const filteredMembers = initialMembers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRoleFilter ? m.role === activeRoleFilter : true;
    return matchesSearch && matchesRole;
  });

  const totalFounders = initialMembers.filter(m => m.role === "FOUNDER").length;
  const totalLeaders = initialMembers.filter(m => m.role === "LEADER").length;
  const totalSupports = initialMembers.filter(m => m.role === "SUPPORT").length;
  const totalMembers = initialMembers.filter(m => m.role === "MEMBER").length;

  const founders = filteredMembers.filter(m => m.role === "FOUNDER");
  const supportsLevel2 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition === 2);
  const leaders = filteredMembers.filter(m => m.role === "LEADER");
  const supportsLevel3 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition !== 2);
  const members = filteredMembers.filter(m => m.role === "MEMBER");

  return (
    <div className={`fixed inset-0 bg-surface-muted text-text-primary selection:bg-text-secondary/30 font-sans ${theme || "theme-default"} overflow-hidden`}>
      {backgroundImageUrl && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/75" />
        </div>
      )}

      {/* Cross Pattern from Default Template */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 12v12M12 18h12' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E")` 
        }} 
      />

      <div className="absolute inset-0 z-[2] overflow-y-auto overflow-x-hidden custom-scrollbar">
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-6xl mx-auto px-[36px] py-[45px] pb-[72px] relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="flex flex-col items-center justify-center mb-[45px] text-center mt-[18px]">
          <h1 className="text-[45px] font-[900] tracking-[-1.125px] uppercase text-text-inverse mb-[9px]">{pageTitle}</h1>
          <div className="flex items-center gap-[18px] text-text-primary/40 text-[10.5px] tracking-[3.15px] uppercase">
            <span className="w-[45px] h-[1px] bg-text-primary/20"></span>{pageSubtitle}<span className="w-[45px] h-[1px] bg-text-primary/20"></span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="flex justify-center items-center gap-3 mb-[54px] mt-[18px] px-4">
          <div className="relative group w-full max-w-[300px] focus-within:max-w-[500px] transition-all duration-500 ease-out z-20">
            <div className="absolute inset-0 bg-text-secondary/0 group-focus-within:bg-text-secondary/20 rounded-full blur-xl transition-all duration-500 -z-10" />
            <div className="absolute inset-y-0 left-0 pl-[15px] flex items-center pointer-events-none z-10">
              <Search className="w-[14px] h-[14px] text-text-primary/40 group-focus-within:text-text-secondary transition-colors duration-300" />
            </div>
            <input type="text" placeholder="SEARCH MEMBERS..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="relative z-10 w-full bg-surface-base border border-text-primary/10 group-focus-within:border-text-secondary/50 text-text-inverse text-[10.5px] font-[700] rounded-full py-[12px] pl-[39px] pr-[15px] outline-none transition-all duration-300 placeholder:text-text-primary/30 tracking-[1.8px] shadow-lg focus:shadow-text-secondary/20 uppercase" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-text-secondary group-focus-within:w-1/2 transition-all duration-500 ease-out z-20" />
          </div>
          <AnimatePresence>
            {!showStats && (
              <motion.button key="show-stats-btn" initial={{ opacity: 0, scale: 0.5, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: -10 }} transition={{ duration: 0.3, ease: "easeInOut" }} onClick={() => setShowStats(true)} className="group flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md border border-white/5 hover:border-white/10 shadow-lg transition-all duration-300 shrink-0" title="Show Stats">
                <BarChart2 className="w-[14px] h-[14px] text-text-primary/40 group-hover:text-text-secondary transition-colors duration-300" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mb-[54px] -mt-[20px] px-4">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div key="stats-expanded" initial={{ opacity: 0, height: 0, scale: 0.9 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0, scale: 0.8, filter: "blur(10px)" }} transition={{ duration: 0.5, type: "spring", bounce: 0.3 }} className="flex flex-wrap justify-center items-center gap-2.5 relative z-10 origin-top overflow-hidden p-2 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5">
                {totalFounders > 0 && (
                  <div onClick={() => setActiveRoleFilter(activeRoleFilter === 'FOUNDER' ? null : 'FOUNDER')} className={`group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/20 border-[#facc15]/50 shadow-[#facc15]/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-[#facc15]/30'}`}>
                    <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#facc15]/20 text-[#facc15]">
                      <Crown className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'FOUNDER' ? 'text-[#facc15]' : 'text-white/60 group-hover:text-white/90'}`}>FOUNDERS</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15] text-black' : 'bg-white/5 border border-white/5 text-white/90'}`}>{totalFounders}</div>
                  </div>
                )}
                {totalLeaders > 0 && (
                  <div onClick={() => setActiveRoleFilter(activeRoleFilter === 'LEADER' ? null : 'LEADER')} className={`group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/20 border-[#ef4444]/50 shadow-[#ef4444]/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-[#ef4444]/30'}`}>
                    <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#ef4444]/20 text-[#ef4444]"><Shield className="w-3.5 h-3.5" /></div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'LEADER' ? 'text-[#ef4444]' : 'text-white/60 group-hover:text-white/90'}`}>LEADERS</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444] text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>{totalLeaders}</div>
                  </div>
                )}
                {totalSupports > 0 && (
                  <div onClick={() => setActiveRoleFilter(activeRoleFilter === 'SUPPORT' ? null : 'SUPPORT')} className={`group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/20 border-[#ffb3d9]/50 shadow-[#ffb3d9]/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-[#ffb3d9]/30'}`}>
                    <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#ffb3d9]/20 text-[#ffb3d9]"><Heart className="w-3.5 h-3.5" /></div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'SUPPORT' ? 'text-[#ffb3d9]' : 'text-white/60 group-hover:text-white/90'}`}>SUPPORTS</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9] text-black' : 'bg-white/5 border border-white/5 text-white/90'}`}>{totalSupports}</div>
                  </div>
                )}
                {totalMembers > 0 && (
                  <div onClick={() => setActiveRoleFilter(activeRoleFilter === 'MEMBER' ? null : 'MEMBER')} className={`group flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${activeRoleFilter === 'MEMBER' ? 'bg-white/20 border-white/40 shadow-white/10' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/20'}`}>
                    <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-white/10"><User className={`w-3.5 h-3.5 ${activeRoleFilter === 'MEMBER' ? 'text-white' : 'text-white/50'}`} /></div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'MEMBER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>MEMBER</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'MEMBER' ? 'bg-white/30 border border-white/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>{totalMembers}</div>
                  </div>
                )}
                <button onClick={() => setShowStats(false)} className="group flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-xl border border-white/5 hover:border-white/20 shadow-lg transition-all duration-300 ml-1 hover:scale-110 active:scale-95 shrink-0"><X className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors" /></button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-[54px] max-w-5xl mx-auto">
          {founders.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}>
              <MemberSection title="FOUNDERS" members={founders} role="FOUNDER" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" colorClass="text-[#facc15]" borderClass="border-[#facc15]/20 bg-gradient-to-r from-surface-base to-[#facc15]/5" isCentered={true} />
            </motion.div>
          )}
          {supportsLevel2.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}>
              <MemberSection title="SUPPORTS" members={supportsLevel2} role="SUPPORT" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" colorClass="text-[#ffb3d9]" borderClass="border-[#ffb3d9]/20 bg-gradient-to-r from-surface-base to-[#ffb3d9]/5" />
            </motion.div>
          )}
          {leaders.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}>
              <MemberSection title="LEADERS" members={leaders} role="LEADER" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" colorClass="text-[#ef4444]" borderClass="border-[#ef4444]/20 bg-gradient-to-r from-surface-base to-[#ef4444]/5" />
            </motion.div>
          )}
          {supportsLevel3.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}>
              <MemberSection title="SUPPORTS" members={supportsLevel3} role="SUPPORT" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" colorClass="text-[#ffb3d9]" borderClass="border-[#ffb3d9]/20 bg-gradient-to-r from-surface-base to-[#ffb3d9]/5" />
            </motion.div>
          )}
          {members.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>
              <MemberSection title="MEMBERS" members={members} role="MEMBER" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" colorClass="text-text-primary/70" borderClass="border-text-primary/10 bg-surface-base" />
            </motion.div>
          )}
          {filteredMembers.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center py-[36px] text-text-primary/50">
              <p className="text-[12px] uppercase">No members found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </div>
      </motion.main>
      </div>
    </div>
  );
}

function MemberSection({ title, members, role, gridCols, colorClass, borderClass, isCentered = false }: { title: string, members: Member[], role: Role, gridCols: string, colorClass: string, borderClass: string, isCentered?: boolean }) {
  const getIcon = () => {
    if (role === "FOUNDER") return <Crown className="w-[12px] h-[12px]" />;
    if (role === "LEADER") return <Shield className="w-[12px] h-[12px]" />;
    if (role === "SUPPORT") return <Heart className="w-[12px] h-[12px]" />;
    return <User className="w-[12px] h-[12px]" />;
  };

  const getGlow = () => {
    if (role === "FOUNDER") return "bg-yellow-500/20";
    if (role === "LEADER") return "bg-red-500/20";
    if (role === "SUPPORT") return "bg-pink-500/20";
    return "bg-white/20";
  };

  const minWidthClass = gridCols.includes("lg:grid-cols-3") 
    ? "min-w-full md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]" 
    : "min-w-full md:min-w-[calc(50%-10px)]";

  return (
    <section>
      <div className="flex items-end gap-[12px] mb-[24px]">
        <h2 className="text-[28px] font-[900] tracking-[-1px] uppercase text-white drop-shadow-md">{title}</h2>
        <span className="text-[14px] text-white/40 font-[800] mb-[5px] tracking-widest">/ {members.length.toString().padStart(2, '0')}</span>
      </div>

      <div className={`flex flex-wrap gap-[20px] ${isCentered ? "justify-center" : "justify-start"}`}>
        {members.map(member => (
          <motion.div key={member.id} whileHover={{ y: -6, scale: 1.03 }} className={`group relative flex items-center gap-[20px] p-[20px] rounded-[24px] overflow-hidden text-left bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-white/[0.1] hover:to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-max max-w-full flex-shrink-0 ${minWidthClass} ${isCentered ? "max-w-sm" : ""}`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out z-10" />
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 ${getGlow()} blur-[50px] rounded-full mix-blend-screen`} />
            </div>
            
            <div className="relative z-20 shrink-0">
              <div className="absolute inset-0 bg-white/20 blur-md rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={member.avatar} alt={member.name} className="w-[60px] h-[60px] rounded-full object-cover border-[3px] border-white/10 group-hover:border-white/50 transition-all duration-500 shadow-lg relative z-10" />
            </div>
            
            <div className="flex flex-col justify-center min-w-0 z-20 flex-1">
              <div className={`flex items-center gap-[8px] text-[11px] font-[900] uppercase tracking-[2.5px] mb-[6px] ${colorClass} drop-shadow-sm`}>{getIcon()}{member.role}</div>
              <h3 className="text-[16px] font-[800] text-white/90 tracking-wide leading-tight whitespace-nowrap group-hover:text-white transition-colors drop-shadow-md">{member.name}</h3>
            </div>
            
            {member.facebookUrl && (
              <a 
                href={member.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-20 shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-300 border border-[#1877F2]/30 hover:border-[#1877F2] shadow-lg hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] hover:scale-110 active:scale-95 ml-2"
                title="Facebook Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

