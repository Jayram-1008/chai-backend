import { asyncHandler } from "../utils/asyncHandler";

const healthcheck = asyncHandler(async (req, res) => {
    // build a healthcheck reaponse that simply return the OK status as json with a message
})

export {
    healthcheck
}