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
export interface UserType extends Document {
  fullName: string;
  email: string;
  password: string;
  imageUrl?: string;
  birthDay: Date;
  id:string;
}