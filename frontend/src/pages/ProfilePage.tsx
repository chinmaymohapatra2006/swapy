import { Plus, X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [teachSkills, setTeachSkills] = useState(['React', 'Tailwind', 'TypeScript']);
  const [learnSkills, setLearnSkills] = useState(['Python', 'Machine Learning']);
  const [newTeachSkill, setNewTeachSkill] = useState('');
  const [newLearnSkill, setNewLearnSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState('My Profile');
  const [avatar, setAvatar] = useState('/vite.svg');

  useEffect(() => {
    fetch('http://localhost:5000/api/users/profile')
      .then(res => res.json())
      .then(data => {
        if(data) {
          setTeachSkills(data.skillsOffered || []);
          setLearnSkills(data.skillsWanted || []);
          setUserName(data.name || 'My Profile');
          if (data.avatar) setAvatar(data.avatar);
        }
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleAddTeachSkill = () => {
    if (newTeachSkill.trim() && !teachSkills.includes(newTeachSkill.trim())) {  
      setTeachSkills([...teachSkills, newTeachSkill.trim()]);
      setNewTeachSkill('');
    }
  };

  const handleRemoveTeachSkill = (skillToRemove: string) => {
    setTeachSkills(teachSkills.filter(skill => skill !== skillToRemove));       
  };

  const handleAddLearnSkill = () => {
    if (newLearnSkill.trim() && !learnSkills.includes(newLearnSkill.trim())) {  
      setLearnSkills([...learnSkills, newLearnSkill.trim()]);
      setNewLearnSkill('');
    }
  };

  const handleRemoveLearnSkill = (skillToRemove: string) => {
    setLearnSkills(learnSkills.filter(skill => skill !== skillToRemove));       
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillsOffered: teachSkills, skillsWanted: learnSkills })
      });
      alert('Profile saved successfully!');
    } catch(err) {
      console.error(err);
      alert('Error saving profile');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-white p-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-center bg-black/20 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <img src={avatar} alt={userName} className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" />
          <div>
            <h1 className="text-4xl md:text-5xl font-heading italic text-white mb-2">{userName}</h1>
            <p className="text-white/60">Manage your skills and preferences</p>
          </div>
        </div>
        <button 
          onClick={saveProfile}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full transition-all liquid-button shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Teach Section */}
        <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl liquid-glass">
          <h2 className="text-2xl font-heading italic text-white mb-6">Skills I Can Teach</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {teachSkills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 group hover:bg-emerald-500/20 transition-colors"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveTeachSkill(skill)}
                    className="p-1 rounded-full hover:bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <input
                type="text"
                value={newTeachSkill}
                onChange={(e) => setNewTeachSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTeachSkill()}
                placeholder="Add a skill you can teach..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button 
                onClick={handleAddTeachSkill}
                className="p-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-xl transition-colors border border-emerald-500/20"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Learn Section */}
        <div className="p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl liquid-glass">
          <h2 className="text-2xl font-heading italic text-white mb-6">Skills I Want to Learn</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {learnSkills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-2 group hover:bg-blue-500/20 transition-colors"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveLearnSkill(skill)}
                    className="p-1 rounded-full hover:bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <input
                type="text"
                value={newLearnSkill}
                onChange={(e) => setNewLearnSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddLearnSkill()}
                placeholder="Add a skill you want to learn..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                onClick={handleAddLearnSkill}
                className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-black rounded-xl transition-colors border border-blue-500/20"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
