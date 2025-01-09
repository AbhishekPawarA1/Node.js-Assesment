const express = require("express");
const fs = require("fs");
const path = require("path"); // For handling file paths

const app = express();
const PORT = 3001;

// Path for db.json inside the 'data' folder
const dbFolderPath = path.join(__dirname, "data"); // Ensures 'data' folder is in the project directory
const dbFilePath = path.join(dbFolderPath, "db.json"); // Path to 'db.json' inside 'data' folder

// Ensure the 'data' folder exists
if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath);
}

// Initialize db.json with an empty array if it doesn't exist
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify([]), "utf-8");
}

// Middleware for parsing JSON requests
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Learning Management System! Use /courses to add or fetch courses."
  );
});

// POST route to add a course
app.post("/courses", (req, res) => {
  const newCourse = req.body;

  // Read the current contents of db.json
  const courses = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

  // Add the new course with a unique ID
  const newId = courses.length ? courses[courses.length - 1].id + 1 : 1;
  newCourse.id = newId;
  courses.push(newCourse);

  // Write the updated courses list to db.json
  fs.writeFileSync(dbFilePath, JSON.stringify(courses, null, 2), "utf-8");

  res.json({
    message: "Course has been added successfully!",
    course: newCourse,
  });
});

// GET route to fetch all courses
app.get("/courses", (req, res) => {
  const courses = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
  res.json(courses);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
