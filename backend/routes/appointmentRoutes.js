const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate({ path: 'clientId', select: 'name' })
            .populate({ path: 'therapistId', select: 'name color' });

        // Enhance appointments with full datetime strings
        const enhancedAppointments = appointments.map(app => {
            const date = app.date.toISOString().split('T')[0]; // Assuming 'date' is stored as a Date object
            return {
                ...app._doc,
                start: `${date}T${app.startTime}`, // Combining date with startTime
                end: `${date}T${app.endTime}` // Combining date with endTime
            };
        });

        res.json(enhancedAppointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate({ path: 'clientId', select: 'name' })
            .populate({ path: 'therapistId', select: 'name color' });

        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }

        // Assuming appointment has a date, startTime, and endTime
        const date = appointment.date.toISOString().split('T')[0];
        const enhancedAppointment = {
            ...appointment._doc,
            start: `${date}T${appointment.startTime}`,
            end: `${date}T${appointment.endTime}`
        };

        res.json(enhancedAppointment);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Create a new appointment
router.post('/', async (req, res) => {
    const { therapistId, clientId, serviceType, date, startTime, endTime, notes } = req.body;
    try {
        const newAppointment = new Appointment({
            therapistId,
            clientId,
            serviceType,
            date,
            startTime,
            endTime,
            notes
        });
        await newAppointment.save();

        // Format the date and time for the response
        const formattedDate = newAppointment.date.toISOString().split('T')[0];
        const startDateTime = `${formattedDate}T${newAppointment.startTime}`;
        const endDateTime = `${formattedDate}T${newAppointment.endTime}`;

        res.status(201).json({
            ...newAppointment._doc,
            start: startDateTime,
            end: endDateTime
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
