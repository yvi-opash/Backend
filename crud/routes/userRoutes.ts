import { Router, Request, Response, NextFunction } from "express";
import users from "../models/user"
import { error } from "node:console";
import { nextTick } from "node:process";

const router = Router();

router.get("/", async(req: Request, res: Response) => {
    const user = await users.find();
    res.json(user);
})


router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const user = await users.findById(req.params.id);
        if(!user){
           return res.status(404).json({error : "User not Found"})
        }
    res.json(user)
    }
    catch (error)
    {
        next(error);
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = new users(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) { 
    next(error);
  }
});


router.put("/:id", async(req : Request, res : Response, next :NextFunction) => {
  try{
     const user = await users.findByIdAndUpdate(req.params.id , req.body, {new:true})
      if(!user){
        return res.status(404).json({error : "User not Found........."});
      }
      res.json(user);
  }catch(error) {
    next(error);
  }
})

router.delete("/:id", async (req: Request, res : Response, next : NextFunction) => {
    try{
        const user = await users.findByIdAndDelete(req.params.id)
        if(!user){
           return res.status(404).json({error : "User not Found!!!!!!"})
        }
        res.json({message : "Successfully Deleted......"})
    }catch(error){
        next(error);
    }
})




export default router;