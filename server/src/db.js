//import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const initializeDbConnection = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(
    'mongodb://localhost:27017/Portfolio',
    { useNewUrlParser: true },
    () => {
      console.log('Database connected.');
    }
  );
};
