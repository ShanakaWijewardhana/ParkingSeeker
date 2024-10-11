import React from 'react';
import './login.css';

const LoginPage = () => {

  const handleBack = () => {
    // Redirect to the previous page (keepers page)
    window.location.href = '/home';
  };

  return (
    <div className="login-container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>Back</button>
      </div>

      <h2>Login</h2>
      <form id="loginForm" action="login-process.php" method="POST">
        <div className="input-group">
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <div className="button-group">
          <button type="submit" className="user-login" onClick={() => window.location.href = 'loginHome'}>User Login</button>
          <button type="submit" className="keeper-login" onClick={() => window.location.href = 'keepers'}>Keeper Login</button>
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
