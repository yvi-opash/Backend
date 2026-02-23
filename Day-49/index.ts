import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./src/models/user.model";
import { authenticate, AuthRequest } from "./src/middleware/auth.middleware";
import { authorizeRoles } from "./src/middleware/role.middleware";

const app = express();
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/rbac-ts")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));



app.post("/register", async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role,
  });

  res.json(user);
});





app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );

  res.json({ token });
});





app.get("/profile", authenticate, (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});


app.get(
  "/admin",
  authenticate,
  authorizeRoles("admin"),
  (req: AuthRequest, res: Response) => {
    res.json({ message: "Admin Dashboard" });
  }
);


app.get(
  "/manager",
  authenticate,
  authorizeRoles("admin", "manager"),
  (req: AuthRequest, res: Response) => {
    res.json({ message: "Manager Dashboard" });
  }
);

app.listen(5000, () => console.log("Server running on port 5000"));