import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  imageUrl?: string;
  birthDay: Date;
  _id:ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    birthDay: { type: Date, required: true }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

const UserModel = mongoose.model<IUser>('ExpressUser', UserSchema);
export default UserModel;
