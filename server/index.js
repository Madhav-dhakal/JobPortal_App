const http= require('http'); 
const app=require("./src/config/express");
const server =http.createServer(app)
require("dotenv").config()
const PORT=process.env.PORT;


server.listen('3000','localhost',(err)=>{
     console.log(`server is running on port ${PORT}`);
     console.log("press ctrl+c to disconnect your server");
     console.log(`use http://localhost:${PORT}/ to browse your server`);
});

 
