const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true }, // in hours
  maxCapacity: { type: Number, required: true },
  days: { type: [String], required: true },
});

module.exports = mongoose.model("Course", courseSchema);
