import mongoose,{Schema} from "mongoose";

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true,
    },
    discountPrice:{
        type:Number,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    sku:{
        type:String,
        unique:true,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
    },

    sizes:{
        type:[String],
        required:true,
    },

    colors:{
        type:[String],
        required:true

    },
    collections:{
        type:String,
        required:true

    },
    images:[{
        url:{
            type:String,
            required:true

        },
        altText:{
            type:String
        }
    }],

    isFeatured:{
        type:Boolean,
        default:false,
    },

    isPublished:{
        type:Boolean,
        default:false,
    },

    tags:[String],

    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    dimensions:{
        length:Number,
        width:Number,
        height:Number
    },


},{timestamps:true})

export const Product = mongoose.model("Product", ProductSchema);
