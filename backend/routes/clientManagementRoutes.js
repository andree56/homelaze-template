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

// Update a client
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone, barangay, city, address, facebookLink, notes } = req.body;
    try {
        const updatedClient = await Client.findByIdAndUpdate(id, {
            name, phone, barangay, city, address, facebookLink, notes
        }, { new: true }); // The {new: true} option ensures that the method returns the document after update
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a client
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByIdAndDelete(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
