exports.validateCourseData = (courseData) => {
  const { title, description, level, enrollments } = courseData;
  if (!title || !description || !level || typeof enrollments !== "number") {
    throw new Error("Invalid course data");
  }
};
