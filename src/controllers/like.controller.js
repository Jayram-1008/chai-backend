import { asyncHandler } from "../utils/asyncHandler";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    // toggle like on video
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    // toggle like on comment
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    // toggle like on tweet
})

const getLikedVideos = asyncHandler(async (req, res) => {
    // get all liked videos
})

const getAllLike = asyncHandler(async (req, res) =>{
    // get all like on video or comment or tweets
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    getAllLike
}