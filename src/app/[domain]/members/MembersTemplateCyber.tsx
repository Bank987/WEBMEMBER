"use client";

import { motion } from "framer-motion";
import { Shield, Crown, User, Search, Link as LinkIcon, Zap } from "lucide-react";
import { useState } from "react";
import { Member } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersTemplateCyber({ 
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0, x: -20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <div className={`fixed inset-0 bg-[#050505] text-white selection:bg-cyan-500/50 font-mono ${theme || "theme-default"} overflow-y-auto overflow-x-hidden`}>
      
      {/* Background */}
      {backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-40 mix-blend-luminosity">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        </div>
      )}

      {/* Cyber Grid Pattern */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(3)',
          transformOrigin: 'top center'
        }} 
      />

      {/* Scanline Effect */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]" />

      <main className="relative z-10 min-h-screen px-4 py-12 md:px-8 max-w-7xl mx-auto flex flex-col">
        
        {/* Glitch Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-start border-l-4 border-cyan-500 pl-6 relative"
        >
          {/* Decorative tech elements */}
          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-cyan-400" />
          <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-cyan-400" />
          <p className="text-cyan-400 text-xs tracking-[0.3em] font-bold mb-2 flex items-center gap-2">
            <Zap size={12} className="animate-pulse" /> SYSTEM.DIRECTORY_ACCESS
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            {pageTitle}
          </h1>
          <p className="text-gray-400 text-sm mt-2 tracking-widest uppercase">
            {pageSubtitle || "PERSONNEL DATABASE V2.0"}
          </p>
          
          <div className="mt-8 w-full max-w-md relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-none" />
            <div className="relative flex items-center bg-[#111] border border-cyan-500/50 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)]">
              <div className="p-3 bg-cyan-500/20 text-cyan-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="INPUT QUERY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none pl-4 pr-6 py-3 text-sm text-cyan-50 placeholder-cyan-700/50 focus:outline-none uppercase font-bold tracking-wider"
              />
            </div>
          </div>
        </motion.div>

        <div className="space-y-16 flex-1 pb-32">
          {founders.length > 0 && (
            <CyberSection 
              title="SYS.ADMINS" 
              subtitle="[FOUNDERS]"
              members={founders} 
              role="FOUNDER" 
              color="text-yellow-400"
              borderColor="border-yellow-400/50"
              bgGlow="bg-yellow-400/10"
              icon={<Crown className="w-5 h-5" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              large
            />
          )}

          {leaders.length > 0 && (
            <CyberSection 
              title="COMMANDERS" 
              subtitle="[LEADERS]"
              members={leaders} 
              role="LEADER" 
              color="text-cyan-400"
              borderColor="border-cyan-400/50"
              bgGlow="bg-cyan-400/10"
              icon={<Shield className="w-5 h-5" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
          
          {members.length > 0 && (
            <CyberSection 
              title="OPERATIVES" 
              subtitle="[MEMBERS]"
              members={members} 
              role="MEMBER" 
              color="text-gray-300"
              borderColor="border-gray-500/50"
              bgGlow="bg-gray-500/10"
              icon={<User className="w-5 h-5" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {filteredMembers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-cyan-700 border border-cyan-900/50 bg-cyan-900/10 border-dashed">
              <p className="tracking-[0.2em] animate-pulse">404 // ENTITY_NOT_FOUND</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CyberSection({ 
  title, 
  subtitle,
  members, 
  role, 
  color,
  borderColor,
  bgGlow,
  icon,
  containerVariants,
  itemVariants,
  large = false
}: { 
  title: string, 
  subtitle: string,
  members: Member[], 
  role: string, 
  color: string,
  borderColor: string,
  bgGlow: string,
  icon: React.ReactNode,
  containerVariants: any,
  itemVariants: any,
  large?: boolean
}) {
  return (
    <section>
      <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-2">
        <h2 className={`text-2xl font-black tracking-widest ${color} uppercase`}>
          {title}
        </h2>
        <span className="text-gray-500 text-xs font-bold tracking-widest mb-1">{subtitle}</span>
        <div className="flex-1" />
        <div className={`p-1 ${bgGlow} ${color} rounded-sm`}>
          {icon}
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-6 ${large ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
      >
        {members.map(member => (
          <motion.div 
            key={member.id} 
            variants={itemVariants}
            className={`group relative bg-[#0a0a0a] border-l-2 ${borderColor} p-1 [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)] transition-all hover:translate-x-2`}
          >
            {/* The inner card background */}
            <div className={`relative h-full bg-[#111] p-4 flex ${large ? 'flex-row items-center gap-6' : 'flex-col items-start gap-4'} [clip-path:polygon(0_0,100%_0,100%_calc(100%-18px),calc(100%-18px)_100%,0_100%)] overflow-hidden group-hover:bg-[#151515] transition-colors`}>
              
              {/* Decorative Background Tech Lines */}
              <div className="absolute right-0 top-0 w-32 h-32 opacity-10 pointer-events-none"
                   style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, currentColor 1px, transparent 1px)', backgroundSize: '8px 8px', color: 'inherit' }} />
              
              {/* Avatar Container */}
              <div className={`relative shrink-0 ${large ? 'w-32 h-32' : 'w-16 h-16'}`}>
                <div className={`absolute inset-0 border border-dashed ${borderColor} animate-[spin_10s_linear_infinite] rounded-full`} />
                <div className={`absolute inset-1 border ${borderColor} rounded-full`} />
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className={`absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500`}
                />
                {/* Tech ID Badge */}
                <div className={`absolute -bottom-2 -right-2 ${bgGlow} ${color} text-[9px] font-black px-1 border ${borderColor} backdrop-blur-sm uppercase`}>
                  ID:{member.id.substring(0, 4)}
                </div>
              </div>

              {/* Info Container */}
              <div className="flex-1 min-w-0 w-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 ${bgGlow} ${borderColor} border rounded-full animate-pulse`} />
                  <p className={`text-[10px] font-bold tracking-[0.3em] uppercase ${color}`}>
                    {role}
                  </p>
                </div>
                
                <h3 className={`font-black text-white truncate uppercase ${large ? 'text-3xl' : 'text-lg'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all`}>
                  {member.name}
                </h3>
                
                {/* Decorative barcode */}
                <div className="w-24 h-2 bg-gradient-to-r from-gray-500 to-transparent opacity-20 mt-2 mb-4 flex items-center">
                  <div className="w-1 h-full bg-white mr-1"/>
                  <div className="w-2 h-full bg-white mr-0.5"/>
                  <div className="w-0.5 h-full bg-white mr-1"/>
                  <div className="w-3 h-full bg-white mr-0.5"/>
                </div>

                {member.facebookUrl && (
                  <a 
                    href={member.facebookUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`mt-auto self-start flex items-center gap-2 px-3 py-1.5 ${bgGlow} border ${borderColor} ${color} hover:bg-opacity-20 transition-all text-[10px] font-bold tracking-widest uppercase [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
                  >
                    <LinkIcon size={10} />
                    CONNECT
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
