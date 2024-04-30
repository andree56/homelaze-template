const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    services: [String],
    availability: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String]
    },
    color: { type: String, required: true } // Color code for the therapist
});

module.exports = mongoose.model('Therapist', therapistSchema);
