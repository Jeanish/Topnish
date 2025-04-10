import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { addItemInCart,updateCart,deleteCart,getCartOfLoggedInUser,mergeCart } from '../controller/cart.controllers.js';

const router = Router();

router.route("/").post(addItemInCart)
router.route("/").put(updateCart);
router.route("/").delete(deleteCart);
router.route("/merge").post(verifyJWT,mergeCart);
router.route("/").get(getCartOfLoggedInUser)
export default router