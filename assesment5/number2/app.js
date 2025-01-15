const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
