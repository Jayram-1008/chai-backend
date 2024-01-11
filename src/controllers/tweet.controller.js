import mongoose from "mongoose"; 
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(async (req, res) => {
    // create tweet
})

const getUserTweets = asyncHandler(async (req, res) => {
    // get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    // update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    // delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}