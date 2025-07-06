const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });
  res.json(comments);
});

router.post("/:postId", async (req, res) => {
  const comment = new Comment({ ...req.body, postId: req.params.postId });
  await comment.save();
  res.status(201).json(comment);
});

module.exports = router;
