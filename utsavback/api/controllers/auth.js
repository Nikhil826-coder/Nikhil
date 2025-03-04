/*import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
*/
/*
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET, // Make sure this is set in .env
      { expiresIn: "1d" } // Token expires in 1 day
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// ✅ Logout Function - Clears the Cookie
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
*/
/*
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// ✅ User Registration
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// ✅ User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // ✅ Fix: Ensure JWT_SECRET is used correctly
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT || "default_secret_key",  // ✅ Use a fallback to avoid crashes
      { expiresIn: "1d" } // Set token expiry time
    );
    

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Enable in production
        sameSite: "strict",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// ✅ User Logout
/*export const logout = async (req, res) => {
  res
    .clearCookie("access_token", { httpOnly: true, secure: false }) // Set secure: true in production
    .status(200)
    .json({ message: "User logged out successfully" });
};
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "Logged out successfully" }); // ✅ Send a response
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed", error: err.message });
  }
};
*/

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import transporter from "../config/nodemailerConfig.js"; // ✅ Ensure correct import


dotenv.config();



// ✅ User Registration
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// ✅ User Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // ✅ Fix: Ensure JWT_SECRET is used correctly
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT || "default_secret_key",  // ✅ Use a fallback to avoid crashes
      { expiresIn: "1d" } // Set token expiry time
    );
    

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Enable in production
        sameSite: "strict",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// ✅ User Logout
/*export const logout = async (req, res) => {
  res
    .clearCookie("access_token", { httpOnly: true, secure: false }) // Set secure: true in production
    .status(200)
    .json({ message: "User logged out successfully" });
};*/
export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "Logged out successfully" }); // ✅ Send a response
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed", error: err.message });
  }
};


 

 
// Forgot Password Controller
 
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link below to reset your password:\n\n
            http://localhost:3000/reset-password/${resetToken}\n\n
            If you did not request this, please ignore this email.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("❌ Email Error:", error);
                return res.status(500).json({ message: "Failed to send email" });
            }
            res.status(200).json({ message: "Password reset link sent!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};




// Reset Password Controller
 

export const resetPassword = async (req, res) => {
  console.log("✅ Password reset endpoint hit!");
  console.log("Received Token:", req.params.token);
  console.log("Request Body:", req.body);
  try {
    const { token } = req.params;
    const { password } = req.body;

    // ✅ Find user by reset token and check expiry
    const user = await User.findOne({
      resetPasswordToken: token, // Check token directly
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    // ✅ Hash new password and update user
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password successfully reset. You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
