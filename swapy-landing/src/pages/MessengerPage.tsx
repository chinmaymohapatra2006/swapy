import { Camera, Mic, Paperclip, Send, VideoOff, MicOff, Phone } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  { id: 1, text: "Hey! Thanks for accepting my request. I'm really excited to dive into React with you.", sender: 'them', time: '10:00 AM' },
  { id: 2, text: "Hey Alice! Absolutely, I've been struggling a bit with CSS grid and Figma, so a swap sounds perfect.", sender: 'me', time: '10:05 AM' },
  { id: 3, text: "Awesome. Do you want to do a quick intro call to see where we're both at?", sender: 'them', time: '10:06 AM' }
];

export default function MessengerPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [inCall, setInCall] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'me', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput('');
  };

  return (
    <div className="w-full flex h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-bottom-8 duration-700 border border-white/5 rounded-3xl overflow-hidden liquid-glass">
      
      {/* Sidebar Contacts (Mock) */}
      <div className="w-80 border-r border-white/5 hidden lg:flex flex-col bg-black/20">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-heading italic text-white">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex items-center gap-4 bg-white/5 cursor-pointer">
            <img src="/photos/profile female 2.webp" alt="Alice Chen" className="w-12 h-12 rounded-full object-cover border border-emerald-500/30" />
            <div>
              <h4 className="text-white">Alice Chen</h4>
              <p className="text-white/40 text-xs truncate w-40">Awesome. Do you want to do a quick...</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4 opacity-50 hover:bg-white/5 cursor-pointer transition-colors">
            <img src="/photos/profile male 1.avif" alt="Marcus Fox" className="w-12 h-12 rounded-full object-cover border border-emerald-500/30" />
            <div>
              <h4 className="text-white">Marcus Fox</h4>
              <p className="text-white/40 text-xs truncate w-40">Sent you the Figma file</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat/Call Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <img src="/photos/profile female 2.webp" alt="Alice Chen" className="w-10 h-10 rounded-full object-cover border border-white/10" />
            <div>
              <h3 className="text-white font-medium">Alice Chen</h3>
              <p className="text-emerald-400 text-xs uppercase tracking-wider">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setInCall(!inCall)} 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${inCall ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              {inCall ? <Phone className="w-4 h-4 rotate-[135deg]" /> : <Camera className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Video Call Overlay */}
        {inCall && (
          <div className="absolute inset-0 top-20 bg-black/90 backdrop-blur-2xl z-20 flex flex-col animate-in fade-in duration-500">
            <div className="flex-1 p-6 grid grid-cols-2 gap-6 relative">
              {/* Remote Video Mock */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
                 <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center text-7xl font-heading italic text-white/20">AC</div>
                 <span className="absolute bottom-4 left-4 text-white/50 text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Alice Chen</span>
              </div>
              
              {/* Local Video Mock */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
                 <img src="/photos/chinmay.jpeg" alt="You" className="w-full h-full object-cover" />
                 <span className="absolute bottom-4 left-4 text-white/50 text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">You</span>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-lg border border-white/10 p-3 rounded-full">
                <button className="w-12 h-12 rounded-full bg-white/10 text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors"><MicOff className="w-5 h-5" /></button>
                <button className="w-12 h-12 rounded-full bg-white/10 text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors"><VideoOff className="w-5 h-5" /></button>
                <button onClick={() => setInCall(false)} className="w-12 h-12 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors"><Phone className="w-5 h-5 rotate-[135deg]" /></button>
              </div>
            </div>
          </div>
        )}

        {/* Chat History */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth">
          <div className="text-center text-xs text-white/30 tracking-widest uppercase my-4">Today</div>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex max-w-[80%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : 'self-start'} gap-4 group`}>
              <div className="w-8 h-8 rounded-full shrink-0 liquid-glass-strong mt-auto flex items-center justify-center text-[10px] text-white/50">{msg.sender === 'me' ? 'Me' : 'AC'}</div>
              <div className={`p-4 rounded-2xl ${msg.sender === 'me' ? 'bg-white text-black rounded-br-none' : 'liquid-glass border border-white/5 text-white/80 rounded-bl-none'}`}>
                 <p className="text-sm">{msg.text}</p>
                 <span className={`text-[10px] mt-2 block ${msg.sender === 'me' ? 'text-black/40' : 'text-white/30'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex items-center gap-3">
             <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0">
               <Paperclip className="w-4 h-4" />
             </button>
             <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Write a message..."
               className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm"
             />
             <button type="submit" disabled={!input.trim()} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors shrink-0">
               <Send className="w-5 h-5 ml-1" />
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}