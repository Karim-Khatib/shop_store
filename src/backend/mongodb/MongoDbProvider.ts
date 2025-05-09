import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

interface CachedMongoose {
  activeConnection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
// global from node  to save the connection without create connection every time
const cached = (global as { mongoose?: CachedMongoose })?.mongoose || {
  activeConnection: null,
  promise: null,
};

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.activeConnection) return cached.activeConnection;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "nextjs_app",
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.activeConnection = await cached.promise;
  (global as { mongoose?: CachedMongoose }).mongoose = cached;

  return cached.activeConnection;
}
