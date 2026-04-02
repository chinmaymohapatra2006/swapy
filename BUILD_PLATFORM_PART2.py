"""
HM36 Skill Swap Platform - Frontend Components Builder (Part 2)
"""
import os

BASE = r"C:\Hackethon\Hack matrix\Skill swap parter project\skill-swap-platform"

FILES = {
    # ==================== REACT COMPONENTS ====================
    
    "client/src/context/AuthContext.js": """import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    return user;
  };

  const signup = async (email, password, name) => {
    const response = await api.post('/auth/signup', { email, password, name });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    refreshUser: loadUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};""",

    "client/src/services/api.js": """import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;""",

    "client/src/components/common/ProtectedRoute.js": """import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;""",

    "client/src/components/common/Navbar.js": """import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎯 HM36 Skill Swap
        </Link>
        
        {user && (
          <div className="navbar-links">
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/matches" className="nav-link">Matches</Link>
            <Link to="/requests" className="nav-link">Requests</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;""",

    "client/src/components/profile/SkillInput.js": """import React, { useState } from 'react';
import '../../styles/SkillInput.css';

const SkillInput = ({ skills, onChange, label, placeholder }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!skills.includes(input.trim())) {
        onChange([...skills, input.trim()]);
      }
      setInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="skill-input-container">
      <label className="skill-label">{label}</label>
      <div className="skills-display">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="remove-skill"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="skill-input"
      />
      <small className="skill-hint">Press Enter to add a skill</small>
    </div>
  );
};

export default SkillInput;""",

    "client/src/components/matching/MatchCard.js": """import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/MatchCard.css';

const MatchCard = ({ match, onRequestSent }) => {
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, score, matchedSkills } = match;

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/swaps', {
        toUserId: user._id,
        message
      });
      alert('Swap request sent successfully!');
      setShowForm(false);
      setMessage('');
      if (onRequestSent) onRequestSent();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p className="user-bio">{user.bio || 'No bio provided'}</p>
        </div>
        <div className="match-score">
          <span className="score">{score}</span>
          <small>match</small>
        </div>
      </div>

      <div className="match-skills">
        {matchedSkills.theyOffer.length > 0 && (
          <div className="skill-section">
            <strong>They can teach you:</strong>
            <div className="skills-list">
              {matchedSkills.theyOffer.map((skill, idx) => (
                <span key={idx} className="skill-badge offer">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {matchedSkills.theyWant.length > 0 && (
          <div className="skill-section">
            <strong>They want to learn:</strong>
            <div className="skills-list">
              {matchedSkills.theyWant.map((skill, idx) => (
                <span key={idx} className="skill-badge want">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {!showForm ? (
        <button 
          className="request-btn"
          onClick={() => setShowForm(true)}
        >
          Request Swap
        </button>
      ) : (
        <form onSubmit={handleSendRequest} className="request-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Introduce yourself and explain why you'd like to swap..."
            rows="3"
            required
          />
          <div className="form-actions">
            <button type="submit" disabled={loading} className="send-btn">
              {loading ? 'Sending...' : 'Send Request'}
            </button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MatchCard;""",

    "client/src/components/swaps/RequestCard.js": """import React, { useState } from 'react';
import api from '../../services/api';
import '../../styles/RequestCard.css';

const RequestCard = ({ request, type, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const otherUser = type === 'incoming' ? request.fromUser : request.toUser;

  const handleAccept = async () => {
    setLoading(true);
    try {
      await api.put(`/swaps/${request._id}/accept`);
      alert('Request accepted! You can now coordinate with your swap partner.');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Failed to accept request');
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      await api.put(`/swaps/${request._id}/decline`);
      alert('Request declined');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Failed to decline request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    const statusClasses = {
      pending: 'status-badge pending',
      accepted: 'status-badge accepted',
      declined: 'status-badge declined',
      completed: 'status-badge completed'
    };

    return (
      <span className={statusClasses[request.status]}>
        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
      </span>
    );
  };

  return (
    <div className="request-card">
      <div className="request-header">
        <div className="user-avatar">{otherUser.name.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <h3>{otherUser.name}</h3>
          <p className="user-email">{otherUser.email}</p>
        </div>
        {getStatusBadge()}
      </div>

      {request.message && (
        <div className="request-message">
          <strong>Message:</strong>
          <p>{request.message}</p>
        </div>
      )}

      <div className="request-skills">
        <div className="skill-section">
          <strong>They offer:</strong>
          <div className="skills-list">
            {otherUser.skillsOffered?.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
        <div className="skill-section">
          <strong>They want:</strong>
          <div className="skills-list">
            {otherUser.skillsWanted?.map((skill, idx) => (
              <span key={idx} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {type === 'incoming' && request.status === 'pending' && (
        <div className="request-actions">
          <button 
            onClick={handleAccept} 
            disabled={loading}
            className="accept-btn"
          >
            Accept
          </button>
          <button 
            onClick={handleDecline} 
            disabled={loading}
            className="decline-btn"
          >
            Decline
          </button>
        </div>
      )}

      <small className="request-date">
        {new Date(request.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
};

export default RequestCard;""",
}

def create_file(filepath, content):
    full_path = os.path.join(BASE, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ {filepath}")

def main():
    print("=" * 70)
    print("  CREATING REACT COMPONENTS (PART 2)")
    print("=" * 70)
    print(f"\nTotal files to create: {len(FILES)}\n")
    
    try:
        for filepath, content in FILES.items():
            create_file(filepath, content)
        
        print("\n" + "=" * 70)
        print("✅ REACT COMPONENTS CREATED!")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
