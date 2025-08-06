import * as dotenv from 'dotenv';

import connectDB from "./db/index.js"

// require('dotenv')configh({path:"./env"}) is line sai bhi km hojataba but best prac below  
dotenv.config({
    path:'./env'
})


connectDB();









// import mongoose from "mongoose";
// import { Db_Name } from "./constants";


// import express from "express"
// const app=express()

// ;(async()=>{
//     try{
//        await mongoose.connect(`${process.env.mongoDB_URL} /${Db_Name}`)
//        app.on("error", (error)=>{
//         console.error("Err",err)
//         throw err
//        })
//        app.listen(process.env.PORT,()=>{
//         console.log("app is listening at",process.env.PORT);
        
//        })
        

//     }catch(error){
//         console.error("Error:", err)
//         throw err
//     }
// })()