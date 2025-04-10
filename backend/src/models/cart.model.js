import mongoose,{Schema} from "mongoose";

const CartItemSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    name:String,
    image: String,
    price: String,
    size:String,
    color: String,
    quantity:{
        type:Number,
        default:1,
    },
},{_id: false})


const CartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    guestId:{
        type:String,
    },
    products:[CartItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
},{timestamps:true})

// CartSchema.index({ guestId: 1 }, { unique: true, sparse: true });


export const Cart = mongoose.model("Cart", CartSchema);