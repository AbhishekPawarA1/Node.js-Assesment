const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const analyticsRoutes = require("./routes/analytics");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/analytics", analyticsRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the LMS Analytics API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
