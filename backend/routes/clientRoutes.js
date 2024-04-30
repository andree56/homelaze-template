const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// POST endpoint to create a new client
router.post('/', async (req, res) => {
    const { name, phone, barangay, city, address, facebookLink, notes } = req.body;

    try {
        const newClient = new Client({
        name,
        phone,
        barangay,
        city,
        address,
        facebookLink,
        notes
        });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
