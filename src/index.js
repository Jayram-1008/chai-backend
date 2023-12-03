// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";
// First approach to connect the database 

/*
import express from "express";
const app = express();
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("My application is not able to talk to database")
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Application is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR: ",error)
    }
})()
*/

// Second way to connect the mongoose
dotenv.config({
    path: './env'
})

connectDB();