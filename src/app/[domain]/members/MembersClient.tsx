"use client";

import { motion } from "framer-motion";
import { Shield, Crown, User, Search, Plus } from "lucide-react";
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

  const filteredMembers = initialMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const founders = filteredMembers.filter(m => m.role === "FOUNDER");
  const leaders = filteredMembers.filter(m => m.role === "LEADER");
  const members = filteredMembers.filter(m => m.role === "MEMBER");

  return (
    <div className={`fixed inset-0 bg-surface-muted text-text-primary selection:bg-text-secondary/30 font-sans ${theme || "theme-default"}`}>
      
      {/* Dynamic Background Media (Image or YouTube) */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/75 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 12v12M12 18h12' stroke='%23ffffff' stroke-width='2' fill='none' /%3E%3C/svg%3E")` 
        }}
      />

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
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
          className="flex justify-center mb-[54px] mt-[18px]"
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
        </motion.div>

        {/* Directory Sections */}
        <div className="space-y-[54px] max-w-5xl mx-auto">
          {founders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <MemberSection 
                title="FOUNDERS" 
                members={founders} 
                role="FOUNDER" 
                gridCols="grid-cols-1 md:grid-cols-2" 
                colorClass="text-[#facc15]" // Yellow
                borderClass="border-[#facc15]/20 bg-gradient-to-r from-surface-base to-[#facc15]/5" 
                isCentered={true}
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
    if (role === "FOUNDER") return <Crown className="w-[10px] h-[10px]" />;
    if (role === "LEADER") return <Shield className="w-[10px] h-[10px]" />;
    return <User className="w-[10px] h-[10px]" />;
  };

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-end gap-[9px] mb-[18px]">
        <h2 className="text-[22.5px] font-[900] tracking-[-0.5625px] uppercase text-text-inverse">{title}</h2>
        <span className="text-[12px] text-text-primary/30 font-[700] mb-[3px] tracking-normal">
          / {members.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Members Grid / Flex */}
      <div className={isCentered ? "flex flex-wrap justify-center gap-[18px]" : `grid ${gridCols} gap-[18px]`}>
        {members.map(member => (
          <div 
            key={member.id} 
            className={`flex items-center gap-[18px] p-[12px] border ${borderClass} rounded-[12px] transition-all hover:border-opacity-50 overflow-hidden ${
              isCentered ? "w-full md:w-[calc(50%-9px)]" : ""
            }`}
          >
            {/* Avatar */}
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-[45px] h-[45px] rounded-full object-cover border border-text-primary/10 grayscale hover:grayscale-0 transition-all shrink-0"
            />
            
            {/* Info */}
            <div className="flex flex-col justify-center min-w-0">
              <div className={`flex items-center gap-[6px] text-[9px] font-[700] uppercase tracking-[1.8px] mb-[3px] ${colorClass}`}>
                {getIcon()}
                {member.role}
              </div>
              <h3 className="text-[12px] font-[700] text-text-inverse tracking-normal leading-[15px] mb-[3px] truncate">{member.name}</h3>
              {member.facebookUrl && (
                <a 
                  href={member.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[9px] text-text-secondary font-[400] hover:underline tracking-[1.8px] uppercase truncate"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
