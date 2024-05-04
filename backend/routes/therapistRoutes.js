const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');
const getRandomColor = require('../utils/colorHelper');

// Get all therapists
router.get('/', async (req, res) => {
    console.log("wow nigana sanaol");
    try {
        const therapists = await Therapist.find();
        res.json(therapists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new therapist
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

// Update a therapist
router.put('/:id', async (req, res) => {
    const { name, services, availability, color } = req.body;

    try {
        const updatedTherapist = await Therapist.findByIdAndUpdate(req.params.id, {
            name, services, availability, color
        }, { new: true });
        if (!updatedTherapist) {
            return res.status(404).json({ message: "Therapist not found" });
        }
        res.json(updatedTherapist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a therapist
router.delete('/:id', async (req, res) => {
    try {
        const deletedTherapist = await Therapist.findByIdAndDelete(req.params.id);
        if (!deletedTherapist) return res.status(404).send("No therapist found.");
        res.json({ message: "Therapist deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
