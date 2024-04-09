const bcrypt = require("bcrypt") // Importing bcrypt for password hashing
const User = require("../models/User") // Importing User model
const OTP = require("../models/OTP") // Importing OTP model
const jwt = require("jsonwebtoken") // Importing jsonwebtoken for token generation
const otpGenerator = require("otp-generator") // Importing otp-generator for OTP generation

const Profile = require("../models/Profile") // Importing Profile model
require("dotenv").config() // Loading environment variables
// Function for user signup
exports.signup = async (req, res) => {
  try {
    // Extracting data from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body

    // Checking if required fields are missing
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }

    // Checking if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      })
    }

    // Checking if user with the same email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

    // Retrieving the latest OTP for the provided email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    if (response.length === 0 || otp !== response[0].otp) {
      // If OTP is not found or does not match
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Creating profile details
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    })

    // Creating the user with hashed password and profile details
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      additionalDetails: profileDetails._id,
      image: "",
    })

    // Sending success response
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    // Handling errors
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

// Function for user login
exports.login = async (req, res) => {
  try {
    // Extracting email and password from request body
    const { email, password } = req.body

    // Checking if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Finding user by email and populating additional details
    const user = await User.findOne({ email }).populate("additionalDetails")

    // Handling case when user is not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }


    // Comparing passwords
    const ans = await bcrypt.compare(password, user.password)
    if (ans === true) {
      // Generating JWT token
      consol.log(user);
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Removing password from user object
      user.password = undefined

      // Setting cookie with token
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      // Handling incorrect password
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    // Handling errors
    console.error(error)
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}

// Function for sending OTP
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body

    // Checking if user with the provided email already exists
    const checkUserPresent = await User.findOne({ email })
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }

    // Generating OTP
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    const result = await OTP.findOne({ otp: otp })
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
    }

    // Creating OTP payload and saving it to the database
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    console.log("OTP Body", otpBody)
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}
