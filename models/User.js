// Importing the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
    {
        // Field for storing the first name of the user
        firstName: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the beginning and end of the string
        },
        // Field for storing the last name of the user
        lastName: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the beginning and end of the string
        },
        // Field for storing the email address of the user
        email: {
            type: String,
            required: true,
            trim: true, // Trims whitespace from the beginning and end of the string
        },
        // Field for storing the password of the user
        password: {
            type: String,
            required: true,
        },
        // Field for storing the account type of the user, with possible values of "Admin", "Student", or "Instructor"
        accountType: {
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required: true,
        },
        // Field for storing additional details of the user, referencing the 'Profile' model
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "profile", // Reference to the 'Profile' model
        },
        // Field for storing the IDs of courses enrolled by the user, referencing the 'Course' model
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "course", // Reference to the 'Course' model
            },
        ],
        // Field for storing authentication token of the user
        token: {
            type: String,
        },
        // Field for storing the expiration date of the reset password token
        resetPasswordExpires: {
            type: Date,
        },
        // Field for storing the image URL of the user
        image: {
            type: String,
        },
        // Field for storing the progress of courses by the user, referencing the 'courseProgress' model
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courseProgress", // Reference to the 'courseProgress' model
            },
        ],
    },
    // Options object to include timestamps for document creation and modification
    { timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);
