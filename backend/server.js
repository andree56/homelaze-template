const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
const therapistRoutes = require('./routes/therapistRoutes');
const clientManagementRoutes = require('./routes/clientManagementRoutes');
const authRoutes = require('./routes/authRoutes');
const Appointment = require('./models/Appointment'); // Assuming you have an Appointment model
const jwt = require('jsonwebtoken'); // Make sure to install and import this

const app = express();

// CORS configuration for development
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/homelazeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
        req.user = decoded;
        next();
    });
};

// Authentication routes
app.use('/api/auth', authRoutes);

// Public endpoints for services and statuses
const services = ["Whole Body Massage", "1.5hr Whole Body Massage", "2hr Whole Body Massage", "30min Foot Massage"];
const statuses = ["Booked", "Completed", "Cancelled"];

app.get('/api/services', (req, res) => res.json(services));
app.get('/api/statuses', (req, res) => res.json(statuses));

// Protected routes
app.use('/api/therapists', verifyToken, therapistRoutes);
app.use('/api/appointments', verifyToken, appointmentRoutes);
app.use('/api/client-management', verifyToken, clientManagementRoutes);

// Handling 404 errors for unspecified routes
app.use((req, res) => res.status(404).send('API endpoint does not exist'));

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
