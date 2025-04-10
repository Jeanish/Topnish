import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { getLoggedInUser,getOrderDetailById } from '../controller/order.controller.js';

const router = Router();

router.route("/my-orders").get(verifyJWT,getLoggedInUser);
router.route("/:id").get(verifyJWT,getOrderDetailById);

export default router;