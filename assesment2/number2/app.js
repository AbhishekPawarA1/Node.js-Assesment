const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3030;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Dummy course data for demonstration (you would typically fetch this from a database)
let courses = [
  { id: 1, name: "Math 101", description: "Basic Mathematics" },
  { id: 2, name: "History 101", description: "Basic History" },
];

// 1. Update Course (PUT Route)
app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Find course by ID
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Update course details
  courses[courseIndex] = { id: parseInt(id), name, description };
  res
    .status(200)
    .json({
      message: "Course updated successfully",
      course: courses[courseIndex],
    });
});

// 2. Delete Course (DELETE Route)
app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;

  // Find course by ID
  const courseIndex = courses.findIndex((course) => course.id === parseInt(id));
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Remove course
  courses.splice(courseIndex, 1);
  res.status(200).json({ message: "Course deleted successfully" });
});

// 3. Error Handling - Basic error handling is implemented within the above routes.

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the LMS Application!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
