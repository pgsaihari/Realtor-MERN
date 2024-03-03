import { errorHandler } from "../utils/error.js"
import Listing from '../models/listing-model.js'
export const createListing=async(req,res,next)=>{
    try {
        const listing=await Listing.create(req.body)
            console.log("listing created")
            return res.status(201).send(listing)
       
        
    } catch (error) {
        console.log(error)
        return next(errorHandler(500,"Error :500 ,failed to create List"))
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return res.status(404).send({success:false,message:"Listing not found"})
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
        console.log(error)
        return next(errorHandler(500,"Error :500 ,failed to delete list"))
    }
  };

  export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };


  export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
    
    } 