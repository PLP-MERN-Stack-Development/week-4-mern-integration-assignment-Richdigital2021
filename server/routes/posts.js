const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("category").sort({ createdAt: -1 });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("category");
  res.json(post);
});

router.post("/", async (req, res) => {
  console.log("DEBUG body:", req.body); // <-- this should show your sent data

  try {
    const { title, content, author, category } = req.body;

    // Lookup author and category by name
    const user = await User.findOne({ name: author });
    const categoryDoc = await Category.findOne({ name: category });

    if (!user || !categoryDoc) {
      return res.status(400).json({ message: "Invalid author or category" });
    }

    const newPost = new Post({
      title,
      content,
      author: user._id,
      category: categoryDoc._id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

module.exports = router;
