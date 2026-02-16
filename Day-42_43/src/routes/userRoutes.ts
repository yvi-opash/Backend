import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const filePath = path.join(__dirname, "../data/users.json");



//  GET all users
router.get("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  res.json(JSON.parse(data));
});



//  GET single user
router.get("/:id", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);

  const user = users.find((u: any) => u.id == req.params.id);

  res.json(user);
});



//  CREATE user
router.post("/", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);

  const newUser = {
    id: Date.now(),
    ...req.body
  };

  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.json(newUser);
});



//  UPDATE user
router.put("/:id", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);

  const index = users.findIndex((u: any) => u.id == req.params.id);

  users[index] = { ...users[index], ...req.body };

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.json(users[index]);
});



//  DELETE user
router.delete("/:id", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  let users = JSON.parse(data);

  users = users.filter((u: any) => u.id != req.params.id);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.json({ message: "deleted" });
});

export default router;
