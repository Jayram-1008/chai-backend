import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { 
    getChannelStatus, 
    getChannelVideos 
} from "../controllers/dashboard.controller";

const router = Router();
router.use(verifyJWT)

router.route("/status").get(getChannelStatus)
router.route("/videos").get(getChannelVideos)

export default router
