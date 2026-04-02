"""
HM36 Skill Swap Platform - Pages and Styles Builder (Part 3)
"""
import os

BASE = r"C:\Hackethon\Hack matrix\Skill swap parter project\skill-swap-platform"

FILES = {
    # ==================== REACT PAGES ====================
    
    "client/src/pages/LoginPage.js": """import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Login to continue your skill swap journey</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;""",

    "client/src/pages/SignupPage.js": """import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, name);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Join HM36 Skill Swap</h1>
        <p className="auth-subtitle">Start exchanging skills with peers today!</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              placeholder="••••••••"
            />
            <small>Minimum 6 characters</small>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;""",

    "client/src/pages/ProfilePage.js": """import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SkillInput from '../components/profile/SkillInput';
import api from '../services/api';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skillsOffered: [],
    skillsWanted: []
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skillsOffered: user.skillsOffered || [],
        skillsWanted: user.skillsWanted || []
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/users/profile', formData);
      await refreshUser();
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      bio: user.bio || '',
      skillsOffered: user.skillsOffered || [],
      skillsWanted: user.skillsWanted || []
    });
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          )}
        </div>

        {!editing ? (
          <div className="profile-view">
            <div className="profile-section">
              <h3>Bio</h3>
              <p>{user.bio || 'No bio provided yet'}</p>
            </div>

            <div className="profile-section">
              <h3>Skills I Offer</h3>
              {user.skillsOffered?.length > 0 ? (
                <div className="skills-display">
                  {user.skillsOffered.map((skill, idx) => (
                    <span key={idx} className="skill-tag offer">{skill}</span>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No skills added yet</p>
              )}
            </div>

            <div className="profile-section">
              <h3>Skills I Want to Learn</h3>
              {user.skillsWanted?.length > 0 ? (
                <div className="skills-display">
                  {user.skillsWanted.map((skill, idx) => (
                    <span key={idx} className="skill-tag want">{skill}</span>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No skills added yet</p>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat">
                <strong>{user.completedSwaps || 0}</strong>
                <span>Swaps Completed</span>
              </div>
              <div className="stat">
                <strong>{user.reputation || 0}</strong>
                <span>Reputation</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows="4"
                placeholder="Tell others about yourself..."
                maxLength="500"
              />
              <small>{formData.bio.length}/500 characters</small>
            </div>

            <SkillInput
              label="Skills I Can Teach"
              skills={formData.skillsOffered}
              onChange={(skills) => setFormData({...formData, skillsOffered: skills})}
              placeholder="e.g., JavaScript, Guitar, Photography"
            />

            <SkillInput
              label="Skills I Want to Learn"
              skills={formData.skillsWanted}
              onChange={(skills) => setFormData({...formData, skillsWanted: skills})}
              placeholder="e.g., Python, Piano, Video Editing"
            />

            <div className="form-actions">
              <button type="submit" disabled={loading} className="save-btn">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;""",

    "client/src/pages/MatchesPage.js": """import React, { useState, useEffect } from 'react';
import MatchCard from '../components/matching/MatchCard';
import api from '../services/api';
import '../styles/MatchesPage.css';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const response = await api.get('/matches');
      setMatches(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Finding your matches...</p>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>Your Matches</h1>
        <p>People with complementary skills who you can swap with</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {matches.length === 0 ? (
        <div className="empty-state">
          <h2>No matches found</h2>
          <p>Add skills to your profile to find compatible swap partners!</p>
        </div>
      ) : (
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard 
              key={match.user._id} 
              match={match}
              onRequestSent={loadMatches}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesPage;""",

    "client/src/pages/SwapRequestsPage.js": """import React, { useState, useEffect } from 'react';
import RequestCard from '../components/swaps/RequestCard';
import api from '../services/api';
import '../styles/SwapRequestsPage.css';

const SwapRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const [incomingRes, outgoingRes] = await Promise.all([
        api.get('/swaps/incoming'),
        api.get('/swaps/outgoing')
      ]);
      setIncoming(incomingRes.data);
      setOutgoing(outgoingRes.data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRequests = () => {
    const requests = activeTab === 'incoming' ? incoming : outgoing;
    
    if (requests.length === 0) {
      return (
        <div className="empty-state">
          <h2>No {activeTab} requests</h2>
          <p>
            {activeTab === 'incoming' 
              ? 'When others request to swap with you, they will appear here'
              : 'Send swap requests from the Matches page'}
          </p>
        </div>
      );
    }

    return (
      <div className="requests-list">
        {requests.map((request) => (
          <RequestCard
            key={request._id}
            request={request}
            type={activeTab}
            onUpdate={loadRequests}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="requests-container">
      <h1>Swap Requests</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'incoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('incoming')}
        >
          Incoming ({incoming.length})
        </button>
        <button
          className={`tab ${activeTab === 'outgoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('outgoing')}
        >
          Outgoing ({outgoing.length})
        </button>
      </div>

      {renderRequests()}
    </div>
  );
};

export default SwapRequestsPage;""",
}

def create_file(filepath, content):
    full_path = os.path.join(BASE, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ {filepath}")

def main():
    print("=" * 70)
    print("  CREATING REACT PAGES (PART 3)")
    print("=" * 70)
    print(f"\nTotal files to create: {len(FILES)}\n")
    
    try:
        for filepath, content in FILES.items():
            create_file(filepath, content)
        
        print("\n" + "=" * 70)
        print("✅ REACT PAGES CREATED!")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
