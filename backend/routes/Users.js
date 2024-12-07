import express from "express";
import bcrypt from "bcrypt";
import authMiddleware from "../middleware.js";
import User from "../models/user.js";
import Project from "../models/project.js";

const router = express.Router();

router.post("/create-project", authMiddleware, async (req, res) => {
  // router.post("/create-project", async (req, res) => {
  try {
    const { title, description } = req.body;
    //console.log(req.body);
    const userId = req.userId;
    const user = await User.find({ userId });
    if (!user) {
      //console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }
    const result = await Project({
      title,
      description,
      user: userId,
    }).save();
    //console.log(result);

    res.status(201).json({ msg: "Project created", result: result._id });
  } catch (error) {
    //console.log("Error hain\n");
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const projects = await Project.find({ user: userId });
    res.status(200).json({ projects });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/delete-project/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Project deleted" });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update-project/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Project updated" });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
