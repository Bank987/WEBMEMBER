"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Shield, Crown, User, Search, ExternalLink, Sparkles, Star, X, ChevronRight, Users, Hash, Heart } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Member, Role } from "@/lib/db";
import { BackgroundMedia } from "@/components/BackgroundMedia";

/* ─── Main Component ─── */
export default function MembersTemplatePremium({ 
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
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = initialMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const founders = filteredMembers.filter(m => m.role === "FOUNDER");
  const support2 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition === 2);
  const leaders = filteredMembers.filter(m => m.role === "LEADER");
  const support3 = filteredMembers.filter(m => m.role === "SUPPORT" && m.supportPosition !== 2);
  const members = filteredMembers.filter(m => m.role === "MEMBER");

  const roleConfig: Record<string, { color: string, label: string, icon: React.ReactNode }> = {
    FOUNDER: { color: "#facc15", label: "Founder", icon: <Crown className="w-4 h-4" /> },
    SUPPORT: { color: "#ec4899", label: "Support", icon: <Heart className="w-4 h-4" /> },
    LEADER: { color: "#ef4444", label: "Leader", icon: <Shield className="w-4 h-4" /> },
    MEMBER: { color: "#71717a", label: "Member", icon: <User className="w-4 h-4" /> },
  };

  return (
    <div className={`fixed inset-0 bg-[#060608] text-white selection:bg-purple-500/30 font-sans ${theme || "theme-default"} overflow-y-auto overflow-x-hidden`}>
      
      {backgroundImageUrl && (
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <BackgroundMedia url={backgroundImageUrl} />
          <div className="absolute inset-0 z-[2] bg-black/70" />
        </div>
      )}

      {/* Ambient Orbs */}
      <div className="fixed top-[-30%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#facc15]/8 blur-[180px] pointer-events-none z-[1] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-20%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#ef4444]/6 blur-[200px] pointer-events-none z-[1] animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Grid Floor */}
      <div className="fixed bottom-0 left-0 right-0 h-[60vh] z-[1] pointer-events-none opacity-[0.06]"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
        }} 
      />

      <main className="relative z-10 min-h-screen flex flex-col">
        
        {/* ─── Hero Header ─── */}
        <motion.header 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative pt-20 pb-12 px-6 flex flex-col items-center text-center overflow-hidden"
        >
          <FloatingParticle delay={0} x={-120} y={-40} size={3} />
          <FloatingParticle delay={1.5} x={150} y={-60} size={2} />
          <FloatingParticle delay={3} x={-80} y={30} size={4} />
          <FloatingParticle delay={0.8} x={200} y={20} size={2} />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-2xl"
          >
            <Sparkles className="w-7 h-7 text-white/80" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-[-0.04em] text-white mb-4"
          >
            {pageTitle}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-4 text-white/30 text-xs tracking-[0.25em] uppercase font-medium mb-6"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
            {pageSubtitle}
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-6 mb-10"
          >
            <StatBadge label="Founders" count={founders.length} color="#facc15" icon={<Crown className="w-3 h-3" />} />
            <StatBadge label="Supports" count={support2.length + support3.length} color="#ec4899" icon={<Heart className="w-3 h-3" />} />
            <StatBadge label="Leaders" count={leaders.length} color="#ef4444" icon={<Shield className="w-3 h-3" />} />
            <StatBadge label="Members" count={members.length} color="#71717a" icon={<Users className="w-3 h-3" />} />
          </motion.div>
          
          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="w-full max-w-md relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#facc15]/20 via-purple-500/20 to-[#ef4444]/20 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-md group-focus-within:border-white/20 transition-all duration-500">
              <div className="pl-5 pr-2 text-white/30 group-focus-within:text-white/60 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-4 pr-6 text-sm text-white placeholder-white/30 focus:outline-none tracking-wide"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* ─── Content ─── */}
        <div className="flex-1 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full space-y-20 pb-40">
          
          {/* FOUNDERS */}
          {founders.length > 0 && (
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionHeader title="FOUNDERS" count={founders.length} color="#facc15" icon={<Crown className="w-4 h-4" />} />
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                {founders.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6, type: "spring", bounce: 0.3 }}>
                    <FounderCard member={member} onClick={() => setSelectedMember(member)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* SUPPORT (Level 2) */}
          {support2.length > 0 && (
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionHeader title="SUPPORT" count={support2.length} color="#ec4899" icon={<Heart className="w-4 h-4" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {support2.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}>
                    <CompactCard member={member} accentColor="#ec4899" onClick={() => setSelectedMember(member)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* LEADERS */}
          {leaders.length > 0 && (
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionHeader title="LEADERS" count={leaders.length} color="#ef4444" icon={<Shield className="w-4 h-4" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {leaders.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}>
                    <CompactCard member={member} accentColor="#ef4444" onClick={() => setSelectedMember(member)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* SUPPORT (Level 3) */}
          {support3.length > 0 && (
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionHeader title="SUPPORT" count={support3.length} color="#ec4899" icon={<Heart className="w-4 h-4" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {support3.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}>
                    <CompactCard member={member} accentColor="#ec4899" onClick={() => setSelectedMember(member)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* MEMBERS */}
          {members.length > 0 && (
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <SectionHeader title="MEMBERS" count={members.length} color="#71717a" icon={<User className="w-4 h-4" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
                {members.map((member, i) => (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4, type: "spring" }}>
                    <CompactCard member={member} accentColor="#71717a" onClick={() => setSelectedMember(member)} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {filteredMembers.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-white/30">
              <Search className="w-14 h-14 mb-6 opacity-20" />
              <p className="text-lg font-medium">No members found</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* ─── Profile Modal ─── */}
      <AnimatePresence>
        {selectedMember && (
          <ProfileModal 
            member={selectedMember} 
            roleConfig={roleConfig}
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Stat Badge (Header) ─── */
function StatBadge({ label, count, color, icon }: { label: string, count: number, color: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
      <div className="flex items-center justify-center" style={{ color }}>{icon}</div>
      <span className="text-white/80 text-xs font-bold">{count}</span>
      <span className="text-white/30 text-[10px] font-medium hidden sm:inline">{label}</span>
    </div>
  );
}

/* ─── Floating Particle ─── */
function FloatingParticle({ delay, x, y, size }: { delay: number, x: number, y: number, size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/30"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: [0, 0.6, 0], y: [y, y - 60, y - 120], x: [x, x + 20, x - 10] }}
      transition={{ duration: 6, delay, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
    />
  );
}

/* ─── Section Header ─── */
function SectionHeader({ title, count, color, icon }: { title: string, count: number, color: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl border backdrop-blur-md" style={{ borderColor: `${color}30`, backgroundColor: `${color}10`, color }}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold" style={{ backgroundColor: `${color}15`, color }}>
        {count.toString().padStart(2, '0')}
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
    </div>
  );
}

/* ─── Founder Card (Large, 3D Tilt) ─── */
function FounderCard({ member, onClick }: { member: Member, onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouse} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformPerspective: 800 }} onClick={onClick} className="group relative w-[240px] cursor-pointer">
      <div className="absolute -inset-2 bg-gradient-to-br from-[#facc15]/20 via-transparent to-[#facc15]/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 group-hover:border-[#facc15]/30 rounded-[1.5rem] p-7 flex flex-col items-center overflow-hidden transition-colors duration-500 backdrop-blur-md">
        
        {/* Shine sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[1.5rem]">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out" />
        </div>

        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#facc15]/20 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#facc15]/20 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#facc15]/20 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#facc15]/20 rounded-br-lg" />

        {/* Crown */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="mb-3 z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#facc15] to-[#f59e0b] flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)]">
            <Crown className="w-5 h-5 text-black" />
          </div>
        </motion.div>

        {/* Avatar */}
        <div className="relative mb-5 z-10">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#facc15] to-[#f59e0b] rounded-full opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500" />
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#facc15]/40 group-hover:border-[#facc15]/80 transition-colors duration-500 shadow-xl">
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 z-10">{member.name}</h3>
        <div className="flex items-center gap-1.5 mb-5 z-10">
          <Star className="w-3 h-3 text-[#facc15] fill-[#facc15]" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#facc15] uppercase">Founder</span>
          <Star className="w-3 h-3 text-[#facc15] fill-[#facc15]" />
        </div>

        {/* View Profile CTA */}
        <div className="z-10 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#facc15]/10 group-hover:bg-[#facc15]/20 border border-[#facc15]/20 text-[#facc15] text-xs font-bold tracking-wider uppercase transition-all duration-300">
          View Profile <ChevronRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Compact Card (Leader / Member) ─── */
function CompactCard({ member, accentColor, onClick }: { member: Member, accentColor: string, onClick: () => void }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} onClick={onClick} className="group relative cursor-pointer">
      <div className="relative flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-opacity-100 rounded-2xl overflow-hidden transition-all duration-400 backdrop-blur-sm">
        <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: accentColor }} />
        
        <div className="relative shrink-0">
          <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500" style={{ backgroundColor: accentColor }} />
          <img src={member.avatar} alt={member.name} className="relative w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-transparent transition-all duration-500" />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center border border-white/10" style={{ backgroundColor: `${accentColor}25`, color: accentColor }}>
            {member.role === "LEADER" ? <Shield className="w-2.5 h-2.5" /> : member.role === "SUPPORT" ? <Heart className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: accentColor }}>
            {member.role}
          </span>
          <h3 className="text-sm font-bold text-white truncate">{member.name}</h3>
        </div>

        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 group-hover:bg-white/10 text-white/30 group-hover:text-white transition-all duration-300">
          <ChevronRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Profile Modal ─── */
function ProfileModal({ member, roleConfig, onClose }: { member: Member, roleConfig: Record<string, { color: string, label: string, icon: React.ReactNode }>, onClose: () => void }) {
  const config = roleConfig[member.role] || roleConfig.MEMBER;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-[#111114] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </motion.button>

          {/* Banner / Header Area */}
          <div className="relative h-36 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-40" style={{ backgroundImage: `linear-gradient(135deg, ${config.color}40, ${config.color}10, transparent)` }} />
            
            {/* Animated mesh pattern */}
            <div className="absolute inset-0 opacity-[0.08]" style={{ 
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, 
              backgroundSize: '20px 20px' 
            }} />

            {/* Floating decorative shapes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-12 opacity-10"
              style={{ color: config.color }}
            >
              <Sparkles size={40} />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-2 left-10 opacity-10"
              style={{ color: config.color }}
            >
              <Star size={30} />
            </motion.div>
          </div>

          {/* Avatar (overlapping banner) */}
          <div className="relative flex justify-center -mt-16 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute -inset-2 rounded-full blur-lg opacity-50" style={{ backgroundColor: config.color }} />
              {/* Spinning border ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full"
                style={{ 
                  background: `conic-gradient(from 0deg, ${config.color}, transparent, ${config.color}, transparent, ${config.color})`,
                  opacity: 0.5
                }}
              />
              {/* Avatar image */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#111114] shadow-2xl">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              {/* Role badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-lg" style={{ backgroundColor: `${config.color}20`, borderColor: `${config.color}40`, color: config.color }}>
                {config.icon}
                {config.label}
              </div>
            </motion.div>
          </div>

          {/* Profile Body */}
          <div className="px-8 pt-10 pb-8">
            {/* Name */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-center text-white mb-1"
            >
              {member.name}
            </motion.h2>

            {/* ID Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-1.5 mb-8"
            >
              <Hash size={12} className="text-white/20" />
              <span className="text-white/30 text-xs font-mono tracking-wider">{member.id}</span>
            </motion.div>

            {/* Info Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              <InfoCard label="Rank" value={config.label} color={config.color} icon={config.icon} />
              <InfoCard label="Gang ID" value={member.gangId.substring(0, 8)} color="#8b5cf6" icon={<Users className="w-3.5 h-3.5" />} />
            </motion.div>

            {/* Decorative Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"
            />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="space-y-3"
            >
              {member.facebookUrl ? (
                <a
                  href={member.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 border"
                  style={{ 
                    backgroundColor: `${config.color}15`, 
                    borderColor: `${config.color}25`, 
                    color: config.color 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${config.color}25`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${config.color}15`; }}
                >
                  <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                  View Facebook Profile
                </a>
              ) : (
                <div className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-sm font-bold text-white/20 select-none">
                  No Profile Link
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ─── Info Card (Inside Profile Modal) ─── */
function InfoCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-widest uppercase">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <p className="text-white font-bold text-sm">{value}</p>
    </div>
  );
}
