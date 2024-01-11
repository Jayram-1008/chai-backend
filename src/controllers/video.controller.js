import { asyncHandler } from "../utils/asyncHandler";

const getAllVideos = asyncHandler(async (req, res) => {
    const {page = 1, limit = 10, query, sortBy, sortType, userId} = req.query
    // get all videos based on query, sort, pagination
})

const publishVideo = asyncHandler(async (req, res) => {
    const {title, description} = req.body
    // get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    // get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    // update video details like title, description, thumbnail
})

const deleteVideo = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    // delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const {videoId} = req.params
})

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus

}