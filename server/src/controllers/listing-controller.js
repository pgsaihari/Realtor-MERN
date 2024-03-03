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