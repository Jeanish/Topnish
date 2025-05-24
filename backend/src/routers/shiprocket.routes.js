import express from "express"
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { trackShipment } from "../controller/shiprocket.controller.js"
const router = express.Router();

router.get("/track/:shipmentId",verifyJWT ,trackShipment);

export default router;