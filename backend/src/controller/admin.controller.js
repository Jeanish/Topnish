import express from "express"
import { User } from "../models/user.model.js"
import { verifyJWT,admin } from "../middleware/auth.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.utils.js"
// @route GET /api/admin/users
// @desc Get all users (Admin Only)

const getAllUser = asyncHandler(async(req,res)=>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
    }
})

// @route POST 
const addNewUser =asyncHandler(async(req,res)=>{
    const {username,email,password, role} = req.body

    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User already existed "});
        }
        user = new User({
            username,
            email,
            password,
            role: role|| "customer",

        });

        await user.save();
        res.status(201).json({ message:"User created successfuly",user})
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
    }
})

// @route PUT /api/admin/users/:id 
// desc Update user info (admin only) - NAME,EMAIL AND ROLE
// @access Private/ADMIN

const updateUserInfo = asyncHandler(async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.role = req.body.role || user.role
        }

        const updateUser = await user.save();
        res.json({ message: "User updated successfully",user:updateUser})
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
    }
})

// @route DELETE /api/admin/users/:id
// @desc DELETE A USER

const deleteUser = asyncHandler(async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({ message: "User deleted successfully"});
        }else{
            res.status(404).json({ message: "User not found"});
        }
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
        
    }
})

export {getAllUser,addNewUser, updateUserInfo, deleteUser
}