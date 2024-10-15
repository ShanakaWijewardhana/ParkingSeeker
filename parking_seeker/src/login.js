import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    // Redirect to the previous page (keepers page)
    window.location.href = '/home';
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make a POST request to your backend login route
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // On successful login, save the token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the loginHome page
      window.location.href = '/loginHome';
    } catch (error) {
      // Handle login error (e.g., invalid credentials)
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>Back</button>
      </div>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="user-login">User Login</button>
          <button type="button" className="keeper-login" onClick={() => window.location.href = 'keepers'}>Keeper Login</button>
        </div>
        <div className="signup">
          <p>If you don’t have an account</p>
          <button type="button" className="signup-btn" onClick={() => window.location.href = 'signup'}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
