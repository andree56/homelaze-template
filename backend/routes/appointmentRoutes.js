const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('therapistId');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new appointment
router.post('/', async (req, res) => {
    const {
        therapistId, clientName, barangay, status, serviceType, 
        date, startTime, endTime, notes, pressureLevel
    } = req.body;
    const newAppointment = new Appointment({
        therapistId, clientName, barangay, status, serviceType, 
        date: new Date(date), startTime, endTime, notes, pressureLevel
    });

    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Additional routes for updating and deleting appointments can be added here

module.exports = router;
