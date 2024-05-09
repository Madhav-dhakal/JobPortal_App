const express=require("express")
const isAuthenticated = require("../middlewares/auth");
const { jobSeekerGetAllApplications, employerGetAllApplications, jobseekerDeleteApplication, postApplication } = require("../controller/jobSeeker.application.controller");
const router=express.Router();

router.post("/postApplication", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobSeekerGetAllApplications);
router.delete("/deleteApplication/:id", isAuthenticated, jobseekerDeleteApplication);

module.exports=router;

