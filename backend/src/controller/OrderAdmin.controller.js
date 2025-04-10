import express from "express"
import { Order } from "../models/order.model.js"
import { verifyJWT,admin } from "../middleware/auth.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.utils.js"
const getAllOrder = asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find().populate("user","username email");
  
      const totalOrders = orders.length;
  
      const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  
      res.json({
        orders,
        totalOrders,
        totalSales,
      });
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Server Error");
    }
  });
  

// @route PUT /api/admin/orders/:id

const updateOrder = asyncHandler(async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user","username");
        if(order){

            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true: order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder)
        }else{
            res.status(404).json({ message: "Order not found"});
        }
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
    }
});

// @route DELETE /api/admin/orders/:id
const deleteOrder = asyncHandler(async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message: "Order removed"});
        }else{
            res.status(404).json({message: "Order not found"})
        }
    } catch (error) {
        console.error(error);
        throw new ApiError(500,"Server Error");
    }
})

export { getAllOrder, updateOrder, deleteOrder}