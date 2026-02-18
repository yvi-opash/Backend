import { Router, Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get("/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate("author");
  const comments = await Comment.find({ post: req.params.id }).populate("user");
  res.json({ post, comments });
});

export default router;
