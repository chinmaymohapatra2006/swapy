import React, { useState, useEffect } from 'react';
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

export default ProfilePage;