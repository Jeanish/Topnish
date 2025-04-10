import express from "express"
import { trackShipment } from "../controller/shiprocket.controller.js"
const router = express.Router();

router.get("/track/:shipmentId", trackShipment);

export default router;