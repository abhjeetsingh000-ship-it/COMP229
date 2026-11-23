import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Sign In
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (supports hashed or plain text during dev)
    const isPasswordValid = await bcrypt.compare(password, user.password).catch(() => false) || (password === user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const userRole = user.role || 'user';
    const token = jwt.sign(
      { id: user._id, email: user.email, role: userRole },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Sign in successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: userRole }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sign Out
export const signout = (req, res) => {
  res.status(200).json({ message: "Signed out successfully" });
};

// Middleware to Protect Routes
export const requireSignin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to Allow Admin Only
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  next();
};