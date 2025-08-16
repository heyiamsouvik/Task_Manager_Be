const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerSchema, loginSchema } = require("../validations/validate.js");

const registerUser = async (req, res) => {
  
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "Email & Username Validation Failed",
        errors: errors,
        success: false,
      });
    }
    const { username, email, password } = result.data;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username or Email already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: newUser,
      success: true,
      message: "Registration Successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {

  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: result.error.errors[0].message,
      success: false,
    });
  }
  const { email, password } = result.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User Not Found.",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong Password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.cookie("taskBuddyUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

const logoutUser = async (req, res) => {
   
  try {
    res.clearCookie("taskBuddyUserToken", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
