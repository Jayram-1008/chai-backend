import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
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
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("Mongo DB connection failed !!!", err);
})


