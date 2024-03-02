import express from "express"
import { updateUserController } from "../controllers/user-controller.js"

const router=express.Router()

router.get('/test',(req,res)=>{
    res.send({message:"hello"})
})
router.post('/update/:id',updateUserController)

export  {router as userRouter}