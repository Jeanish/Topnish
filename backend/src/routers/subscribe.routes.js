import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { handleSubscription } from '../controller/subscriber.controller.js';
import validateCoupan from '../controller/coupan.controller.js';
import { otpRateLimiter } from '../middleware/rateLimiter.middleware.js';
const router = Router();

router.route("/subscribe").post(otpRateLimiter,handleSubscription);
router.route("/validate").post(otpRateLimiter,validateCoupan);

export default router;