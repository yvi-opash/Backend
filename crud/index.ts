import  express, { Request, Response } from'express';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes"

const app = express()
app.use(express.json())

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is running on port = ${PORT}`);
    
})

app.use("/api/users", userRoutes)
mongoose.connect("mongodb://localhost:27017/crud")
    .then(() => console.log("mongodb Connected"))
    .catch((err: any) => console.error(err));

// app.get("/", (req : Request, res: Response) => {
//     res.send("server is running");
// });