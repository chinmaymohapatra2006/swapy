import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [teachSkills, setTeachSkills] = useState(['React', 'Tailwind', 'TypeScript']);
  const [learnSkills, setLearnSkills] = useState(['Python', 'Machine Learning']);

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
        <div className="w-32 h-32 rounded-full liquid-glass-strong flex flex-col items-center justify-center p-1 relative border border-white/10 group cursor-pointer overflow-hidden">
           <img src="/photos/chinmay.jpeg" alt="Profile" className="w-full h-full object-cover rounded-full" />
           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">Edit</div>
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-heading italic text-white mb-2">Chinmay Mohapatra</h1>
          <p className="text-white/60 font-light text-lg">Full-stack web developer exploring the AI space.</p>
          <div className="flex gap-4 mt-6">
            <div className="liquid-glass rounded-xl px-4 py-2 flex flex-col items-center">
              <span className="text-2xl font-heading italic text-white">4</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Swaps</span>
            </div>
            <div className="liquid-glass rounded-xl px-4 py-2 flex flex-col items-center">
              <span className="text-2xl font-heading italic text-white">5.0</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Rating</span>
            </div>
          </div>
        </div>
        <button className="liquid-glass-strong rounded-full px-6 py-2 text-sm hover:bg-white/10 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Teach Section */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5 flex flex-col">
          <h2 className="text-2xl font-heading italic text-white mb-2">Skills to Teach</h2>
          <p className="text-white/50 text-sm font-light mb-6">What knowledge can you share with peers?</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {teachSkills.map((skill, i) => (
              <span key={i} className="bg-white/10 border border-white/10 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 group">
                {skill} <X className="w-3 h-3 text-white/40 group-hover:text-white cursor-pointer" />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <input 
              type="text" 
              placeholder="Add a skill you can teach..." 
              className="bg-black/30 border border-white/10 rounded-full px-4 py-2.5 text-sm flex-1 outline-none focus:border-white/30 transition-colors text-white placeholder:text-white/30"
            />
            <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Learn Section */}
        <div className="liquid-glass rounded-3xl p-8 border border-white/5 flex flex-col">
          <h2 className="text-2xl font-heading italic text-white mb-2">Skills to Learn</h2>
          <p className="text-white/50 text-sm font-light mb-6">What goals are you trying to accomplish?</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {learnSkills.map((skill, i) => (
              <span key={i} className="bg-black border border-white/20 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 group">
                {skill} <X className="w-3 h-3 text-white/40 group-hover:text-white cursor-pointer" />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <input 
              type="text" 
              placeholder="Add a skill you want to learn..." 
              className="bg-black/30 border border-white/10 rounded-full px-4 py-2.5 text-sm flex-1 outline-none focus:border-white/30 transition-colors text-white placeholder:text-white/30"
            />
            <button className="w-10 h-10 rounded-full liquid-glass-strong text-white flex items-center justify-center hover:bg-white/10">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD CAPABILITIES SECTION */}
      <div className="mt-16 flex flex-col gap-16 pb-12 w-full">
        <div className="text-center mb-4">
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white inline-block mb-4">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.9]">Pro learning. Zero complexity.</h2>
        </div>

        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <h3 className="text-2xl lg:text-3xl font-heading italic text-white mb-4">Designed to teach. Built to learn.</h3>
            <p className="text-white/60 font-light text-sm mb-6 max-w-md">
              Every detail is intentional. Our AI assesses your current level across thousands of skill tags—then matches you with the perfect mentor to outperform traditional courses.
            </p>
            <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors">
              Learn more
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video border border-white/5 flex items-center justify-center">
              <img src="/photos/students with laptop.webp" alt="Intuitive Dashboard UI" className="w-full h-full object-cover mix-blend-screen" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-left">
            <h3 className="text-2xl lg:text-3xl font-heading italic text-white mb-4">It gets smarter. Automatically.</h3>
            <p className="text-white/60 font-light text-sm mb-6 max-w-md">
              Your profile evolves on its own. AI monitors every swap, review, and milestone—then optimizes your suggestions in real time. No manual updates. Ever.
            </p>
            <button className="bg-transparent text-white font-medium text-sm flex items-center gap-2 hover:text-white/80 transition-colors">
              See how it works
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video border border-white/5 flex items-center justify-center">
               <img src="/photos/ai.jpg" alt="Smart Matching Matrix" className="w-full h-full object-cover mix-blend-screen" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}