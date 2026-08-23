import { ArrowRight, Globe, Users, Shield, Sparkles, Command, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import GangAuth from "@/components/GangAuth";
import { Reveal, FloatingHero, BentoGrid, GlowingButton } from "@/components/LandingMotion";

export const metadata = {
  title: "GANGLIST - The Next-Gen Faction Platform",
  description: "Create your faction's website, manage members, and dominate. All in one stunning, easy-to-use platform.",
  openGraph: {
    title: "GANGLIST - The Next-Gen Faction Platform",
    description: "Create your faction's website, manage members, and dominate. All in one stunning, easy-to-use platform.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-slate-200 selection:bg-[#0084ff] selection:text-white font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#141e30,transparent_50%)] opacity-60" />
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#0084ff]/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#7a00ff]/15 blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0084ff] to-[#004b99] shadow-[0_0_20px_rgba(0,132,255,0.4)]">
              <Command className="size-5 text-white" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </div>
            <span className="text-lg font-[900] tracking-widest text-white uppercase">GANGLIST</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#auth" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#0084ff] to-[#7a00ff] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black px-6 py-2.5 rounded-full text-xs font-[800] tracking-wider text-white transition-all group-hover:bg-transparent">
                LOGIN TO SECURE NET
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 pt-10 md:pt-20 pb-32">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
            <Reveal className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0084ff]/30 bg-[#0084ff]/10 px-4 py-1.5 mb-8">
                <span className="flex size-2 rounded-full bg-[#0084ff] shadow-[0_0_10px_#0084ff] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#0084ff] uppercase">System Online V2.0</span>
              </div>
              <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-[900] leading-[0.9] tracking-tighter text-white mb-8">
                RULE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084ff] to-[#7a00ff]">THE GRID</span>
              </h1>
              <p className="max-w-md text-lg text-slate-400 mb-10 leading-relaxed font-light">
                Establish your digital presence. Manage your roster, customize your aesthetic, and assert dominance with a breathtaking faction hub.
              </p>
              <GlowingButton href="#auth" text="INITIALIZE FACTION" />
            </Reveal>

            <FloatingHero />
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="px-6 py-32 bg-black/50 border-y border-white/5 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-[900] text-center mb-16 tracking-tight text-white uppercase">
                Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0084ff] to-[#00bfff]">Overview</span>
              </h2>
            </Reveal>
            <BentoGrid />
          </div>
        </section>

        {/* Auth / Terminal Section */}
        <section id="auth" className="px-6 py-32 scroll-mt-20">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-2xl p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0084ff]/10 via-transparent to-[#7a00ff]/10 opacity-50" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              
              <div className="relative rounded-[22px] bg-[#050505] border border-white/5 p-8 md:p-16 grid lg:grid-cols-2 gap-12 items-center">
                <Reveal delay={0.2} className="space-y-8">
                  <div className="space-y-4">
                    <Shield className="size-12 text-[#0084ff] drop-shadow-[0_0_15px_rgba(0,132,255,0.5)]" />
                    <h2 className="text-4xl md:text-5xl font-[900] text-white tracking-tight uppercase leading-none">
                      Secure <br />Access Point
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                      Enter your faction's designation code to deploy your digital headquarters instantly. Zero friction.
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {["Instant Deployment", "End-to-End Encrypted", "No Credit Card Required"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                        <CheckCircle2 className="size-4 text-[#0084ff]" /> {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                
                <Reveal delay={0.4} className="relative z-10">
                  <div className="rounded-2xl bg-black border border-white/10 p-2 shadow-2xl relative">
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    <GangAuth />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/80 backdrop-blur-lg py-8 text-center relative z-10">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
          © 2026 GANGLIST. Neural Network Secured.
        </p>
      </footer>
    </div>
  );
}
