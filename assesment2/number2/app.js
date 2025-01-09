const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3030;


app.use(bodyParser.json());

let courses = [
  { id: 1, name: "Math 101", description: "Basic Mathematics" },
  { id: 2, name: "History 101", description: "Basic History" },
];

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses[courseIndex] = { id: parseInt(id), name, description };
  res
    .status(200)
    .json({
      message: "Course updated successfully",
      course: courses[courseIndex],
    });
});

app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;


  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }


  courses.splice(courseIndex, 1);
  res.status(200).json({ message: "Course deleted successfully" });
});


app.get("/", (req, res) => {
  res.send("Welcome to the LMS Application!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
