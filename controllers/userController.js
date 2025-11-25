import User from "../models/User.js";
import { createAccessToken } from "../utils/token.js";
import { isValidEmail } from "../utils/validation.js";

const code = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const auth = {
  register: async (req, res) => {
    try {
      const { fullName, username, email, password } = req.body;

      // ===== VALIDATIONS =====

      // Full Name
      if (!fullName || fullName.trim().length < 3) {
        return res.status(400).json({
          message: "Please enter a valid full name (min 3 characters)",
        });
      }

      // Username
      if (!username || username.trim().length < 3) {
        return res.status(400).json({
          message: "Please enter a valid username (min 3 characters)",
        });
      }
      const usernameRegex = /^[a-zA-Z0-9._]+$/; // allowed chars
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message:
            "Username can only contain letters, numbers, dots, and underscores",
        });
      }

      // Email
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const validEmail = isValidEmail(email);
      if (!validEmail) {
        return res.status(400).json({ message: "Please enter a valid email" });
      }

      // Password
      if (!password || password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      // ===== CHECK IF USER EXISTS =====

      // Check email
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Check username
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // ===== CREATE NEW USER =====
      const user = new User({
        fullName,
        username,
        email,
        password,
      });

      await user.save();

      return res.status(200).json({
        message: "User registered successfully",
        sucess: true,
        user: {
          fullName,
          username,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(404).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User does not exist." });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Password." });
      }
      const loggedUser = {
        token: "",
        id: user?._id,
        fullName: user?.fullName,
        email: user?.email,
        username: user?.username,
        createdAt: user?.createdAt,
      };
      const accessToken = createAccessToken(loggedUser);
      //   return res.status(200).json({ accessToken, refreshToken, id: user?._id });

      return res.status(200).json({
        sucess: true,
        user: { ...loggedUser, token: accessToken },
        message: "Login Sucessfully.",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
