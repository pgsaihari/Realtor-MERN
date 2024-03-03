import express from "express"
import { deleteUserController, getUser, getUserListings, updateUserController } from "../controllers/user-controller.js"
import { verifyToken } from "../utils/verifyToken.js"

const router=express.Router()

router.get('/test',(req,res)=>{
    res.send({message:"hello"})
})
router.post('/update/:id',verifyToken,updateUserController)
router.delete('/delete/:id',verifyToken,deleteUserController)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id', verifyToken, getUser)

export  {router as userRouter}