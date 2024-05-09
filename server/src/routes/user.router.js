const express=require("express");
const {register,login, logout, getUser} = require("../controller/user.controller");
const isAuthenticated = require("../middlewares/auth");
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",isAuthenticated,logout)
router.get("/getuser", isAuthenticated, getUser);

module.exports=router;


