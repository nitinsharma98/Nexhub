const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    course:{
        type: String,
        required: true,
    },
    work:{
        type: String,
        required: true,
        enum: ["Internship", "Training", "Course Completion", "Work Experience"]
    },
    startDate: {
        type: Date,
        required: true,
    },
    weeks: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Date,
    },
});


certificateSchema.pre("save", function (next) {
  if (this.startDate && this.weeks) {
    const start = new Date(this.startDate);
    start.setDate(start.getDate() + this.weeks * 7);
    this.endDate = start;
  }
  next();
});


module.exports = mongoose.model("Certificate", certificateSchema);
