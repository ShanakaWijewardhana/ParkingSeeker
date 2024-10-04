import React from 'react';
import Home from './home'; // Import your HomePage component with an uppercase H
import './App.css'; // Global CSS (if needed)

// Main App function
function App() {
  return (
    <div className="App">
      {/* Render the Home component */}
      <Home />
    </div>
  );
}

export default App;
