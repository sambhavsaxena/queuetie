import User from "../models/user.js";
import Activity from "../models/activity.js";
import { create_token, verify_token } from "../utils/token.js";
import send_email from "../utils/send_email.js";

const send_email_verification = async (user) => {
  const token = create_token(user._id, "1h");
  const verification_url = `${process.env.FRONTEND_URL}/verify?token=${token}`;
  const message = `Hello ${user.email},\n\nPlease verify your email by clicking on the following link:\n\n${verification_url}\n\nIf you did not request this, please ignore this email.`;
  try {
    const response = await send_email({
      to: user.email,
      subject: "Verify your email",
      text: message,
    });
    if (!response) {
      return res.status(500).json({
        error: "Error sending verification email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const login_user = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please provide email." });
    }
    const existing_user = await User.findOne({ email });
    if (existing_user) {
      await send_email_verification(existing_user);
      await Activity.create({
        type: "login",
        info: `User ${existing_user} requested verification.`,
        user: existing_user._id,
        status: "success",
      });
      return res
        .status(200)
        .json({ message: "Log in using the link sent to your email." });
    }
    const user = await User.create({
      email,
      isVerified: false,
    });
    if (!user) {
      return res.status(400).json({ error: "Error creating user." });
    }
    await send_email_verification(user);
    await Activity.create({
      type: "login",
      info: `User ${user.email} requested verification.`,
      user: user._id,
      status: "success",
    });
    return res.status(200).json({
      message:
        "User created successfully. Login using the link sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Error: " + error.message });
  }
};

const verify_user = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "No token provided." });
    }
    const response = verify_token(token);
    if (!response.status) {
      return res.status(400).json({ error: response.message });
    }
    const user = await User.findById(response.message);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    user.isVerified = true;
    await user.save();
    const login_token = create_token(user._id, "30d");
    res.cookie("token", login_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    await Activity.create({
      type: "verify",
      info: `User ${user.email} verified their email.`,
      user: user._id,
      status: "success",
    });
    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Error: " + error.message });
  }
};

const logout_user = async (req, res) => {
  try {
    res.clearCookie("token");
    await Activity.create({
      type: "logout",
      info: `User ${req.user.email} logged out.`,
      user: req.user._id,
      status: "success",
    });
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Error: " + error.message });
  }
};

const update_user = async (req, res) => {
  try {
  } catch (error) {}
};

const delete_user = async (req, res) => {
  try {
  } catch (error) {}
};

export { login_user, verify_user, update_user, delete_user, logout_user };
