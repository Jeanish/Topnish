import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],

    },

    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    avatar:{
        type:String,
    },

    refreshToken:{
        type:String,
    }

},{timestamps:true})

UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
