import express from "express"
import { deleteUserController, updateUserController } from "../controllers/user-controller.js"
import { verifyToken } from "../utils/verifyToken.js"

const router=express.Router()

router.get('/test',(req,res)=>{
    res.send({message:"hello"})
})
router.post('/update/:id',verifyToken,updateUserController)
router.delete('/delete/:id',verifyToken,deleteUserController)

export  {router as userRouter}