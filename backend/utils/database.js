const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  if (!db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}

async function upsert(collection, filter, updateDoc) {
  const database = await connectDB();
  return database.collection(collection).updateOne(filter, { $set: updateDoc }, { upsert: true });
}

async function select(collection, query = {}, options = {}) {
  const database = await connectDB();
  return database.collection(collection).find(query, options).toArray();
}

async function insert(collection, doc) {
  const database = await connectDB();
  return database.collection(collection).insertOne(doc);
}

async function remove(collection, filter) {
  const database = await connectDB();
  return database.collection(collection).deleteOne(filter);
}

module.exports = { connectDB, upsert, select, insert, remove };
