const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- MongoDB Connection ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

// --- Database Schemas ---

// 1. Service Schema (What you offer)
const serviceSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    rating: Number,
    image: String
});

const Service = mongoose.model('Service', serviceSchema);

// 2. Booking Schema (When a user clicks "Book Now")
const bookingSchema = new mongoose.Schema({
    serviceName: String,
    customerName: String,
    address: String,
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

// --- API Routes ---

// GET: Fetch all services from DB
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new booking
app.post('/api/book', async (req, res) => {
    const newBooking = new Booking({
        serviceName: req.body.serviceName,
        customerName: req.body.customerName,
        address: req.body.address
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
