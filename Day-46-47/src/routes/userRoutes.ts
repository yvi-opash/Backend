import { Router, Request, Response } from "express";
import { createUser, getUserPosts } from "../services/userService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.json(user);
});

router.get("/:id/posts", async (req: Request, res: Response) => {
  const posts = await getUserPosts(req.params.id);
  res.json(posts);
});

export default router;
