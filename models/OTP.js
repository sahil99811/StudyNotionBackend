// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Importing mailSender utility function to send emails
const mailSender = require("../utils/mailSender");

// Importing emailTemplate to generate the verification email content
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// Define the OTP schema for MongoDB
const OTPSchema = new mongoose.Schema({
    // Field for storing the email address
    email: {
        type: String,
        required: true,
    },
    // Field for storing the OTP (One-Time Password)
    otp: {
        type: String,
        required: true,
    },
    // Field for storing the creation date of the OTP document
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

// Define a function to send verification emails
async function sendVerificationEmail(email, otp) {
    try {
        // Send the verification email using the mailSender utility function
        const mailResponse = await mailSender(
            email, // Recipient email address
            "Verification Email", // Email subject
            emailTemplate(otp) // Email body/content
        );
        console.log("Email sent successfully: ", mailResponse.response);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error; // Throw an error if email sending fails
    }
}

// Define a pre-save hook to send email after the OTP document has been saved
OTPSchema.pre("save", async function (next) {
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next(); // Continue with the save operation
});

// Create the OTP model using the defined schema
const OTP = mongoose.model("OTP", OTPSchema);

// Export the OTP model for use in other parts of the application
module.exports = OTP;
