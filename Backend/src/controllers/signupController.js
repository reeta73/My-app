const User = require("../models/User");
const { createToken } = require("../utils/token");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Name, email and password are required",
        success: false
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false
      });
    }

    const userCount = await User.countDocuments();

    // Create new user. The first account becomes admin so the dashboard is usable.
    const user = new User({
      name,
      email,
      password,
      role: userCount === 0 ? "admin" : "user"
    });

    // Save to database
    await user.save();

    const token = createToken(user._id, user.role);

    res.status(201).json({
      message: "Signup success",
      success: true,
      token,
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: messages.join(', '),
        success: false
      });
    }

    res.status(500).json({
      message: "Signup failed",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

module.exports = { signup };
