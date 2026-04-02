import { Camera, Mic, Paperclip, Send, VideoOff, MicOff, Phone, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CONTACTS = [
  { id: 1, name: 'Alice Chen', avatar: '/photos/profile female 2.webp', lastMessage: 'Awesome. Do you want to do a quick...', status: 'Online � Swap Partner' },
  { id: 2, name: 'Marcus Fox', avatar: '/photos/profile male 1.avif', lastMessage: 'Sent you the Figma file...', status: 'Offline' }
];

export default function MessengerPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [inCall, setInCall] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(data => {
        if (activeContact.id === 2) {
           setMessages([
             { id: 101, text: "Hey Marcus! How's it going?", sender: 'me', time: '11:00 AM' },
             { id: 102, text: "Good! Sent you the Figma file. Look forward to the Python session.", sender: 'them', time: '11:05 AM' }
           ]);
        } else {
           setMessages(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, [activeContact]);

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

      {/* Sidebar Contacts */}
      <div className={`w-full lg:w-80 border-r border-white/5 flex-col bg-black/20 ${showSidebar ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-heading italic text-white">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id} 
              onClick={() => { setActiveContact(contact); setShowSidebar(false); }}
              className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${activeContact.id === contact.id ? 'bg-white/10 border-l-2' : ''}`}
            >
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <h4 className={activeContact.id === contact.id ? 'text-white' : 'text-white/80'}>{contact.name}</h4>
                <p className="text-white/40 text-xs truncate w-40">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col relative ${!showSidebar ? 'flex' : 'hidden lg:flex'}`}>

        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-black/40 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSidebar(true)} className="lg:hidden text-white/60 hover:text-white p-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img src={activeContact.avatar} alt={activeContact.name} className="w-10 h-10 rounded-full object-cover" />
              {activeContact.status.includes('Online') && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">{activeContact.name}</h3>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest">{activeContact.status}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setInCall(!inCall)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button onClick={() => setInCall(!inCall)} className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Call Overlay */}
        {inCall && (
          <div className="absolute inset-0 top-20 z-10 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500/20 mb-8 animate-pulse">
              <img src={activeContact.avatar} alt="Call" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-heading italic text-white mb-2">Call with {activeContact.name.split(' ')[0]}</h2>
            <p className="text-emerald-400 text-sm mb-12">02:45</p>

            <div className="flex items-center gap-6">
              <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <MicOff className="w-6 h-6" />
              </button>
              <button onClick={() => setInCall(false)} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
                <Phone className="w-6 h-6 rotate-[135deg]" />
              </button>
              <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <VideoOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
          <div className="text-center text-white/30 text-xs my-4">Yesterday, 10:00 AM</div>
          {loading ? (
             <div className="flex items-center justify-center h-full"> 
               <p className="text-white/50 italic">Loading messages...</p>
             </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 max-w-[80%] ${msg.sender === 'me' ? 'self-end flex-row-reverse' : ''}`}>      
                {msg.sender === 'them' && <img src={activeContact.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 mt-auto" />}
                
                <div className="flex flex-col gap-1.5">
                  <div className={`p-4 rounded-2xl text-sm font-light leading-relaxed ${msg.sender === 'me' ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] text-white/30 uppercase ${msg.sender === 'me' ? 'self-end' : ''}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-md flex items-end gap-4">
          <button type="button" className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
              placeholder="Message..."
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-3.5 pl-6 pr-14 text-white hover:bg-white/10 focus:bg-white/10 focus:border-white/20 transition-colors outline-none resize-none placeholder:text-white/30 min-h-[52px] max-h-32"
              rows={1}
            />
            <button type="button" className="absolute right-4 bottom-3.5 text-white/40 hover:text-white">
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <button type="submit" disabled={!input.trim()} className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>

      </div>
    </div>
  );
}
