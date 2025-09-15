import jwt from "jsonwebtoken";
import User from "../models/User.js"; // optional if you want to fetch user from DB

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Optional: Check if user still exists in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // attach full user object to request
    next();
  } catch (err) {
    console.error(`Auth error on ${req.originalUrl}:`, err.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
