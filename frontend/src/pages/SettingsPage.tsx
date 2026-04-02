import { User, Bell, Shield, Moon, Monitor, Camera, Lock, Webhook, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 p-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-heading italic text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your account, privacy, and preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Sidebar */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-emerald-400" />
              Account
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-400" />
              Notifications
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-400" />
              Privacy & Security
            </div>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-between p-4 rounded-2xl text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors font-medium mt-8">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              Log Out
            </div>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="col-span-2 space-y-6">
          
          {/* Account Card */}
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl liquid-glass">
            <h2 className="text-2xl font-heading italic text-white mb-6">Account Details</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Email Address</p>
                  <p className="text-white/50 text-sm">chinmay.mohapatra@example.com</p>
                </div>
                <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">Edit</button>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Password</p>
                  <p className="text-white/50 text-sm">����������</p>
                </div>
                <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">Change</button>
              </div>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl liquid-glass">
            <h2 className="text-2xl font-heading italic text-white mb-6">Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Theme</p>
                  <p className="text-white/50 text-sm">Choose your aesthetic.</p>
                </div>
                <div className="flex flex-row gap-2">
                  <button onClick={() => setTheme('light')} className={`p-2 rounded-xl transition-all border border-white/10 ${theme === 'light' ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/20'}`}>
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button onClick={() => setTheme('dark')} className={`p-2 rounded-xl transition-all border border-white/10 ${theme === 'dark' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white hover:bg-white/20'}`}>
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="w-full h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Email Notifications</p>
                  <p className="text-white/50 text-sm">Updates on your matches and messages.</p>
                </div>
                <button 
                  onClick={() => setEmailNotifs(!emailNotifs)} 
                  className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-emerald-500' : 'bg-white/20'}`} 
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailNotifs ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
