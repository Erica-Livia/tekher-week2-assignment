import { Request } from 'express';
import { User } from '../modals/User';


export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: "user" | "admin" | "superAdmin";
  };
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

export type UserRole = 'user' | 'admin' | 'superAdmin';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}