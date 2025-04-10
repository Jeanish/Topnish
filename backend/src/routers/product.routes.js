import {Router} from 'express'
import {getPublicProducts,singleProductById,addProduct,similarProduct,updateproduct,deleteProduct ,latestProduct, getRandomBestSeller} from '../controller/product.controller.js'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { getAllProducts } from '../controller/ProductAdmin.controller.js';

const router = Router();

router.route("/").get(getPublicProducts)
router.route("/").post(verifyJWT,admin,addProduct)
router.route("/new-arrivals").get(latestProduct)
router.route("/similar/:id").get(getAllProducts)
router.route("/bestSeller").get(getRandomBestSeller)
router.route("/:id").put(verifyJWT,admin,updateproduct)
router.route("/:id").delete(verifyJWT,admin,deleteProduct)
router.route("/:id").get(singleProductById)

export default router