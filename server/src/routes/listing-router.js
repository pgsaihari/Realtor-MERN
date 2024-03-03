import express from 'express'
import { createListing } from '../controllers/listing-controller.js'
const router=express.Router()
router.get('/create',createListing)

export {router as ListingRouter}