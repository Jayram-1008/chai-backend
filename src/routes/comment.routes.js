import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file
router.route("/:videoId").get(getVideoComments).post(addComment)
