import mongoose, { Schema } from 'mongoose';

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountAmount: { type: Number, required: true },
  expired: { type: Boolean, default: false },
  expirationDate: { type: Date },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export { Coupon };
