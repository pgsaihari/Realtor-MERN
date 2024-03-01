import express from "express"

const router=express.Router()

router.get('/test',(req,res)=>{
    res.send({message:"hello"})
})

export  {router as userRouter}