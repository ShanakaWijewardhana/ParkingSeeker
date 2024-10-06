import React, { useState } from 'react';
import './userAccount.css'; // Create and style the CSS for user account page
import userIcon from './icons/user1.png';

const UserAccount = () => {
  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    nic: '123456789V',
    tpno: '+1234567890',
    address: '123 Main St, City',
  });

  const handleBack = () => {
    // Redirect to login home page
    window.location.href = '/loginhome';
  };

  const handleEdit = () => {
    // Redirect to edit user info page (or show modal form)
    console.log('Redirecting to edit page');
    window.location.href = '/editUser';
  };

  return (
    <div className="user-account-container">
      <div className="profile-picture">
        {/* You can replace this with an actual profile picture */}
        <img src={userIcon} alt="User Avatar" className="avatar" />
      </div>
      
      <div className="user-info">
        <h2>{userInfo.username}</h2>
        <p>Email: {userInfo.email}</p>
        <p>NIC: {userInfo.nic}</p>
        <p>TPNO: {userInfo.tpno}</p>
        <p>Address: {userInfo.address}</p>
      </div>

      <div className="button-group">
        <button className="back-button" onClick={handleBack}>Back</button>
        <button className="edit-button" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default UserAccount;
