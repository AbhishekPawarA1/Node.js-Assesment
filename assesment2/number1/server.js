const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

const dbFolderPath = path.join(__dirname, "data"); 
const dbFilePath = path.join(dbFolderPath, "db.json"); 


if (!fs.existsSync(dbFolderPath)) {
  fs.mkdirSync(dbFolderPath);
}


if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify([]), "utf-8");
}


app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Learning Management System! Use /courses to add or fetch courses."
  );
});

app.post("/courses", (req, res) => {
  const newCourse = req.body;

  const courses = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));

  const newId = courses.length ? courses[courses.length - 1].id + 1 : 1;
  newCourse.id = newId;
  courses.push(newCourse);

  fs.writeFileSync(dbFilePath, JSON.stringify(courses, null, 2), "utf-8");

  res.json({
    message: "Course has been added successfully!",
    course: newCourse,
  });
});

app.get("/courses", (req, res) => {
  const courses = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
  res.json(courses);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
