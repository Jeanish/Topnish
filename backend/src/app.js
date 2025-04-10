import express from "express";  
import cors from "cors"
import cookieParser from "cookie-parser"
// import router from "./routers/user.routes";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public")) //public is only folder name
app.use(cookieParser());

import userRoute from "./routers/user.routes.js"
import productRoute from "./routers/product.routes.js"
import cartRoute from "./routers/cart.routes.js"
import checkOutRoute from "./routers/checkout.routes.js"
import orderRoute from "./routers/orders.routes.js"
import uploadRoute from "./routers/upload.routes.js"
import subscribeRoute from "./routers/subscribe.routes.js"
import adminRoute from "./routers/admin.route.js"
import productAdminRoute from "./routers/productAdmin.routes.js"
import orderAdminRoute from "./routers/orderAdmin.routes.js"
import shipRocketRoute from "./routers/shiprocket.routes.js"

app.use("/api/v1/users",userRoute)
app.use("/api/v1/products",productRoute)
app.use("/api/v1/carts",cartRoute)
app.use("/api/v1/checkout",checkOutRoute)
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/upload",uploadRoute)
app.use("/api/v1/",subscribeRoute)
app.use("/api/shiprocket",shipRocketRoute)
// admin case
app.use("/api/v1/admin/users",adminRoute)
app.use("/api/v1/admin/products",productAdminRoute)
app.use("/api/v1/admin/orders",orderAdminRoute)


app.get("/",(req,res)=>{
    res.end("Home page")
})
// all main routes will come


export {app}