import * as dotenv from 'dotenv';
import connectDB from "./db/index.js"
import {app as application} from "./app.js"


// require('dotenv')configh({path:"./env"}) is line sai bhi km hojataba but best prac below  
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    application.listen(process.env.PORT || 8000,()=>{
        console.log("server is running at:",process.env.PORT);
    })
}

).catch((err)=>{
    console.log("mongo db connection failed!!",err);
    

})



// yh nichy yah tou ayse database likh lo lakin yh best practice nahi ha
// is liye keh rahe hain keh apne env file mein rakh lo
// require('dotenv').config()      db k folder mein connection bnao phir yaha import krlo then use kro jaise upr hua wa ha 



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