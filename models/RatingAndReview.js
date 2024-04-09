// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Define the RatingAndReview schema for MongoDB
const ratingAndReviewSchema = new mongoose.Schema({
    // Field for storing the ID of the user who submitted the rating and review
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user", // Reference to the 'user' model
    },
    // Field for storing the rating given by the user
    rating: {
        type: Number,
        required: true,
    },
    // Field for storing the review text provided by the user
    review: {
        type: String,
        required: true,
    },
    // Field for storing the ID of the course being reviewed
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "course", // Reference to the 'Course' model
        index: true, // Create an index on this field for faster queries
    },
});

// Export the RatingAndReview model created using the defined schema
module.exports = mongoose.model("ratingAndReview", ratingAndReviewSchema);
