import { ApiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req,res,next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            
            token = req.headers.authorization.split(" ")[1];
            
            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }
            
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decodedToken.user.id).select("-password");
            next();


        }catch(error){
            throw new ApiError(401, error?.message || "Invalid access token")
        }
    }else{
        res.status(401).json({message:"Not authorized, no token provided"})
    }  
    
})

export const admin = (req,res,next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:"Not authorized as an admin"});
    }
};