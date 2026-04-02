import React from 'react';
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

export default Navbar;