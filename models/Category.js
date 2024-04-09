// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Defining the schema for the 'Category' collection in MongoDB
const categorySchema = new mongoose.Schema({
    // 'name' field of type String, required
    name: {
        type: String,
        required: true,
    },
    // 'description' field of type String, optional
    description: { type: String },
    // 'courses' field, which is an array of ObjectIds referencing 'Course' model
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course",
        },
    ],
});

// Exporting the model named 'Category' with the defined schema
module.exports = mongoose.model("category", categorySchema);
