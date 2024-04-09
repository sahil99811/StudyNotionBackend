// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose")

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
    // Field for the name of the course
    courseName: { type: String },

    // Field for the description of the course
    courseDescription: { type: String },

    // Field for the instructor of the course, referencing the 'user' model
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },

    // Field for describing what students will learn in the course
    whatYouWillLearn: {
        type: String,
    },

    // Field for course content, referencing the 'Section' model
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
        },
    ],

    // Field for storing ratings and reviews of the course, referencing the 'RatingAndReview' model
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ratingAndReview",
        },
    ],

    // Field for the price of the course
    price: {
        type: Number,
    },

    // Field for the thumbnail image of the course
    thumbnail: {
        type: String,
    },

    // Field for tags associated with the course
    tag: {
        type: [String],
        required: true,
    },

    // Field for the category of the course, referencing the 'Category' model
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },

    // Field for storing students enrolled in the course, referencing the 'user' model
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
    ],

    // Field for providing instructions to students
    instructions: {
        type: [String],
    },

    // Field for the status of the course, either 'Draft' or 'Published'
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },

    // Field for storing the creation date of the course
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Export the Courses model
module.exports = mongoose.model("course", coursesSchema);
