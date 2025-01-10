const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
const app = express();


app.use(express.json());
app.use("/api", courseRoutes);


mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });


const port = 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
