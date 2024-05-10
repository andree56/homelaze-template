const bcrypt = require('bcryptjs');
const password = "password123"; // Replace "new_password" with your desired password
const saltRounds = 12;

bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log("New hash:", hash);
});
