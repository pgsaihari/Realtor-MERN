import User from "../models/user-model.js"
import bcrypt from "bcryptjs"
export const signUpController=async(req,res)=>{
  const {username,email,password}=req.body;
  const hashedPassword=bcrypt.hashSync(password,10)
  const newUser=new User({
    username,email,password
  })
  await newUser.save().then(()=>{
    console.log("new user signed in")
    res.status(201).send("new user created successfully")
  }).catch((e)=>{
    res.status(500).send(e)
  })
}