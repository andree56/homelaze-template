const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const therapistRoutes = require('./routes/therapistRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

mongoose.connect('mongodb://localhost/homelazeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

app.use('/api/therapists', therapistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
