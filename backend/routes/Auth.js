import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/sign-up", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      console.log(user.email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = sign({ id: email }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = sign({ id: user.email }, process.env.JWT_SECRET);
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default router;
