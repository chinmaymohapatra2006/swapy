import React, { useState, useEffect } from 'react';
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

export default SwapRequestsPage;