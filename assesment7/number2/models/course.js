const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  maxCapacity: { type: Number, required: true },
  days: [String],
});

module.exports = mongoose.model("Course", courseSchema);
