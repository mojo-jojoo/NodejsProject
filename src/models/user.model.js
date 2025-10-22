import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
        trim:true
    },
    coverImage:{
        type:String, //cloudinary url
        
    },
    watchHistory:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Video",
        default:[]

    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password must be at least 6 characters long"],
        select:false //do not return password field in queries by default

    },
    refreshToken:{
        type:String, 
        select:false //do not return refreshToken field in queries by default
    }
},{
    timestamps:true
})

//pre aik middleware hai jo save hone se pehle chalta hai or next ko call krta hai agye brhwane ke liye
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); //agr password modify nhi hua to agye brh jao
    this.password = await bcryptjs.hash(this.password,10);
    next(); 
});

//method to compare password
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password);
    }


userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {_id: this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        }, //payload
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )

    }


userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {_id: this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        }, //payload
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )

    }


export default mongoose.model("User", userSchema)

    