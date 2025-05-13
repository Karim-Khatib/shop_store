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
