const ApplicantModel =require("../models/jobSeeker.application.model.js");
const catchAsyncErrors = require("../middlewares/catch.async.error.js");
const cloudinary = require("cloudinary");
const JobModel = require("../models/job.model.js");

//employer wants to lookUp/get all the applications send by Jobseeker
 const employerGetAllApplications = catchAsyncErrors(
     async (req, res, next) => {
       const { role } = req.user;
       if (role === "Job Seeker") {
         return next(
           {code:400,message:"Job Seeker are not allowed to get the application"}
         );
       }
       const { _id } = req.user;
       const applications = await ApplicantModel.find({ "employerID.user": _id });
       res.status(200).json({
         success: true,
         applications,
       });
     }
   );


//jobSeeker wants to lookUp/get all their own applications
   const jobSeekerGetAllApplications = catchAsyncErrors(
     async (req, res, next) => {
       const { role } = req.user;
       if (role === "Employer") {
         return next(
           {code:400,message:"Employer are not allowed to get the application"}
         );
       }
       const { _id } = req.user;
       const applications = await ApplicantModel.find({ "applicantID.user": _id });
       res.status(200).json({
         success: true,
         applications,
       });
     }
   );


   //can delete the application only by jobSeeker
    const jobseekerDeleteApplication = catchAsyncErrors(
     async (req, res, next) => {
       const { role } = req.user;
       if (role === "Employer") {
         return next(
           {code:400,message:"Employer are not allowed to delete application "}
         );
       }
       const { id } = req.params;
       const application = await ApplicantModel.findById(id);
       if (!application) {
         return next(
          {code:404,message:"Application not found!"}
     );
       }
       await application.deleteOne(); // doesnot return anything simply deleted
       res.status(200).json({
         success: true,
         message: "Application Deleted Sccessfully!",
       });
     }
   );



   //submitting the job application
   const postApplication = catchAsyncErrors(async (req, res, next) => {
     const {role} = req.user;
     if (role === "Employer") {
       return next(
         {code:400,message:"Employer are not allowed to submit application"}
       );
     }
     if (!req.files || Object.keys(req.files).length === 0) {
       return next(
          {code:400,message:"Resume File Required!" }
     );
     }
   
     const { resume } = req.files;
     const allowedFormats = ["image/png", "image/jpg","image/jpeg", "image/webp","image/gif"];
     if (!allowedFormats.includes(resume.mimetype)) {
       return next(
          {code:400,message:"Invalid file type. Please upload a png, jpeg, webp or gif file."}
       );
     }
     const cloudinaryResponse = await cloudinary.uploader.upload(
       resume.tempFilePath
     );
      console.log(cloudinaryResponse);
     if (!cloudinaryResponse || cloudinaryResponse.error) {
       console.error(
         "Cloudinary Error:",
         cloudinaryResponse.error || "Unknown Cloudinary error"
       );
       return next(
          {code:500,message:"Failed to upload Resume to Cloudinary"});
     }
     const { name, email, coverLetter, phone, address, jobId } = req.body;
     const applicantID = {
       user: req.user._id,
       role: "Job Seeker",
     };
     if (!jobId) {
       return next(
          {code:404,message:"Job not found!"}
     );
     }
     const jobDetails = await JobModel.findById(jobId);
     if (!jobDetails) {
       return next(
          {code:404,message:"Job not found!"}
     );
     }
   
     const employerID = {
       user: jobDetails.postedBy,
       role: "Employer",
     };
     if (
       !name ||
       !email ||
       !coverLetter ||
       !phone ||
       !address ||
       !applicantID ||
       !employerID ||
       !resume
     ) {
       return next(
          
          {code:400,message:"Please fill all fields."});
     }
     const application = await ApplicantModel.create({
       name,
       email,
       coverLetter,
       phone,
       address,
       applicantID,
       employerID,
       resume: {
         public_id: cloudinaryResponse.public_id,
         url: cloudinaryResponse.secure_url,
       },
     });
     res.status(200).json({
       success: true,
       message: "Application Submitted Successfully!",
       application,
     });
   });
   


   module.exports={employerGetAllApplications,jobSeekerGetAllApplications,jobseekerDeleteApplication,postApplication}