import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    code: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
    subscribedAt: {
        type:Date,
        default: Date.now,

    }
})

export const Subscribe = mongoose.model("Subscribe", subscriberSchema);
