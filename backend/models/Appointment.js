const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
    clientName: { type: String, required: true },
    barangay: { type: String, required: true },
    status: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    notes: String,
    pressureLevel: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
