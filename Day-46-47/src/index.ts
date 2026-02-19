import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();
const PORT = 5000;

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


mongoose.connect("mongodb://localhost:27017/relationships")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running...");
});

