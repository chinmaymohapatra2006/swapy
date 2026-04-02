"use client";
import { ArrowUpRight, Play, Zap, Palette, BarChart3, Shield, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurText } from '@/components/BlurText';
import { HLSVideo } from '@/components/HLSVideo';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('theme') === 'light';
    return false;
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-white/20">

      {/* SECTION 1 — NAVBAR */}
      <nav className="fixed top-4 left-0 right-0 z-50 max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center font-heading italic text-xl">S</div>
          <span className="font-heading italic text-2xl tracking-wide">Swapy</span>
        </div>

        <div className="hidden md:flex items-center liquid-glass rounded-full px-6 py-2.5 gap-8 font-medium text-sm text-foreground/90">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#how" className="hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLight(!isLight)}
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          
          <Link href="/profile" className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors">
            Get Started <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section id="home" className="relative w-full h-[1000px] overflow-hidden flex flex-col items-center pt-[150px]">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          className="absolute top-[20%] w-full h-auto object-contain z-0 opacity-80 mix-blend-screen"
          autoPlay loop muted playsInline poster="/images/hero_bg.jpeg"
        />
        <div className="absolute inset-0 bg-black/5 z-0" />
        <div className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] bg-gradient-to-b from-transparent to-black" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <div className="liquid-glass rounded-full px-3.5 py-1 mb-8 inline-flex items-center gap-2">
            <span className="bg-white text-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
            <span className="text-xs font-medium text-white/90">Introducing AI-powered skill matching.</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-foreground leading-[0.8] tracking-[-4px] mb-8">
            <BlurText text="The Knowledge Your Mind Deserves" />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/60 font-light text-lg md:text-xl max-w-2xl mb-12"
          >
            Stunning connections. Blazing fast matching. Built by AI, refined by experts. This is peer-to-peer learning, wildly reimagined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <Link href="/profile" className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
               Get Started <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href="#features" className="text-white/80 font-medium text-sm flex items-center gap-2 hover:text-white transition-colors">
              Features
            </a>
          </motion.div>
        </div>

        {/* SECTION 3 — PARTNERS BAR (INSIDE HERO MT-AUTO) */}
        <div className="relative z-10 mt-auto pb-12 pt-16 flex flex-col items-center w-full">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/60 mb-8">Trusted by learners from</span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {["Harvard", "Stanford", "MIT", "Oxford", "Cambridge"].map((partner, i) => (
              <span key={i} className="text-2xl md:text-3xl font-heading italic text-white">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — START SECTION ("How It Works") */}
      <section id="how" className="relative w-full py-32 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center min-h-[700px] overflow-hidden">       
        <HLSVideo
          src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
          className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-lighten"
          autoPlay loop muted playsInline
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto min-h-[500px] justify-center">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-6">How It Works</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">You dream it. We match it.</h2>     
          <p className="text-white/60 font-light text-lg mb-10 max-w-2xl">      
            Share the skills you have and those you want. Our AI handles the rest—scoring compatibility, recommending partners, and arranging classes. All in days, not quarters.
          </p>
          <Link href="/profile" className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            Get Started <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 5 — FEATURES CHESS */}
      <section id="features" className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-24">
        <div className="text-center mb-12">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">Capabilities</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Pro learning. Zero complexity.</h2>      
        </div>

        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <h3 className="text-3xl lg:text-4xl font-heading italic text-white mb-6">Designed to teach. Built to learn.</h3>
            <p className="text-white/60 font-light text-base mb-8 max-w-md">    
              Every detail is intentional. Our AI assesses your current level across thousands of skill tags—then matches you with the perfect mentor to outperform traditional courses.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
              Learn more
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video border border-white/5 flex items-center justify-center relative">
              <img src="/photos/students with laptop.webp" alt="Intuitive Dashboard UI" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
              <span className="text-white/20 italic font-heading text-2xl relative z-10">Intuitive Dashboard UI</span>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16"> 
          <div className="flex-1 text-left">
            <h3 className="text-3xl lg:text-4xl font-heading italic text-white mb-6">It gets smarter. Automatically.</h3>
            <p className="text-white/60 font-light text-base mb-8 max-w-md">    
              Your profile evolves on its own. AI monitors every swap, review, and milestone—then optimizes your suggestions in real time. No manual updates. Ever.
            </p>
            <button className="bg-transparent text-white font-medium text-sm flex items-center gap-2 hover:text-white/80 transition-colors">
              See how it works <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video border border-white/5 flex items-center justify-center relative">
               <img src="/photos/ai.jpg" alt="Smart Matching Matrix" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
               <span className="text-white/20 italic font-heading text-2xl relative z-10">Smart Matching Matrix</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FEATURES GRID */}
      <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">      
        <div className="text-center mb-16">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">Why Swapy</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">The difference is everything.</h2>       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">  
          {[
            { icon: <Zap className="w-5 h-5" />, title: "Days, Not Months", desc: "Concept to fluency at a pace that redefines fast." },
            { icon: <Palette className="w-5 h-5" />, title: "Obsessively Curated", desc: "Every verified mentor considered. Every module refined." },
            { icon: <BarChart3 className="w-5 h-5" />, title: "Built to Exchange", desc: "Barter economy informed by data. Decisions backed by performance." }, 
            { icon: <Shield className="w-5 h-5" />, title: "Secure by Default", desc: "Enterprise-grade peer protection comes standard." }
          ].map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full liquid-glass-strong flex items-center justify-center mb-6 text-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-heading italic text-white mb-2">{item.title}</h3>
              <p className="text-sm font-light text-white/60">{item.desc}</p>   
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — STATS */}
      <section className="relative py-32 px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden">
        <HLSVideo
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="absolute inset-0 w-full h-full z-0 opacity-30 object-cover"
          style={{ filter: 'saturate(0)' }}
          autoPlay loop muted playsInline
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[1]" />

        <div className="relative z-10 w-full max-w-5xl liquid-glass rounded-3xl p-12 md:p-16 border border-white/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">   
            {[
              { val: "20k+", label: "Swaps completed" },
              { val: "98%", label: "Learner satisfaction" },
              { val: "3.2x", label: "Faster fluency" },
              { val: "0.00$", label: "Money spent" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">{stat.val}</span>
                <span className="text-sm font-light text-white/60 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <section id="community" className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">What They Say</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">Don't take our word for it.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "A complete skill upgrade in five weeks. I taught React and learned advanced Python. Pure magic.", name: "Sarah Chen", role: "Software Engineer", pfp: "/photos/profile female 1.jpg" },
            { quote: "Language fluency up 4x. The AI matched me with a native speaker who wanted my UX skills in return.", name: "Marcus Webb", role: "Product Designer", pfp: "/photos/profile male 1.avif" },
            { quote: "They didn't just teach me a frameowrk... they completely rebuilt my confidence in programming.", name: "Elena Voss", role: "Creative Director", pfp: "/photos/profile female 3.png" }
          ].map((item, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
              <p className="text-sm font-light italic text-white/80 mb-8 leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-4">
                <img src={item.pfp} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                <div>
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="text-xs font-light text-white/50">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — CTA FOOTER */}
      <footer id="pricing" className="relative w-full pt-32 pb-8 px-6 md:px-16 flex flex-col items-center justify-center overflow-hidden min-h-[600px]">        
        <HLSVideo
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-lighten object-cover"
          autoPlay loop muted playsInline
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent z-[1]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">Your next skill starts here.</h2>   
          <p className="text-lg font-light text-white/60 mb-10 max-w-xl">       
            Join the decentralized knowledge exchange. See what AI-powered peer matching can do for your personal growth.
          </p>
          <div className="flex items-center gap-4 mb-32">
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
              Book a Demo
            </button>
            <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors">
              Join Free Waitlist
            </button>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
            <span className="text-xs text-white/40 mb-4 md:mb-0">© 2026 Swapy By HM36</span>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/80 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
