import mongoose from 'mongoose';
import dotenv from 'dotenv';

import path from 'path';

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
