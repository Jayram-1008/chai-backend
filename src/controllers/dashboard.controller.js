import { asyncHandler } from "../utils/asyncHandler";

const getChannelStatus = asyncHandler(async (req, res) => {
        // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // get all the videos uploaded by the channel
})

export {
    getChannelStatus,
    getChannelVideos
}