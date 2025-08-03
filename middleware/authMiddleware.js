const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.taskBuddyUserToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided.Authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Invalid token." });
    }

    req.user = user;
    next();


  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
