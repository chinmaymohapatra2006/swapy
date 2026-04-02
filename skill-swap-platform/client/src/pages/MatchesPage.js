import React, { useState, useEffect } from 'react';
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

export default MatchesPage;