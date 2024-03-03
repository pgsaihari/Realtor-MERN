import { errorHandler } from "../utils/error.js"

export const createListing=async(req,res,next)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return next(errorHandler(500,"Failed to creating"))
    }
}