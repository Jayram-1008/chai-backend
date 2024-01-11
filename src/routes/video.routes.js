import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middleware";
import { 
    deleteVideo, 
    getAllVideos, 
    getVideoById, 
    publishVideo, 
    togglePublishStatus, 
    updateVideo 
} from "../controllers/video.controller";

const router  = Router();
router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file

router.route("/").get(getAllVideos);

router
    .route("/")
    .post(upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
        ]),
        publishVideo
    );


router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);
 
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);


export default router
        