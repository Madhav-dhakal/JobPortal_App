const express=require("express");
const { getAllJobs, jobPost, getMyJobs, updateMyJob, deleteMyJob, getSingleJob } = require("../controller/job.controller");
const isAuthenticated = require("../middlewares/auth");
const router=express.Router();

router.get("/getAllJob",getAllJobs);
router.post("/jobPost",isAuthenticated,jobPost)
router.get("/getMyJob",isAuthenticated,getMyJobs)
router.put("/updateMyJob/:userId",isAuthenticated,updateMyJob)
router.delete("/deleteMyJob/:userId",isAuthenticated,deleteMyJob)
router.get("/:userId",isAuthenticated,getSingleJob)



module.exports=router;

