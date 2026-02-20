import { Router, Request, Response } from "express";
import { createPost, getPostWithComments } from "../services/postService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const post = await createPost(req.body);
  res.json(post);
});

router.get("/:id", async (req: Request, res: Response) => {
  const result = await getPostWithComments(String(req.params.id));
  res.json(result);
});

export default router;
