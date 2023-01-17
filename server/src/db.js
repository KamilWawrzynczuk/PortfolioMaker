//import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
let client;

export const initializeDbConnection = async () => {
  // client = await MongoClient.connect('mongodb://localhost:27017', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  // });
  mongoose.set('strictQuery', false);
  mongoose.connect(
    'mongodb://localhost:27017/Portfolio',
    { useNewUrlParser: true },
    () => {
      console.log('Database connected.');
    }
  );
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
