import React, { useState } from 'react';
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

export default MatchCard;