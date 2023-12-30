import mongoose, {Schema} from "mongoose";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName: {
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar: {
            type:String, //cloudinary url
            required:true,
        },
        coverImage: {
            type:String
        },
        watchHistory: {
            type:Schema.Types.ObjectId,
            ref: "Video"
        },
        password: {
            type: String,
            required: [true,'Password is required'],
        },
        refreshToken:{
            type: String
        }

    },
    {
        timestamps:true
    }
)

//middleware to encrypt the password before the save operation
userSchema.pre("save", async function(next) {
    // execute this middleware when password is modifing otherwise it will return as same 
    if(! this.isModified("password")) return next() ;

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

// it compare the encrypted password with new enterd password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// generate the our access token secret key 
userSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
            _id: this._id,
            email: this.email,
            usename: this.usename,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generate the our refress token secret key 
userSchema.methods.generateRefreshToken = function(){
    return Jwt.sign( 
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);