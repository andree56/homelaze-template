const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials (normally, you should never hardcode sensitive information like this in your code!)
const adminUser = {
    username: 'admin',
    password: '$2a$12$gCqmNvjxVBkpIyT4R8wt9uSSYkUbwSlx1sEVOizybO9w69h5JQk7y'  // This is a bcrypt hash of a password, e.g., 'password'
};

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (username !== adminUser.username) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
