import express from 'express'
import { signUpController,signInController,googleController, signOut } from '../controllers/auth-controller.js'

const router =express.Router()

router.post("/sign-up",signUpController)
router.post('/sign-in',signInController)
router.post('/google',googleController)
router.get('/sign-out',signOut)
export {router as authRouter}