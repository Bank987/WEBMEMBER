"use client";

import { motion } from "framer-motion";
import { Shield, Crown, User, Search, Link as LinkIcon, Heart } from "lucide-react";
import { useState } from "react";
import { Member, Role } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersTemplateModern({ 
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
  const support2 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition === 2);
  const leaders = filteredMembers.filter(m => m.role === "LEADER");
  const support3 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition !== 2);
  const members = filteredMembers.filter(m => m.role === "MEMBER");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] text-white selection:bg-indigo-500/30 font-sans ${theme || "theme-default"} overflow-y-auto overflow-x-hidden`}>
      
      {/* Background */}
      {backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/80 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Grid Pattern */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20" 
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '32px 32px' }} 
      />

      {/* Glow Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none z-[1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none z-[1]" />

      <main className="relative z-10 min-h-screen px-6 py-16 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-sm mb-4">
            {pageTitle}
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide uppercase letter-spacing-2">
            {pageSubtitle || "OFFICIAL MEMBER DIRECTORY"}
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all backdrop-blur-md shadow-inner"
              />
            </div>
          </div>
        </motion.div>

        <div className="space-y-20 flex-1 pb-32">
          {founders.length > 0 && (
            <ModernSection 
              title="FOUNDERS" 
              members={founders} 
              role="FOUNDER" 
              hexColor="#facc15" 
              icon={<Crown className="w-5 h-5 text-[#facc15]" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {support2.length > 0 && (
            <ModernSection 
              title="SUPPORT" 
              members={support2} 
              role="SUPPORT" 
              hexColor="#ec4899" 
              icon={<Heart className="w-5 h-5 text-[#ec4899]" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {leaders.length > 0 && (
            <ModernSection 
              title="LEADERS" 
              members={leaders} 
              role="LEADER" 
              hexColor="#38bdf8" 
              icon={<Shield className="w-5 h-5 text-[#38bdf8]" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {support3.length > 0 && (
            <ModernSection 
              title="SUPPORT" 
              members={support3} 
              role="SUPPORT" 
              hexColor="#ec4899" 
              icon={<Heart className="w-5 h-5 text-[#ec4899]" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
          
          {members.length > 0 && (
            <ModernSection 
              title="MEMBERS" 
              members={members} 
              role="MEMBER" 
              hexColor="#a1a1aa" 
              icon={<User className="w-5 h-5 text-[#a1a1aa]" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {filteredMembers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center py-20 text-gray-500"
            >
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>No members found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function ModernSection({ 
  title, 
  members, 
  role, 
  hexColor,
  icon,
  containerVariants,
  itemVariants
}: { 
  title: string, 
  members: Member[], 
  role: string, 
  hexColor: string,
  icon: React.ReactNode,
  containerVariants: any,
  itemVariants: any
}) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-widest text-white" style={{ textShadow: `0 0 20px ${hexColor}40` }}>
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {members.map(member => (
          <motion.div 
            key={member.id} 
            variants={itemVariants}
            className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-[40px] pointer-events-none"
              style={{ backgroundColor: hexColor }}
            />
            
            <div className="relative p-6 flex flex-col items-center z-10 h-full">
              {/* Avatar */}
              <div className="relative mb-5">
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: hexColor }}
                />
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-[#222] group-hover:border-transparent transition-all z-10"
                  style={{ boxShadow: `0 0 0 2px ${hexColor}40` }}
                />
                {/* Tiny role icon badge */}
                <div className="absolute -bottom-1 -right-1 bg-[#111] rounded-full p-1.5 z-20 border border-white/10" style={{ color: hexColor }}>
                  {role === "FOUNDER" ? <Crown size={12} /> : role === "LEADER" ? <Shield size={12} /> : role === "SUPPORT" ? <Heart size={12} /> : <User size={12} />}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:scale-105 transition-transform">{member.name}</h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-6" style={{ color: hexColor }}>
                {role}
              </p>

              {/* Social or Actions */}
              <div className="mt-auto w-full">
                {member.facebookUrl ? (
                  <a 
                    href={member.facebookUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all text-xs font-semibold"
                  >
                    <LinkIcon size={14} />
                    PROFILE
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-transparent border border-white/5 text-gray-600 text-xs font-semibold select-none">
                    NO PROFILE
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
