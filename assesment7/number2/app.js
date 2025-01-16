const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api", courseRoutes);
app.use("/api", userRoutes);

// Default route for '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API!");
});

mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => {
    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  })
  .catch((err) => console.error("Database connection error:", err));
