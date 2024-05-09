require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

console.log("Connecting to Database....");

 mongoose.connect(URI, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true
}).then(() => {
    console.log("Database Connected Successfully");
    
}).catch((error) => {
    console.error("DB connection failed", error);
    process.exit(1);
});



