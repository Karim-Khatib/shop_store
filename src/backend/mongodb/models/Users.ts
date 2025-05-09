import mongoose from "mongoose";
export interface UserI extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  imageUrl?: string;
  birthDay: Date;
  createdAt: Date;
}
const UserSchema = new mongoose.Schema<UserI>({

  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  birthDay: {
    type: Date,
    required: true,
    max: new Date(),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Initialize model properly
export const User =
  mongoose.models?.User || mongoose.model<UserI>("User", UserSchema);
