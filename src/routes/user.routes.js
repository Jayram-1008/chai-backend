import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        }, 
        {
            name: 'coverImage',
            maxCount: 1
        },
    ]),
    registerUser
    )
    //(upload) ==> here we are using middleware to validate the user fields
     //(registerUser) ==> this argumet is for refering the routes the the registerUsers 


// router.route("/login").post(login)
router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJWT, logoutUser)

export default router 