import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { getAllOrder, updateOrder, deleteOrder} from '../controller/OrderAdmin.controller.js';

const router = Router();

router.route("/").get(verifyJWT,admin,getAllOrder)
router.route("/:id").put(verifyJWT,admin,updateOrder)
router.route("/:id").delete(verifyJWT,admin,deleteOrder)

export default router