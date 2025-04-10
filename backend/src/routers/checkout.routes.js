import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { checkOutSession,finalizeCheckout,payment } from '../controller/checkout.controller.js';

const router = Router();

router.route("/").post(verifyJWT,checkOutSession);
router.route("/:id/finalize").post(verifyJWT,finalizeCheckout)
router.route("/:id/pay").put(verifyJWT,payment)

export default router;
