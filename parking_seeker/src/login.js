import React from 'react';
import './login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="loginForm" action="login-process.php" method="POST">
        <div className="input-group">
          <input type="text" id="username" name="username" placeholder="User name" required />
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <div className="button-group">
          <button type="submit" className="user-login">User Login</button>
          <button type="submit" className="keeper-login">Keeper Login</button>
        </div>
        <div className="signup">
          <p>If you don’t have an account</p>
          <button type="button" className="signup-btn" onClick={() => window.location.href = 'signup.html'}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
