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
    const newPage = new Page({
      title,
      code,
      project: projectId,
    });
    await newPage.save();
    project.pages.push(newPage);
    await project.save();

    res.status(201).json({ msg: "Page created", pageId: newPage._id });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:projId", authMiddleware, async (req, res) => {
  const projId = req.params.projId;
  const userId = req.userId;
  const project = await Project.findById(projId);
  if (!project) {
    return res.status(404).json({ msg: "Project not found" });
  }
  if (project.user.toString() !== userId) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  console.log(project);
  res.status(200).json(project);
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
    const pages = project.pages;
    res.status(200).json(pages);
  } catch (error) {
    //console.log(error);
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
    const pageId = req.params.id;
    const project = await Project.findById(page.project);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.user.toString() !== userId) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    project.pages = project.pages.filter((page) => page.toString() !== pageId);
    await project.save();
    await Page.findByIdAndDelete(pageId);

    res.status(200).json({ msg: "Page deleted" });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update-page/:id", authMiddleware, async (req, res) => {
  console.log("reached here");
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // console.log(req.body);
    const pageId = req.params.id;
    // const project = await Project.findById(page.project);
    // if (!project) {
    //   return res.status(404).json({ msg: "Project not found" });
    // }
    // if (project.user.toString() !== userId) {
    //   return res.status(401).json({ msg: "Not authorized" });
    // }
    const { code } = req.body;
    console.log("Code:", code);
    console.log("PageId:", pageId);
    await Page.findByIdAndUpdate(pageId, { code });
    res.status(200).json({ msg: "Page updated" });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/page/:id", authMiddleware, async (req, res) => {
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
    res.status(200).json(page);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
