import express from "express"
import { Subscribe } from "../models/newsletter.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// @route POST /api/subscribees
// @desc Handle newsletter subscription
// @access Public

const handleSubscription = asyncHandler(async(req,res)=>{
    const { email } = req.body;

    if(!email){
        return res.status(400).json(
            {message: "Email is required"}
        )
    }

    try {
        let subscriber = await Subscribe.findOne({ email });

        if(subscriber){
            return res.status(400).json({message : "email is already subscribed"});
        }

        // Create a new subscriber
        subscriber = new Subscribe({ email });
        await subscriber.save();

        res.status(201).json({ message: "Successfully subscribed to the newslatter! "})
    } catch (error) {
        console.error(error);
        res.staus(500).json({ message: "Server Error"})
    }
})

export {handleSubscription}