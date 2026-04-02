import { MessageCircle, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface UserMatch {
  _id: string;
  name: string;
  role: string;
  rating: number;
  match: string;
  skillsOffered: string[];
  skillsWanted: string[];
  avatar: string;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        // Just take the first 3 profiles as dummy curated matches for the demo
        setMatches(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center py-20">
        <p className="text-white/50 text-xl font-light">Finding your matches...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-heading italic text-white mb-4">Your Matches</h1>
        <p className="text-white/60 font-light text-lg">Curated skill-swap partners based on your profile.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <div key={match._id} className="liquid-glass rounded-3xl p-6 border border-white/5 flex flex-col group hover:bg-white/[0.02] transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
              {match.avatar ? (
                <img src={match.avatar} alt={match.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
              ) : (
                <div className="w-14 h-14 rounded-full liquid-glass-strong flex items-center justify-center font-heading italic text-xl text-white">
                  {match.name?.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="flex flex-col items-end">
                <span className="text-emerald-400 text-sm font-medium">{match.match || '90%'} Match</span>
                <div className="flex items-center gap-1 text-white/40 text-xs mt-1">
                  <Star className="w-3 h-3 fill-white/40" /> {match.rating}
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-heading italic text-white mb-1">{match.name}</h3>
            <p className="text-white/40 text-sm mb-6">{match.role}</p>

            <div className="space-y-4 mb-8 flex-1">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Can Teach</p>
                <div className="flex flex-wrap gap-1.5">
                  {match.skillsOffered?.map(s => <span key={s} className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs">{s}</span>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Wants to Learn</p>
                <div className="flex flex-wrap gap-1.5">
                  {match.skillsWanted?.map(s => <span key={s} className="px-2 py-1 rounded border border-white/10 text-white/60 text-xs">{s}</span>)}
                </div>
              </div>
            </div>

            <Link to="/messenger" className="w-full py-3 liquid-glass-strong rounded-full flex items-center justify-center gap-2 text-white hover:bg-white text-sm group-hover:text-black hover:text-black transition-all duration-300">
              <MessageCircle className="w-4 h-4" /> Message
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}