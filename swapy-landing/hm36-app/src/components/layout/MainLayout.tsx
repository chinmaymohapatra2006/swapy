"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-black min-h-screen text-white font-body selection:bg-white/20 flex flex-col">
      <nav className="sticky top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center font-heading italic text-lg hover:bg-white/10 transition-colors">S</div>
          <span className="font-medium tracking-wide">Swapy</span>
        </Link>
        
        <div className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1.5 gap-2 text-sm">
          <Link href="/profile" className={`px-4 py-1.5 rounded-full transition-colors ${isActive('/profile') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>Profile</Link>
          <Link href="/matches" className={`px-4 py-1.5 rounded-full transition-colors ${isActive('/matches') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>Matches</Link>
          <Link href="/requests" className={`px-4 py-1.5 rounded-full transition-colors ${isActive('/requests') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>Requests</Link>
          <Link href="/messenger" className={`px-4 py-1.5 rounded-full transition-colors ${isActive('/messenger') ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>Messenger</Link>
        </div>
        
        <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
          <span className="text-xs font-medium">U</span>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}