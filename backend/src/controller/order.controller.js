import express from "express"
import {Order} from "../models/order.model.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.utils.js"

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private

const getLoggedInUser = asyncHandler(async(req,res)=>{
    try {
        const orders = await Order.find({ user: req.user._id}).sort({
            createdAt: -1,
        })

        res.json(orders);
    } catch (error) {
        throw new ApiError(500,"Server Error");
    }
});

// @route GET /api/orders/:id
// @desc vGet order detail by ID
// @access Private

const getOrderDetailById = asyncHandler(async(req,res)=> {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            throw new ApiError(404, "Order not found");
        }

        res.json(order);
    } catch (error) {
        // console.log();
        throw new ApiError(500, "Server error");

    }
})

export {
    getLoggedInUser,getOrderDetailById
}