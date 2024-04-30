const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const getRandomColor = require('../utils/colorHelper');

router.get('/', async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.json(therapists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, services, availability } = req.body;
    const color = getRandomColor(); // Assign a random color

    const newTherapist = new Therapist({
        name,
        services,
        availability,
        color
    });

    try {
        const savedTherapist = await newTherapist.save();
        res.status(201).json(savedTherapist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
