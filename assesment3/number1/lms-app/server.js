const express = require("express");
const courseRoutes = require("./routes");

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use("/", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
