import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
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

export default router 