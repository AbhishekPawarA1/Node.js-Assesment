const express = require("express");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analyticsRoutes");


const app = express();

mongoose
  .connect("mongodb://localhost:27017/lms")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


app.use(express.json());

app.use("/analytics", analyticsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
