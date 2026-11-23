import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(
    Boolean(localStorage.getItem('token') || localStorage.getItem('user'))
  );
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = () => {
      setIsSignedIn(
        Boolean(localStorage.getItem('token') || localStorage.getItem('user'))
      );
    };

    window.addEventListener('authChange', syncAuth);
    window.addEventListener('storage', syncAuth);
    return () => {
      window.removeEventListener('authChange', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    alert('Signed out successfully!');
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <span className="logo-text">MyPortfolio</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/education">Education</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isSignedIn ? (
          <li>
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;