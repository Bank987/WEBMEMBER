"use client";

import { motion } from "framer-motion";
import { Shield, Crown, User, Search, Link as LinkIcon, Instagram } from "lucide-react";
import { useState } from "react";
import { Member } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersTemplateGlass({ 
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
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className={`fixed inset-0 bg-[#0f1115] text-white selection:bg-white/30 font-sans ${theme || "theme-default"} overflow-y-auto overflow-x-hidden`}>
      
      {/* Background */}
      {backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          {/* Heavy glass blur on the background */}
          <div className="absolute inset-0 z-[2] bg-[#0f1115]/40 backdrop-blur-[40px] saturate-150" />
        </div>
      )}

      {/* Decorative Orbs for Glass Reflection */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/30 blur-[150px] pointer-events-none z-[1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[150px] pointer-events-none z-[1]" />

      <main className="relative z-10 min-h-screen px-6 py-16 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col">
        
        {/* Elegant Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
              {pageSubtitle || "MEMBER DIRECTORY"}
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg mb-8">
            {pageTitle}
          </h1>
          
          <div className="relative w-full max-w-lg group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            />
          </div>
        </motion.div>

        <div className="space-y-24 flex-1 pb-32">
          {founders.length > 0 && (
            <GlassSection 
              title="FOUNDERS" 
              members={founders} 
              role="FOUNDER" 
              accentColor="from-yellow-400 to-orange-500"
              icon={<Crown className="w-5 h-5 text-white" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}

          {leaders.length > 0 && (
            <GlassSection 
              title="LEADERS" 
              members={leaders} 
              role="LEADER" 
              accentColor="from-blue-400 to-indigo-500"
              icon={<Shield className="w-5 h-5 text-white" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
          
          {members.length > 0 && (
            <GlassSection 
              title="MEMBERS" 
              members={members} 
              role="MEMBER" 
              accentColor="from-gray-300 to-gray-500"
              icon={<User className="w-5 h-5 text-white" />}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function GlassSection({ 
  title, 
  members, 
  role, 
  accentColor,
  icon,
  containerVariants,
  itemVariants
}: { 
  title: string, 
  members: Member[], 
  role: string, 
  accentColor: string,
  icon: React.ReactNode,
  containerVariants: any,
  itemVariants: any
}) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-10">
        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${accentColor} shadow-lg`}>
          {icon}
        </div>
        <h2 className="text-3xl font-bold tracking-wide text-white">
          {title}
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent ml-4" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {members.map(member => (
          <motion.div 
            key={member.id} 
            variants={itemVariants}
            className="group relative"
          >
            {/* Glass Card */}
            <div className="relative h-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col items-center backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              
              {/* Colorful gradient blob on hover */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br ${accentColor} rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />

              {/* Avatar */}
              <div className="relative w-28 h-28 mb-6 mt-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} rounded-full blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500`} />
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="relative w-full h-full rounded-full object-cover border-[3px] border-white/10 group-hover:border-white/30 transition-colors duration-500 shadow-xl"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              
              <div className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-widest uppercase mb-6 flex items-center gap-1.5`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${accentColor}`} />
                {role}
              </div>

              {/* Social */}
              <div className="mt-auto w-full pt-4 border-t border-white/10">
                {member.facebookUrl ? (
                  <a 
                    href={member.facebookUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white/80 hover:text-white"
                  >
                    <LinkIcon size={16} />
                    View Profile
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-transparent text-sm font-medium text-white/30 select-none">
                    No Profile
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
