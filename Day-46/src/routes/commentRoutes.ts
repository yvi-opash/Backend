import { Router, Request, Response } from "express";
import Comment from "../models/Comment";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

export default router;
