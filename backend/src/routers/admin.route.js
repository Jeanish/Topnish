import {Router} from 'express'
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { getAllUser,addNewUser, updateUserInfo, deleteUser } from '../controller/admin.controller.js';

const router = Router();

router.route("/").get(verifyJWT,getAllUser)
router.route("/").post(verifyJWT,admin,addNewUser)
router.route("/:id").put(verifyJWT,admin,updateUserInfo)
router.route("/:id").delete(verifyJWT,admin,deleteUser)

export default router