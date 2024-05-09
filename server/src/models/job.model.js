const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minLength: 3,
    maxLength: 30,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    minLength: 30,
    maxLength: 500,
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    min: 25,
  },
  fixedSalary: {
    type: Number,
    minLength: 4,
    maxLength: 9,
  },
  salaryFrom: {
    type: Number,
    minLength:4,
    maxLength:9,
  },
  salaryTo: {
    type: Number,
    minLength: 4,
    maxLength: 9,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const JobModel = mongoose.model("Job", jobSchema);
module.exports=JobModel;