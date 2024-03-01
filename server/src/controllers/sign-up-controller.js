import User from "../models/user-model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js";
export const signUpController=async(req,res,next)=>{
  const {username,email,password}=req.body;

  const existingUser=await User.findOne({email})
  if(existingUser){
    res.status(201).send({success:false,message:"email is already registered!"})
  }
  const hashedPassword=bcrypt.hashSync(password,10)
  const newUser=new User({
    username,email,password:hashedPassword
  })
  await newUser.save().then(()=>{
    console.log("new user signed in")
    res.status(201).send(newUser)
  }).catch((e)=>{
   return next(errorHandler(401,"something went wrong"))
  })
}