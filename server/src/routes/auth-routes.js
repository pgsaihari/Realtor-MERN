import express from 'express'
import { signUpController,signInController } from '../controllers/auth-controller.js'

const router =express.Router()

router.post("/sign-up",signUpController)
router.post('/sign-in',signInController)
export {router as SignUpRouter}