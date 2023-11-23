import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory(); // Use useHistory hook

  const headerLinks = [
    { url: '/', text: 'Home' },
    { url: '/signup', text: 'Sign up' },
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' }
  ];

  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://finance-tracker-production.up.railway.app/api/auth/login', formData);

      if (response.status === 200) {
        // Login successful
        console.log('Login successful');

        // Store the JWT token in local storage
        localStorage.setItem('authToken', response.data.token);

        // Redirect to the dashboard or another protected page
        history.push('/dashboard');
      }
      else if (response.status === 201) {
        alert("Invalid email or password");
      }
      else {
        // Login failed
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="login-page">
      <Header links={headerLinks} />

      <div className="login-box">
        <form className="login-form" autoComplete="off" onSubmit={handleLogin}>
          <h3 className="login-main-head">Login</h3>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required="required"
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required="required"
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <Link to="/signup">Not yet registered? Sign up</Link>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;