// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Define the Section schema for MongoDB
const sectionSchema = new mongoose.Schema({
    // Field for storing the name of the section
    sectionName: {
        type: String,
    },
    // Field for storing references to sub-sections within the section
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "subSection", // Reference to the 'SubSection' model
        },
    ],
});

// Export the Section model created using the defined schema
module.exports = mongoose.model("section", sectionSchema);
