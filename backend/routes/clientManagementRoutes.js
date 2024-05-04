const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Fetch all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new client
router.post('/', async (req, res) => {
    const { name, phone, barangay, city, address, facebookLink, notes } = req.body;
    const client = new Client({
        name,
        phone,
        barangay,
        city,
        address,
        facebookLink,
        notes
    });
    try {
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
