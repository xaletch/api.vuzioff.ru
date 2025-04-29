import { User } from '@/models/user/types';
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
} 

export interface CustomRequest extends Request {
  username: string;
  userId: number;
}