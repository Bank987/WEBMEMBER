"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Crown, User, Search, Plus, Heart, X, BarChart2 } from "lucide-react";
import { useState } from "react";
import { Member, Role } from "@/lib/db";
import Link from "next/link";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersClient({ 
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
  const supportsLevel3 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition !== 2); // Default to 3
  const members = filteredMembers.filter(m => m.role === "MEMBER");

  return (
    <div className={`fixed inset-0 bg-surface-muted text-text-primary selection:bg-text-secondary/30 font-sans ${theme || "theme-default"}`}>
      
      {/* Dynamic Background Media (Image or YouTube) */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/75" />
        </div>
      )}

      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 12v12M12 18h12' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E")` 
        }}
      />

      <div className="absolute inset-0 z-[2] overflow-y-auto overflow-x-hidden custom-scrollbar">
      <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-6xl mx-auto px-[36px] py-[45px] pb-[72px] relative z-10"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="flex flex-col items-center justify-center mb-[45px] text-center mt-[18px]"
      >
        <h1 className="text-[45px] font-[900] tracking-[-1.125px] uppercase text-text-inverse mb-[9px]">
          {pageTitle}
        </h1>
        <div className="flex items-center gap-[18px] text-text-primary/40 text-[10.5px] tracking-[3.15px] uppercase">
          <span className="w-[45px] h-[1px] bg-text-primary/20"></span>
          {pageSubtitle}
          <span className="w-[45px] h-[1px] bg-text-primary/20"></span>
        </div>
      </motion.div>

      {/* Search Bar - Centered with Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex justify-center items-center gap-3 mb-[54px] mt-[18px] px-4"
      >
        <div className="relative group w-full max-w-[300px] focus-within:max-w-[500px] transition-all duration-500 ease-out">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-text-secondary/0 group-focus-within:bg-text-secondary/20 rounded-[6px] blur-md transition-all duration-500"></div>
          
          <div className="absolute inset-y-0 left-0 pl-[15px] flex items-center pointer-events-none z-10">
            <Search className="w-[14px] h-[14px] text-text-primary/40 group-focus-within:text-text-secondary group-focus-within:rotate-90 transition-all duration-500" />
          </div>
          <input 
            type="text" 
            placeholder="SEARCH MEMBERS..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative z-10 w-full bg-surface-base border border-text-primary/10 group-focus-within:border-text-secondary/50 group-focus-within:bg-[#050505] rounded-[6px] py-[12px] pl-[42px] pr-[18px] text-[10.5px] text-text-inverse placeholder-text-primary/40 focus:outline-none transition-all duration-500 uppercase tracking-[1.8px] shadow-lg"
          />
          
          {/* Scanning line animation */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-text-secondary group-focus-within:w-full transition-all duration-700 ease-out z-20"></div>
        </div>
          <AnimatePresence>
            {!showStats && (
              <motion.button
                key="show-stats-btn"
                initial={{ opacity: 0, scale: 0.5, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={() => setShowStats(true)}
                className="group flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/10 transition-all duration-300 shrink-0 shadow-sm ml-2"
                title="Show Stats"
              >
                <BarChart2 className="w-[14px] h-[14px] text-text-primary/40 group-hover:text-text-secondary transition-colors duration-300 shrink-0" />
              </motion.button>
            )}
          </AnimatePresence>
      </motion.div>

      
        {/* Stats Bar - Expandable/Collapsible (Interactive) */}
        <div className="flex justify-center mb-[54px] -mt-[20px] px-4">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div 
                key="stats-expanded"
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="flex flex-wrap justify-center items-center gap-2.5 relative z-10 origin-top overflow-hidden"
              >
                {totalFounders > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'FOUNDER' ? null : 'FOUNDER')}
                    className={`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer ${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/20 border border-[#facc15]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} ${activeRoleFilter && activeRoleFilter !== 'FOUNDER' ? 'opacity-40 grayscale' : 'opacity-100'}`}
                  >
                    <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 ${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/30 border border-[#facc15]/50 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'bg-[#facc15]/10 border border-[#facc15]/20 group-hover:bg-[#facc15]/20 group-hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]'}`}>
                      <Crown className={`w-3.5 h-3.5 ${activeRoleFilter === 'FOUNDER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#facc15]'}`} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'FOUNDER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>FOUNDER</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'FOUNDER' ? 'bg-[#facc15]/30 border border-[#facc15]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>
                      {totalFounders}
                    </div>
                  </div>
                )}

                {totalLeaders > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'LEADER' ? null : 'LEADER')}
                    className={`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer ${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/20 border border-[#ef4444]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} ${activeRoleFilter && activeRoleFilter !== 'LEADER' ? 'opacity-40 grayscale' : 'opacity-100'}`}
                  >
                    <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 ${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/30 border border-[#ef4444]/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:bg-[#ef4444]/20 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]'}`}>
                      <Shield className={`w-3.5 h-3.5 ${activeRoleFilter === 'LEADER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#ef4444]'}`} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'LEADER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>LEADER</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'LEADER' ? 'bg-[#ef4444]/30 border border-[#ef4444]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>
                      {totalLeaders}
                    </div>
                  </div>
                )}

                {totalSupports > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'SUPPORT' ? null : 'SUPPORT')}
                    className={`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer ${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/20 border border-[#ffb3d9]/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} ${activeRoleFilter && activeRoleFilter !== 'SUPPORT' ? 'opacity-40 grayscale' : 'opacity-100'}`}
                  >
                    <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 ${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/30 border border-[#ffb3d9]/50 shadow-[0_0_15px_rgba(255,179,217,0.4)]' : 'bg-[#ffb3d9]/10 border border-[#ffb3d9]/20 group-hover:bg-[#ffb3d9]/20 group-hover:shadow-[0_0_10px_rgba(255,179,217,0.2)]'}`}>
                      <Heart className={`w-3.5 h-3.5 ${activeRoleFilter === 'SUPPORT' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#ffb3d9]'}`} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'SUPPORT' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>SUPPORT</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'SUPPORT' ? 'bg-[#ffb3d9]/30 border border-[#ffb3d9]/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>
                      {totalSupports}
                    </div>
                  </div>
                )}

                {totalMembers > 0 && (
                  <div 
                    onClick={() => setActiveRoleFilter(activeRoleFilter === 'MEMBER' ? null : 'MEMBER')}
                    className={`group flex items-center gap-2.5 px-1.5 py-1.5 pr-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer ${activeRoleFilter === 'MEMBER' ? 'bg-white/20 border border-white/50 scale-105' : 'bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/10'} ${activeRoleFilter && activeRoleFilter !== 'MEMBER' ? 'opacity-40 grayscale' : 'opacity-100'}`}
                  >
                    <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all duration-300 ${activeRoleFilter === 'MEMBER' ? 'bg-white/30 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]'}`}>
                      <User className={`w-3.5 h-3.5 ${activeRoleFilter === 'MEMBER' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-white/50'}`} />
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${activeRoleFilter === 'MEMBER' ? 'text-white' : 'text-white/60 group-hover:text-white/90'}`}>MEMBER</span>
                    <div className={`flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10.5px] font-black ${activeRoleFilter === 'MEMBER' ? 'bg-white/30 border border-white/30 text-white' : 'bg-white/5 border border-white/5 text-white/90'}`}>
                      {totalMembers}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <button 
                  onClick={() => setShowStats(false)}
                  className="group flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-xl border border-white/5 hover:border-white/20 shadow-lg transition-all duration-300 ml-1 hover:scale-110 active:scale-95 shrink-0"
                  title="Hide Stats"
                >
                  <X className="w-3.5 h-3.5 text-white/30 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Directory Sections */}
      <div className="space-y-[54px] max-w-5xl mx-auto">
        {founders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <MemberSection 
              title="FOUNDERS" members={founders} role="FOUNDER" gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              colorClass="text-[#facc15]" // Yellow
              borderClass="border-[#facc15]/20 bg-gradient-to-r from-surface-base to-[#facc15]/5" 
              isCentered={true}
            />
          </motion.div>
        )}
        
        {supportsLevel2.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          >
            <MemberSection 
              title="SUPPORTS" 
              members={supportsLevel2} 
              role="SUPPORT" 
              gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              colorClass="text-[#ffb3d9]" // Light Pink
              borderClass="border-[#ffb3d9]/20 bg-gradient-to-r from-surface-base to-[#ffb3d9]/5" 
            />
          </motion.div>
        )}

        {leaders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <MemberSection 
              title="LEADERS" 
              members={leaders} 
              role="LEADER" 
              gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              colorClass="text-[#ef4444]" // Red
              borderClass="border-[#ef4444]/20 bg-gradient-to-r from-surface-base to-[#ef4444]/5" 
            />
          </motion.div>
        )}

        {supportsLevel3.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          >
            <MemberSection 
              title="SUPPORTS" 
              members={supportsLevel3} 
              role="SUPPORT" 
              gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              colorClass="text-[#ffb3d9]" // Light Pink
              borderClass="border-[#ffb3d9]/20 bg-gradient-to-r from-surface-base to-[#ffb3d9]/5" 
            />
          </motion.div>
        )}


          {members.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <MemberSection 
                title="MEMBERS" 
                members={members} 
                role="MEMBER" 
                gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                colorClass="text-text-primary/70" 
                borderClass="border-text-primary/10 bg-surface-base" 
              />
            </motion.div>
          )}
          
          {filteredMembers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-[36px] text-text-primary/50"
            >
              <p className="text-[12px] uppercase">No members found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </div>
      </motion.main>
      </div>
    </div>
  );
}

function MemberSection({ 
  title, 
  members, 
  role, 
  gridCols, 
  colorClass, 
  borderClass,
  isCentered = false 
}: { 
  title: string, 
  members: Member[], 
  role: Role, 
  gridCols: string, 
  colorClass: string, 
  borderClass: string,
  isCentered?: boolean
}) {
  const getIcon = () => {
    if (role === "FOUNDER") return <Crown className="w-[12px] h-[12px]" />;
    if (role === "LEADER") return <Shield className="w-[12px] h-[12px]" />;
    if (role === "SUPPORT") return <Heart className="w-[12px] h-[12px]" />;
    return <User className="w-[12px] h-[12px]" />;
  };

  const minWidthClass = gridCols.includes("lg:grid-cols-3") 
    ? "min-w-full md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]" 
    : "min-w-full md:min-w-[calc(50%-10px)]";

  return (
    <section>
      <div className="flex items-end gap-[12px] mb-[24px]">
        <h2 className="text-[28px] font-[900] tracking-[-1px] uppercase text-text-inverse">{title}</h2>
        <span className="text-[14px] text-text-primary/40 font-[800] mb-[5px] tracking-widest">/ {members.length.toString().padStart(2, '0')}</span>
      </div>

      <div className={`flex flex-wrap gap-[18px] ${isCentered ? "justify-center" : "justify-start"}`}>
        {members.map(member => (
          <div 
            key={member.id} 
            className={`group relative flex items-center gap-[12px] p-[12px] border ${borderClass} hover:border-opacity-50 rounded-[12px] transition-all h-[70px] w-max max-w-full flex-shrink-0 ${minWidthClass}`}
          >
            <div className="relative shrink-0">
              <img 
                src={member.avatar} 
                alt={member.name}
                className="w-[45px] h-[45px] rounded-full object-cover border border-text-primary/10 grayscale hover:grayscale-0 transition-all shrink-0"
              />
            </div>
            
            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className={`flex items-center gap-[6px] text-[9px] font-[900] uppercase tracking-[2px] mb-[4px] ${colorClass}`}>
                {getIcon()}
                {member.role}
              </div>
              <h3 className="text-[12px] font-[700] text-text-inverse tracking-normal leading-[15px] mb-[3px] whitespace-nowrap">{member.name}</h3>
              {member.facebookUrl && (
                <a 
                  href={member.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1877F2]/60 hover:text-[#1877F2] text-[9px] font-[800] uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  FACEBOOK
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




