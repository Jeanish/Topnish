import dotenv from "dotenv"
import ConnectDB from "./config/connection.js"
import { app } from "./app.js"

dotenv.config({
    path:"./.env"
})

ConnectDB().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running on localhost:${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("mongodb connection error",error);
})