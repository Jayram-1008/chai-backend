import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// upload on cloudinary
import { updloadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async(req, res)=>{
    // get user  details from frontend 
    // validation - not empty
    // check if users already exists: username & email

    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return response

    const {fullName, email, username, password} = req.body

    // it is used for check if anyone fields is empty then throw an error
    if(
        [fullName, email, username, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    // checking existing user from db
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files)
    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) {
        coverImageLocalPath = req.files.coverImage[0].path;
        
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
     
    const avatar = await updloadOnCloudinary(avatarLocalPath)
    const coverImage = await updloadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }
    
    const user = await User.create({
        fullName, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register Successfully")
    )

})

export {registerUser}