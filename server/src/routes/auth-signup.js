import express from 'express'
import { signUpController } from '../controllers/sign-up-controller.js'

const router =express.Router()

router.post("/sign-up",signUpController)

export {router as SignUpRouter}