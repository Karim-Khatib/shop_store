export interface ResponseType {
  success: boolean;
  message?: string;
  result?: any;
  results?: any[];
  error?: {
    errorCode: number;
    message: string;
  };
}
export interface UserType {
  fullName: string;
  email: string;
  password?: string;
  imageUrl?: string;
  birthDay: Date;
  id:string;
}
export type MassageType = {
  id:string,
  text?:string,
  localId:string,
  imageUrl?:string,
  sender:UserType,
  receiver:UserType,
  receivedAt?:Date,
  createdAt?:Date,
  updatedAt?:Date,
 
}