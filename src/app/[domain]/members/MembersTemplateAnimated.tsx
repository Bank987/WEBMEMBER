"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Crown, User, Search, Link as LinkIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { Member } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

export default function MembersTemplateAnimated({ 
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

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] text-white selection:bg-purple-500/30 font-sans ${theme || "theme-default"} overflow-y-auto overflow-x-hidden`}>
      
      {/* Background */}
      {backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/60 backdrop-blur-xl" />
        </div>
      )}

      {/* Noise Texture Overlay for premium feel */}
      <div 
        className="fixed inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <main className="relative z-10 min-h-screen px-4 py-16 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <p className="text-white/80 text-xs font-bold tracking-widest uppercase">
              {pageSubtitle || "MEMBER DIRECTORY"}
            </p>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30 drop-shadow-2xl mb-8">
            {pageTitle}
          </h1>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full max-w-lg group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-3xl pl-16 pr-6 py-5 text-base text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.08] focus:border-purple-500/50 transition-all duration-300 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            />
          </motion.div>
        </motion.div>

        <div className="space-y-20 flex-1 pb-32">
          <AnimatedSection title="FOUNDERS" members={founders} role="FOUNDER" accent="from-amber-400 to-orange-600" shadowColor="rgba(2fb, 146, 60, 0.2)" icon={<Crown className="w-6 h-6 text-white" />} />
          <AnimatedSection title="SUPPORT" members={support2} role="SUPPORT" accent="from-pink-400 to-rose-500" shadowColor="rgba(244, 63, 94, 0.2)" icon={<Crown className="w-6 h-6 text-white" />} />
          <AnimatedSection title="LEADERS" members={leaders} role="LEADER" accent="from-blue-400 to-indigo-600" shadowColor="rgba(79, 70, 229, 0.2)" icon={<Shield className="w-6 h-6 text-white" />} />
          <AnimatedSection title="SUPPORT" members={support3} role="SUPPORT" accent="from-pink-400 to-rose-500" shadowColor="rgba(244, 63, 94, 0.2)" icon={<Shield className="w-6 h-6 text-white" />} />
          <AnimatedSection title="MEMBERS" members={members} role="MEMBER" accent="from-zinc-300 to-zinc-600" shadowColor="rgba(161, 161, 170, 0.1)" icon={<User className="w-6 h-6 text-white" />} />
        </div>
      </main>
    </div>
  );
}

function AnimatedSection({ 
  title, 
  members, 
  role, 
  accent,
  shadowColor,
  icon
}: { 
  title: string, 
  members: Member[], 
  role: string, 
  accent: string,
  shadowColor: string,
  icon: React.ReactNode
}) {
  if (members.length === 0) return null;

  return (
    <section>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex items-center gap-5 mb-10"
      >
        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} shadow-xl relative`}>
          <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay" />
          {icon}
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-6" />
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {members.map((member) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              key={member.id} 
              className="group"
            >
              <div 
                className="relative h-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 flex flex-col items-center backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
                style={{ boxShadow: `0 10px 40px -10px ${shadowColor}` }}
              >
                
                {/* Glare effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Animated Gradient Blob behind Avatar */}
                <div className={`absolute top-[40px] left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br ${accent} rounded-full blur-[50px] opacity-20 group-hover:opacity-50 group-hover:scale-150 transition-all duration-700 pointer-events-none`} />

                {/* Avatar with subtle float animation */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative w-28 h-28 mb-6 mt-4 z-10"
                >
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="relative w-full h-full rounded-[1.5rem] object-cover border border-white/20 shadow-2xl transition-all duration-500"
                  />
                  {/* Status indicator / Role dot */}
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br ${accent} border-2 border-[#111] flex items-center justify-center shadow-lg`}>
                    {icon}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                  {member.name}
                </h3>
                
                <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-8">
                  {role}
                </p>

                {/* Action Button - Slides up slightly on hover */}
                <div className="mt-auto w-full relative z-10">
                  {member.facebookUrl ? (
                    <a 
                      href={member.facebookUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-300 text-sm font-bold shadow-lg"
                    >
                      <LinkIcon size={16} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                      View Profile
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-transparent border border-white/5 text-sm font-bold text-white/20 select-none">
                      No Profile
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
