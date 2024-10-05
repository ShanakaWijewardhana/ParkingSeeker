import React, { useState } from 'react';
import './keepers.css'; // Create and style your keepers page CSS here

const KeepersPage = () => {
  // State to hold vehicle counts
  const [vehicleData, setVehicleData] = useState({
    parked: { cars: 0, bikes: 0 },
    booked: { cars: 0, bikes: 0 },
    remain: { cars: 0, bikes: 0 },
  });

  const handleLogout = () => {
    // Handle logout functionality, redirect to login page
    window.location.href = '/login';
  };

  const handleDetails = (type) => {
    // Handle showing details based on type (parked, booked)
    console.log(`Showing details for ${type}`);
    // You can redirect to a detailed page or show a modal here
  };

  return (
    <div className="keepers-container">
      <div className="header">
        <h1>Vehicle Count</h1>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </div>
      
      <div className="vehicle-count">
        <div className="row">
          <h3>Parked</h3>
          <div className="count-box">
            <div className="count-item">
              <p>Cars</p>
              <input type="number" value={vehicleData.parked.cars} readOnly />
            </div>
            <div className="count-item">
              <p>Bikes</p>
              <input type="number" value={vehicleData.parked.bikes} readOnly />
            </div>
            <button className="details-button" onClick={() => handleDetails('parked')}>Details</button>
          </div>
        </div>

        <div className="row">
          <h3>Booked</h3>
          <div className="count-box">
            <div className="count-item">
              <p>Cars</p>
              <input type="number" value={vehicleData.booked.cars} readOnly />
            </div>
            <div className="count-item">
              <p>Bikes</p>
              <input type="number" value={vehicleData.booked.bikes} readOnly />
            </div>
            <button className="details-button" onClick={() => handleDetails('booked')}>Details</button>
          </div>
        </div>

        <div className="row">
          <h3>Remain</h3>
          <div className="count-box">
            <div className="count-item">
              <p>Cars</p>
              <input type="number" value={vehicleData.remain.cars} readOnly />
            </div>
            <div className="count-item">
              <p>Bikes</p>
              <input type="number" value={vehicleData.remain.bikes} readOnly />
            </div>
            {/* Notice there's no details button in the "Remain" section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeepersPage;
