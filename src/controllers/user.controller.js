import jwt from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// upload on cloudinary
import { updloadOnCloudinary } from "../utils/cloudinary.js";
import { application } from "express";

const generateAccessAndRefreshTokens = async (userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // save refresh token in db for long times
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false });

        // return the access token and refresh token
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}

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


const loginUser = asyncHandler(async (req, res) =>{
    // input username and password
    // [validate username and password] 
    // request to server to match input details
    // if user !==> authenticate then return 
    // otherwise redirect to home page
    // save these details in acess token and refresh token
    // send cookie
    // send response

    const {email, username, password} = req.body;
    if(!(username || email)){
        throw new ApiError(400, "username or email is required");
    }
    // console.log(username, password)
    // check whether username or email exist or not in db 
    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    console.log(user)
    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    // compare password
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404, "Invalid user credentials")
    }

    // generating the access token and refresh token 
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    // modify the user object by excluding password and refreshToken
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse( 200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User LoggedIn Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json( new ApiResponse(200, {}, "User Logged Out Successfully"))

})

const refreshAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Access (refreshAccessToken)")
    }
    
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token (refreshAccessToken)")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken, newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || 
            "Invalid refresh token"
        )
    }
})


const changeCurrentPassword = asyncHandler(async (req, res) =>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false} )

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfully"))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}   