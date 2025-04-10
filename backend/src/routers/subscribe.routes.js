import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { handleSubscription } from '../controller/subscriber.controller.js';

const router = Router();

router.route("/subscribe").post(handleSubscription);

export default router;