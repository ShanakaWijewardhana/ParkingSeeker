// routes/parking.js
const express = require('express');
const router = express.Router();
const ParkingSpace = require('../models/ParkingSpace');

// Get all parking spaces
router.get('/all', async (req, res) => {
  try {
    const parkingSpaces = await ParkingSpace.find({});
    res.json(parkingSpaces);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available parking spaces
router.get('/available', async (req, res) => {
  try {
    const availableSpaces = await ParkingSpace.find({ available: true });
    res.json(availableSpaces);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new parking space
router.post('/add', async (req, res) => {
  const { location, address, available, price } = req.body;
  try {
    const newSpace = new ParkingSpace({
      location,
      address,
      available,
      price,
    });
    await newSpace.save();
    res.status(201).json({ message: 'Parking space added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update parking space availability
router.put('/:id/availability', async (req, res) => {
  try {
    const parkingSpace = await ParkingSpace.findById(req.params.id);
    if (!parkingSpace) {
      return res.status(404).json({ message: 'Parking space not found' });
    }

    parkingSpace.available = req.body.available;
    await parkingSpace.save();
    res.json({ message: 'Parking space availability updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
