import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

// * USER REGISTRATION & SEND OTP**
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //  Validate input fields
    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    //  Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    //  Create user (Unverified)
    const user = await User.create({
        username: username,
        email,
        password,
        isVerified: false,  // Initially unverified
    });

    const payload = { user: {id: user._id,role: user.role} };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60d" },(err, token) => {
        if(err) throw err;

        return res.status(201).json({
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role,
            },
            token,
        })
    });


    // return res.status(201).json(new ApiResponse(201, { email }, "Registration of user successfully "));
});


// ** LOGIN USER (If already verified)**
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //  Validate input fields
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "User is not registered");
    }

    //  Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    //  Generate JWT Token (Valid for 7 days)
    const payload = { user: {id: user._id,role: user.role} };


    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60d" },(err, token) => {
        if(err) throw err;

        return res.status(201).json({
            user:{
                _id:user._id,
                name:user.username,
                email:user.email,
                role:user.role,
            },
                token,
        })
    });
    // console.log(token);
    
    
    // if(!token){
    //     res.status(404).send("Token is not found");
    // }
    // //  Remove sensitive data before sending response
    // const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // return res.status(200).json(new ApiResponse(200, { user: loggedInUser, token }, "Login successful. Redirecting to home page..."));
});

const profile = asyncHandler(async(req,res)=>{
    return res.json(req.user);
})

export { register,  login,profile };

