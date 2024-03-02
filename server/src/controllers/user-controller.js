import { errorHandler } from "../utils/error.js"
import User from "../models/user-model.js"
import bcryptjs from "bcryptjs"
export const test=(req,res)=>{
    res.send({message:"hi"})
}

export const updateUserController=async(req,res,next)=>{
    try {
        if(req.params.id!==req.user.id){
            return res.status(201).send({success:false,message:"something went wrong ! unauthorized token.. sign in again",flag:false})
        }
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
              },
            },
            { new: true }
          );
      
          const { password:pass, ...rest } = updatedUser._doc;
          res.status(200).send(rest)
    } catch (error) {
        console.log(error)
        return next(errorHandler(500,'Updating user failed'))
    }
}