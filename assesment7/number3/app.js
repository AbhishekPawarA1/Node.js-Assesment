const express = require("express");
const mongoose = require("mongoose");

const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Learning Management System API!");
});

// API Routes
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/number3";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () =>
      console.log("Server running on http://localhost:3000")
    );
  })
  .catch((err) => console.error("Database connection error:", err));
