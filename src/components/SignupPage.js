import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import axios from 'axios';
import './SignupPage.css';
import Header from './Header';
import Footer from './Footer';

function SignupPage() {
  const history = useHistory(); 
  const headerLinks = [
    { url: '/', text: 'Home' },
    { url: '/login', text: 'Login' },
    { url: '/about', text: 'About' },
    { url: '/contact', text: 'Contact' }
  ];

  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Exclude confirmPassword from the data sent to the server
      const { confirmPassword, ...postData } = formData;
      const response = await axios.post('https://finance-tracker-production.up.railway.app/api/auth/register', postData);
      if (response.status === 201) {
        // Registration successful
        console.log('Registration successful');
        // Redirect to login page
        history.push('/login');
      } else if (response.status === 202) {
        alert("Email already registered")
      } else {
        // Registration failed
        console.error('Registration failed');

      }
    } catch (error) {
      console.error('Error during registration', error);

    }
  };

  return (
    <div className="signup-page">
      <Header links={headerLinks} />

      <div className="signup-box">
        <form className="signup-form" autoComplete="off" onSubmit={handleSignup}>
          <h3 className="signup-main-head">Sign up</h3>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required="required"
            />
            <span>Username</span>
            <i></i>
          </div>
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
          <div className="inputBox">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required="required"
            />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <div className="links">
            <Link to="/login">Already registered? Sign in</Link>
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignupPage;
