import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SwapRequest {
  id: string | number;
  name: string;
  role: string;
  seeking: string;
  offering: string;
  status: string;
  time: string;
  avatar: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate dummy requests based on the db users to hook into the backend
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        const dummyRequests = data.slice(3, 6).map((u: any, i: number) => ({
          id: u._id,
          name: u.name,
          role: u.role,
          seeking: u.skillsWanted?.[0] || 'Machine Learning',
          offering: u.skillsOffered?.[0] || 'Python',
          status: 'pending',
          time: i === 0 ? '2 hours ago' : i === 1 ? '5 hours ago' : '1 day ago',
          avatar: u.avatar
        }));
        setRequests(dummyRequests);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAction = (id: string | number, action: 'accept' | 'decline') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    // In real app, trigger API
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center py-20">
        <p className="text-white/50 text-xl font-light">Checking requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading italic text-white mb-4">Swap Requests</h1>
        <p className="text-white/60 font-light text-lg">People who want to trade skills with you.</p>
      </div>

      <div className="flex flex-col gap-6">
        {requests.length === 0 ? (
          <div className="liquid-glass rounded-3xl p-16 text-center border border-white/5 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-heading italic text-white/40 mb-2">Caught up</h3>
            <p className="text-white/30 font-light">You have no pending requests right now.</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="liquid-glass rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-6 w-full md:w-auto">
                {req.avatar ? (
                  <img src={req.avatar} alt={req.name} className="w-14 h-14 shrink-0 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-14 h-14 shrink-0 rounded-full liquid-glass-strong flex items-center justify-center font-heading italic text-xl text-white">
                    {req.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-heading italic text-white">{req.name}</h3>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">{req.time}</span>
                  </div>
                  <p className="text-white/50 text-sm mb-3">{req.role}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-white/30">Needs:</span>
                    <span className="bg-white/10 text-white/80 px-2 py-1 rounded">{req.seeking}</span>
                    <span className="text-white/30 ml-2">Offers:</span>
                    <span className="border border-white/10 text-white/60 px-2 py-1 rounded">{req.offering}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button onClick={() => handleAction(req.id, 'decline')} className="flex-1 md:w-12 h-12 rounded-full border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <button onClick={() => handleAction(req.id, 'accept')} className="flex-1 md:w-12 h-12 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-black text-white flex items-center justify-center transition-colors">
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}