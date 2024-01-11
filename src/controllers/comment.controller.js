import mongoose from "mongoose";
import { Comment } from "../models/comment.model";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";


const getVideoComments = asyncHandler(async (req, res) => {
    // get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    const comments = [];
})

const addComment = asyncHandler(async (req, res) => {
    // Add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    // update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // delete a comment
})

export {
    getVideoComments,
    addComment,
    updateComment, 
    deleteComment
}