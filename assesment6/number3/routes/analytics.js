const express = require("express");
const { getDB } = require("../config");

const router = express.Router();

router.get("/engagement", async (req, res) => {
  const db = await getDB();
  const collection = db.collection("users");

  const result = await collection
    .aggregate([
      { $unwind: "$preferences" },
      { $group: { _id: "$preferences", totalPreferences: { $sum: 1 } } },
      { $project: { _id: 0, preference: "$_id", totalPreferences: 1 } },
      { $sort: { totalPreferences: -1 } },
      { $skip: parseInt(req.query.skip) || 0 },
      { $limit: parseInt(req.query.limit) || 10 },
    ])
    .toArray();

  res.json(result);
});

router.get("/summary", async (req, res) => {
  const db = await getDB();
  const userCollection = db.collection("users");
  const courseCollection = db.collection("courses");

  const userResult = await userCollection
    .aggregate([
      {
        $group: {
          _id: "$role",
          userCount: { $sum: 1 },
          averageCourses: { $avg: { $size: "$coursesEnrolled" } },
          mostCommonPreference: { $push: "$preferences" },
        },
      },
      {
        $addFields: {
          mostCommonPreference: {
            $arrayElemAt: [
              {
                $reduce: {
                  input: "$mostCommonPreference",
                  initialValue: [],
                  in: { $concatArrays: ["$$value", "$$this"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          role: "$_id",
          userCount: 1,
          averageCourses: 1,
          mostCommonPreference: 1,
        },
      },
    ])
    .toArray();

  const courseResult = await courseCollection
    .aggregate([
      {
        $group: {
          _id: "$category",
          averageEnrollment: { $avg: "$enrollmentCount" },
          maxEnrollment: { $max: "$enrollmentCount" },
          totalActiveCourses: { $sum: 1 },
        },
      },
      { $sort: { averageEnrollment: -1 } },
    ])
    .toArray();

  res.json({ users: userResult, courses: courseResult });
});

router.get("/custom-report", async (req, res) => {
  const db = await getDB();
  const collection = db.collection("courses");

  const query = req.query.filter || {};
  const sortBy = req.query.sortBy || "createdAt";

  const result = await collection
    .aggregate([
      { $match: query },
      { $addFields: { enrollmentCount: { $ifNull: ["$enrollmentCount", 0] } } },
      { $sort: { [sortBy]: 1 } },
      { $skip: parseInt(req.query.skip) || 0 },
      { $limit: parseInt(req.query.limit) || 10 },
    ])
    .toArray();

  res.json(result);
});

module.exports = router;
