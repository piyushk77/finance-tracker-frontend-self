import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3>Ethnus Group Project</h3>
      <p className="footer-para">&copy; {new Date().getFullYear()} Team 342</p>
    </footer>
  );
}

export default Footer;
