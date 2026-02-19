import { Router, Request, Response } from "express";
import { createComment } from "../services/commentService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const comment = await createComment(req.body);
  res.json(comment);
});

export default router;
