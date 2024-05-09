const express = require("express")
const app = express();
require("dotenv").config();
const cors=require("cors")
require("../config/dbCon.config")
const cloudinary=require('cloudinary')
const cookieParser=require("cookie-parser");
const fileUpload = require("express-fileupload");
const applicationRouter=require("../routes/application.router")
const userRouter=require("../routes/user.router")
const jobRouter=require("../routes/job.router")
cloudinary.v2.config({
     cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
     api_key:process.env.CLOUDINARY_CLIENT_API,
     api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})
    //body parser or middlewares
    app.use(express.json())
    app.use(express.urlencoded({
     extended:false  
    }))

    app.use(cookieParser())
    app.use(fileUpload({
     useTempFiles:true,
     tempFileDir:"/uploads"
    }))
    app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
    }))
    
     app.use("/api/v1/user",userRouter)
     app.use("/api/v1/job",jobRouter)
     app.use("/api/v1/application",applicationRouter)

   app.use('/health',(req,res,next)=>{
     res.send("success Ok")
   })
 
   
     //404 routes handling
     app.use((req,res,next)=>{
          next({code:404,message:"Not Found"})
          })

     // Garbage collector or error handling
     app.use((error,req,res,next)=>{
          console.log("garbage collector:",error);
          let code = error.code??500
          let message=error.message??"Internal server error";


          if(error.name === "CaseError"){
                    code=400;
                    message=`Resource not found ${error.path}`
          
          }

          if(error.name === 11000){
               code=400;
               message=`Duplicate${Object.keys(error.keyValue)} Entered`
     
     }

     if(error.name === "JsonWebTokenError"){
          code=400;
          message=`json web token invalid`

}

if(error.name === "TokenExpiredError"){
     code=400;
     message=`Token is expired. Try again`

}  

          res.status(error.code).json({
           success:false,
           message:message,
           meta:null
          })
     })

module.exports =app