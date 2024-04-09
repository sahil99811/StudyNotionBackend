// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Define the Profile schema for MongoDB
const profileSchema = new mongoose.Schema({
    // Field for storing gender information
    gender: {
        type: String,
    },
    // Field for storing date of birth
    dateOfBirth: {
        type: String,
    },
    // Field for providing a brief description about the profile
    about: {
        type: String,
        trim: true, // Trims whitespace from the beginning and end of the string
    },
    // Field for storing contact number
    contactNumber: {
        type: Number,
        trim: true, // Trims whitespace from the beginning and end of the string
    },
});

// Export the Profile model created using the defined schema
module.exports = mongoose.model("profile", profileSchema);
