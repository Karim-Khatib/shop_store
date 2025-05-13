import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import path from 'path';

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });;

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};