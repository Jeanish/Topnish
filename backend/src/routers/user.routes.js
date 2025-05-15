import {Router} from 'express'
import { login,register,profile, sendOTPHandler, verifyOTP } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { otpRateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/profile").get(verifyJWT,profile)
router.route("/send-otp").post(otpRateLimiter,sendOTPHandler)
router.route("/verify-otp").post(otpRateLimiter, verifyOTP)



export default router