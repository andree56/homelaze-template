const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    barangay: String, // No longer required
    city: { type: String, default: 'Iligan' }, // Default value set to 'Iligan'
    address: String,
    facebookLink: String,
    notes: String
});

module.exports = mongoose.model('Client', clientSchema);
