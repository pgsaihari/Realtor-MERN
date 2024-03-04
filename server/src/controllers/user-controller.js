import { errorHandler } from "../utils/error.js"
import User from "../models/user-model.js"
import bcryptjs from "bcryptjs"
import Listing from "../models/listing-model.js"
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

export const deleteUserController = async (req, res, next) => {
    if (req.params.id!==req.user.id)
      return res.status(201).send({success:false,message:"You can Only delete your own account!"})
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      console.log(error)
      return next(errorHandler(500,"Deletion Failed"))
    }
  };


  // get user listing
  
  export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        if(listings.length===0){
          return res.status(201).send({success:false,message:"User has not created any Listings"})
        }
        res.status(200).send(listings)
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };

  export const getUser = async (req, res, next) => {
    try {
  
      const user = await User.findById(req.params.id);
  
      if (!user) return next(errorHandler(404, 'User not found!'));
  
      const { password: pass, ...rest } = user._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error)
    }
  };