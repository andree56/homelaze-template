const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { services } = require('../utils/config');

router.get('/sales/monthly', async (req, res) => {
    try {
        const appointments = await Appointment.find({ status: "Completed" });
        let monthlySales = {};

        appointments.forEach(appointment => {
            const month = appointment.date.getMonth() + 1; // Get month as a number (1-12)
            if (!monthlySales[month]) {
                monthlySales[month] = {
                    totalSales: 0,
                    count: 0
                };
            }
            monthlySales[month].totalSales += appointment.price;
            monthlySales[month].count++;
        });

        // Convert the results object into an array for easier processing on the client side
        const results = Object.keys(monthlySales).map(month => ({
            month: parseInt(month),
            totalSales: monthlySales[month].totalSales,
            appointments: monthlySales[month].count
        })).sort((a, b) => a.month - b.month); // Sort by month
        console.log("test", monthlySales)
        console.log("results are: ", results)
        res.json(results);
    } catch (error) {
        console.error("Error fetching monthly sales data:", error);
        res.status(500).send({ message: "Server error", error: error.toString() });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const regex = new RegExp(search, 'i');  // Case-insensitive regex for searching

    try {
        const appointments = await Appointment.aggregate([
            {
                $lookup: {
                    from: 'clients', 
                    localField: 'clientId',
                    foreignField: '_id',
                    as: 'clientDetails'
                }
            },
            {
                $lookup: {
                    from: 'therapists',
                    localField: 'therapistId',
                    foreignField: '_id',
                    as: 'therapistDetails'
                }
            },
            {
                $unwind: {
                    path: "$clientDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$therapistDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $or: [
                        { "clientDetails.name": { $regex: regex } },
                        { "therapistDetails.name": { $regex: regex } },
                        { serviceType: { $regex: regex } },
                        { status: { $regex: regex } },
                        { notes: { $regex: regex } }
                    ]
                }
            },
            {
                $project: {
                    serviceType: 1,
                    status: 1,
                    notes: 1,
                    date: 1,
                    startTime: 1,
                    endTime: 1,
                    pax: 1, // Include the pax in the projection
                    clientName: "$clientDetails.name",
                    therapistName: "$therapistDetails.name",
                    therapistColor: "$therapistDetails.color",
                    therapistId: "$therapistId",
                    start: { $concat: [ { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, "T", "$startTime" ] },
                    end: { $concat: [ { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, "T", "$endTime" ] },
                    price: 1
                }
            }
        ]);
        console.log("this apptments: ", appointments);
        res.json(appointments);
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
        console.log(date)
        const enhancedAppointment = {
            ...appointment._doc,
            start: `${date}T${appointment.startTime}`,
            end: `${date}T${appointment.endTime}`
        };
        console.log(enhancedAppointment)
        res.json(enhancedAppointment);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Create a new appointment
// Create a new appointment
router.post('/', async (req, res) => {
    const { therapistId, clientId, serviceType, date, startTime, endTime, notes, status, pax } = req.body;
    let price = (services[serviceType] || 0) * pax; // Calculate price based on pax and service type from centralized service list

    try {
        const newAppointment = new Appointment({
            therapistId,
            clientId,
            serviceType,
            date,
            startTime,
            endTime,
            notes,
            status,
            pax,
            price  // Include calculated price
        });
        await newAppointment.save();

        // Format the date and time for the response
        const formattedDate = newAppointment.date.toISOString().split('T')[0];
        const startDateTime = `${formattedDate}T${newAppointment.startTime}`;
        const endDateTime = `${formattedDate}T${newAppointment.endTime}`;

        res.status(201).json({
            ...newAppointment._doc,
            start: startDateTime,
            end: endDateTime,
            price  // Ensure to send back the price too
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Update an appointment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serviceType, status, date, startTime, endTime, pax, price } = req.body;

    try {
        // Find the appointment and update it
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id, 
            { $set: { serviceType, status, date, startTime, endTime, pax, price } },
            { new: true, runValidators: true } // Option to return the updated object and run validators
        );

        if (!updatedAppointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error('Failed to update appointment:', error);
        res.status(500).send({ message: 'Error updating appointment', error: error.message });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).send('Appointment not found');
        }
        res.json({ message: 'Appointment successfully deleted', deletedAppointment });
    } catch (error) {
        res.status(500).send('Error deleting appointment: ' + error);
    }
});

router.get('/appointment-stats/hourly', async (req, res) => {
    try {
        const stats = await Appointment.aggregate([
            {
                $project: {
                    hour: { $hour: "$start" }
                }
            },
            {
                $group: {
                    _id: "$hour",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by hour in ascending order
            },
            {
                $project: {
                    _id: 0,
                    hour: {
                        $concat: [
                            { $toString: "$_id" }, 
                            ":00"
                        ]
                    },
                    count: 1
                }
            }
        ]);
        
        res.json(stats.map(item => ({ ...item, hour: `${item.hour} - ${parseInt(item.hour) + 1}:00` })));
    } catch (error) {
        console.error('Failed to fetch hourly stats:', error);
        res.status(500).json({ message: 'Failed to fetch hourly appointment statistics', error: error.message });
    }
});





module.exports = router;
