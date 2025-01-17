const express = require("express");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/lmsAnalytics", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/analytics", analyticsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
