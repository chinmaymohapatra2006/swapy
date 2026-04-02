import React, { useState } from 'react';
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

export default RequestCard;