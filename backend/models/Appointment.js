const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    notes: String,
    status: { type: String, required: true },
    pax: {
        type: Number,
        required: true,
        default: 1  // Default to 1 if not specified
    },
    price: Number  // This will be calculated based on the service type and pax
});

module.exports = mongoose.model('Appointment', appointmentSchema);
