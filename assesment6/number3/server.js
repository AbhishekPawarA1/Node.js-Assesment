const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/lms";

let client;

async function connectDB() {
  client = new MongoClient(uri); // Simplified without deprecated options
  await client.connect();
  return client.db();
}

function getDB() {
  return client.db();
}

module.exports = { connectDB, getDB };
