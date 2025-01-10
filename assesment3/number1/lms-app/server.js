const express = require("express");
const courseRoutes = require("./routes");

const app = express();
const PORT = 3000;

// Logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use routes
app.use("/", courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
