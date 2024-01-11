import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { createTweet, 
    deleteTweet, 
    getUserTweets, 
    updateTweet 
} from "../controllers/tweet.controller";

const router = Router();
router.use(verifyJWT)

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets)

router.route("/:tweetId")
    .patch(updateTweet)
    .delete(deleteTweet);

export default router 