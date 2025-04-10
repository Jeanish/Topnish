import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { getAllProducts } from '../controller/ProductAdmin.controller.js';

const router = Router()

router.route("/").get(verifyJWT,admin,getAllProducts);

export default router;