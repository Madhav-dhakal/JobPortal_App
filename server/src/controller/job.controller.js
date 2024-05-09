const catchAsyncErrors = require("../middlewares/catch.async.error.js");
const JobModel = require("../models/job.model.js");

const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await JobModel.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

const jobPost = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next({
      code: 400,
      message: "Job Seeker are not allowed to Post the jobs.",
    });
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next({ code: 400, message: "Please provide full job details." });
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next({
      code: 400,
      message: "Please either provide fixed salary or ranged salary.",
    });
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next({
      code: 400,
      message: "Cannot Enter Fixed and Ranged Salary together.",
    });
  }

  const postedBy = req.user._id;
  const job = await JobModel.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next({
      code: 400,
      message: "Job Seeker are not allowed to access this .",
    });
  }
  const myJobs = await JobModel.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

const updateMyJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next({
      code: 400,
      message: "Job Seeker are not allowed to update the jobs",
    });
  }
  const { userId } = req.params;
  let job = await JobModel.findById(userId);
  if (!job) {
    return next({ code: 404, message: "OOPS! Job not found." });
  }
  job = await JobModel.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated Successfully!",
    job,
  });
});

const deleteMyJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next({
      code: 400,
      message: "Job Seeker are not allowed to delete the jobs", 
    });
  }
  const { userId } = req.params;
  let job = await JobModel.findById(userId);
  if (!job) {
    return next({ code: 404, message: "OOPS! Job not found." });
  }
  job = await JobModel.findByIdAndDelete(userId); // returns deleted job
  res.status(200).json({
    success: true,
    message: "Job Deleted Successfully!",
  });
});

const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const job = await JobModel.findById(userId);
    if (!job) {
      return next({ code: 404, message: "Job not found." });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next({ code: 404, message: `Invalid ID / CastError` });
  }
});

module.exports = {
  getAllJobs,
  jobPost,
  getMyJobs,
  updateMyJob,
  deleteMyJob,
  getSingleJob,
};
