require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Import the auth routes
const authMiddleware = require('./middleware/authMiddleware'); // Import the auth middleware
const parkingRoutes = require('./routes/parking');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Add authentication routes

// Parking space routes
app.use('/api/parking', parkingRoutes);

// Example of protected route (using authMiddleware)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `This is protected, userId: ${req.user}` });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Car Parking Backend. oh yes');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));