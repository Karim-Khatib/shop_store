import mongoose, { model, models } from 'mongoose';
interface UserI extends mongoose.Document  {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}
const  UserSchema= new mongoose.Schema<UserI>({
name:{
    type:String,
    required:true,
},

email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,

},

})
export const User = models.User || model<UserI>('User', UserSchema);