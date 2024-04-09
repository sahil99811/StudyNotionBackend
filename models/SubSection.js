// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Define the SubSection schema for MongoDB
const SubSectionSchema = new mongoose.Schema({
    // Field for storing the title of the subsection
    title: { type: String },

    // Field for storing the duration of the subsection (e.g., time of a video)
    timeDuration: { type: String },

    // Field for storing the description of the subsection
    description: { type: String },

    // Field for storing the URL of the video associated with the subsection
    videoUrl: { type: String },
});

// Export the SubSection model created using the defined schema
module.exports = mongoose.model("subSection", SubSectionSchema);
