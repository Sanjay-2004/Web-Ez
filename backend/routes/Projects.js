import express from "express";
import authMiddleware from "../middleware.js";
import User from "../models/user.js";
import Project from "../models/project.js";
import Page from "../models/page.js";

const router = express.Router();

router.post("/create-page/:projectId", authMiddleware, async (req, res) => {
  try {
    const { title, code } = req.body;
    const projectId = req.params.projectId;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Page({
      title,
      code,
      project: projectId,
    }).save();

    res.status(201).json({ msg: "Page created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/pages/:projectId", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    const pages = await Page.find({ project: req.params.projectId });
    res.status(200).json({ pages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/delete-page/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: "Page not found" });
    }
    const project = await Project.findById(page.project);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Page.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Page deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update-page/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ msg: "Page not found" });
    }
    const project = await Project.findById(page.project);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Page.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: "Page updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
