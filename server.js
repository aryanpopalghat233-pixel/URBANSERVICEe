const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Built-in Node tool

const app = express();
const PORT = 5000;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. THE FIX: Tell Express exactly where the 'public' folder is
app.use(express.static(path.join(__dirname, 'public')));

// 3. MongoDB Connection
const mongoURI = "mongodb+srv://aryanpopalghat233:aryan233@cluster0.i90bzje.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

// 4. API Routes (The Backend stuff)
app.post('/api/book', async (req, res) => {
    // ... (Your booking logic remains the same)
    res.json({ message: "Booking received!" });
});

// 5. THE OTHER FIX: If someone goes to "/", send them the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
