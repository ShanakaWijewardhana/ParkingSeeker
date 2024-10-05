import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home'; // Assuming your homepage is in HomePage.js
import LoginPage from './login'; // You can create a new component for login or link to your HTML
import SignupPage from './signup';
import KeepersPage from './keepers';
import ParkingDetails from './parkingDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/keepers" element={<KeepersPage />} />
        <Route path="/parkingDetails" element={<ParkingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
