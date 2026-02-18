import { Router, Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id/posts", async (req: Request, res: Response) => {
  const posts = await Post.find({ author: req.params.id }).populate("author");
  res.json(posts);
});

export default router;
