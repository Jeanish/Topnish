import mongoose,{Schema} from "mongoose";

const checkOutItemSchema = new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
      },
      color: {
        type: String,
      }
},{_id:false});

const checkOutSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    checkOutItems:[checkOutItemSchema],
    shippingAddress: {
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        postalCode:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
    },
    paymentMethod: {
        type:String,
        enum:["Cash On Delivery"],
        required:true,
    },
    totalPrice: {
        type:Number,
        required:true,
    },
    isPaid:{
        type:Boolean,
        default: function () {
            return this.PaymentMethod === "Cash On Delivery" ? false : true;
        },
    },
    paidAt: {
        type: Date,
    },
    paymentStatus: {
        type:String,
        default: function () {
            return this.PaymentMethod === "Cash On Delivery" ? "COD Pending" : "Pending";
        },
    },
    paymentDetails: {
        type:Schema.Types.Mixed,
    },
    isFinalized: {
        type:Boolean,
        default: false,
    },
    finalizedAt: {
        type:Date,
    },
    phone: {
        type: Number,
        required: true,

    }
    
},{timestamps:true});

export const CheckOut = mongoose.model("CheckOut", checkOutSchema);
