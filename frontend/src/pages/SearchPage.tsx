import { Search, Star, MessageCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Profile {
  _id: string;
  name: string;
  role: string;
  rating: number;
  match: string;
  skillsOffered: string[];
  skillsWanted: string[];
  avatar: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profiles:', err);
        setLoading(false);
      });
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    if (!query.trim()) return true; // Show all if empty

    const q = query.toLowerCase();
    const inName = profile.name.toLowerCase().includes(q);
    const inRole = profile.role.toLowerCase().includes(q);
    const inTeaching = profile.skillsOffered?.some(skill => skill.toLowerCase().includes(q));

    return inName || inRole || inTeaching;
  });

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center py-20">
        <p className="text-white/50 text-xl font-light">Loading profiles...</p>
      </div>
    );
  }
  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-heading italic text-white mb-4">Explore Skills</h1>
        <p className="text-white/60 font-light text-lg">Search for specific skills you want to learn and find the perfect mentor.</p>
      </div>

      <div className="mb-12 relative w-full lg:w-2/3">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/40">
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I want to learn... (e.g. Python, React, UI Design)" 
          className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white outline-none focus:bg-white/10 focus:border-white/20 transition-all text-lg placeholder:text-white/30"
        />
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="liquid-glass rounded-3xl p-16 text-center border border-white/5 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-heading italic text-white/40 mb-2">No matches found</h3>
            <p className="text-white/30 font-light">Try searching for a different skill or role.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <div key={profile._id} className="liquid-glass rounded-3xl p-6 border border-white/5 flex flex-col group hover:bg-white/[0.04] transition-colors duration-300">
              <div className="flex justify-between items-start mb-6">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-14 h-14 rounded-full liquid-glass-strong flex items-center justify-center font-heading italic text-xl text-white">
                    {profile.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="flex flex-col items-end">
                  <span className="text-white/50 text-xs uppercase tracking-widest">{profile.match} Match</span>
                  <div className="flex items-center gap-1 text-white text-sm mt-1 font-medium bg-white/10 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" /> {profile.rating}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-heading italic text-white mb-1">{profile.name}</h3>
              <p className="text-white/40 text-sm mb-6">{profile.role}</p>      

              <div className="space-y-4 mb-8 flex-1">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2">Expert In</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsOffered?.map(s => <span key={s} className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Looking For</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsWanted?.map(s => <span key={s} className="px-2 py-1 rounded border border-white/10 text-white/40 text-xs">{s}</span>)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-auto">
                <button className="flex-1 py-3 border border-white/10 rounded-full flex items-center justify-center gap-2 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm">
                  <Send className="w-4 h-4" /> Swap
                </button>
                <Link to="/messenger" className="flex-1 py-3 liquid-glass-strong rounded-full flex items-center justify-center gap-2 text-white hover:bg-white text-sm hover:text-black transition-all duration-300">
                  <MessageCircle className="w-4 h-4" /> Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
