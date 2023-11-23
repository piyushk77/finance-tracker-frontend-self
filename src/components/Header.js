import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ links }) {

  const handleLogout = () => {
    // Prompt the user for confirmation
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      // Delete the JWT token (assuming it's stored in localStorage)
      localStorage.removeItem('authToken');

      // Redirect the user to the login page
      window.location.href = '/login'; // You can use react-router-dom for navigation in a React app
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand navbar-logo">
          <Link className="nav-item-link" to="/">
            <img src="/images/logo.png" alt="Logo" />
            <h3>Finance Tracker</h3>
          </Link>
        </div>
        <ul className="nav-list">
          {links.map((link, index) => (
            <li className="nav-item" key={index}>
              {link.url === '/logout' ? (
                <span className="nav-item-link" onClick={handleLogout}>{link.text}</span>
              ) : (
                <Link className="nav-item-link" to={link.url}>{link.text}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
