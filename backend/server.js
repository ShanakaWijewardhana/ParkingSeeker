const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import the auth routes
const authMiddleware = require('./middleware/authMiddleware'); // Import the auth middleware

const app = express();
dotenv.config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // Add authentication routes

// Example of protected route (using authMiddleware)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `This is protected, userId: ${req.user}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
