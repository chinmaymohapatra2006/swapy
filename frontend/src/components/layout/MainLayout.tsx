import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, MessageCircle, BarChart3, Settings, Zap, ArrowUpRight, Sun, Moon, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MainLayout() {
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path 
      ? "flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-white/10 transition-all text-sm"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm";
  };

  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-white/20 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 h-screen sticky top-0 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center font-heading italic text-lg">S</div>
          <span className="font-heading italic text-2xl tracking-wide">Swapy</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link to="/explore" className={getLinkClass('/explore')}>
            <Search className="w-4 h-4" /> Explore
          </Link>
          <Link to="/profile" className={getLinkClass('/profile')}>
            <User className="w-4 h-4" /> My Profile
          </Link>
          <Link to="/matches" className={getLinkClass('/matches')}>  
            <Zap className="w-4 h-4" /> Matches
          </Link>
          <Link to="/messenger" className={`${getLinkClass('/messenger')} relative`}>
            <MessageCircle className="w-4 h-4" /> Messages
            <span className="absolute right-4 w-2 h-2 rounded-full bg-white"></span>
          </Link>
          <Link to="/requests" className={getLinkClass('/requests')}> 
            <BarChart3 className="w-4 h-4" /> Requests
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button 
            onClick={() => setIsLight(!isLight)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm w-full text-left"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} 
            {isLight ? 'Dark Mode' : 'Light Mode'}
          </button>
          
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <div className="liquid-glass rounded-xl p-4 mt-4 text-center">
            <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">Swap Balance</span>
            <div className="text-2xl font-heading italic">12 hrs</div>
            <button className="mt-3 text-xs w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">Get more</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-black/80 backdrop-blur-md z-40">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/60">
            Dashboard
          </div>
          <div className="flex items-center gap-4">
             <button className="liquid-glass-strong rounded-full px-5 py-2 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              New Request <ArrowUpRight className="w-3 h-3" />
            </button>
            <img src="/photos/chinmay.jpeg" alt="Profile" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
