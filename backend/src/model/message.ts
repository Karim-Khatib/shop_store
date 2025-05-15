import mongoose, {  Schema } from "mongoose";


export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  localId:string,
  text: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  receivedAt?:Date;

}
const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    localId:{type:String},
    imageUrl: { type: String },
    receivedAt:{type:Date},
    createdAt:{type:Date}
  }
)
 const Message = mongoose.model<IMessage>('Message', MessageSchema);

 export {Message}