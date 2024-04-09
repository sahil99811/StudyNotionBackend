// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose")

// Define the schema for course progress tracking
const courseProgressSchema = new mongoose.Schema({
    // Field for storing the ID of the course being tracked
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course", // Reference to the 'Course' model
    },

    // Field for storing the ID of the user whose progress is being tracked
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the 'user' model
    },

    // Field for storing the IDs of completed videos or subsections within the course
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subSection", // Reference to the 'SubSection' model
        },
    ],
})

// Exporting the model with the defined schema
module.exports = mongoose.model("courseProgress", courseProgressSchema)
