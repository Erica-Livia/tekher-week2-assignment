// src/middleware/authorize.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

interface AuthRequest extends Request {
  user?: {
    role: 'user' | 'admin' | 'superAdmin';
  };
}

export const authorize = (allowedRoles: ('user' | 'admin' | 'superAdmin')[]): RequestHandler => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    
    // If user is not authenticated at all
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    // If role is not authorized?
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'This User has insufficient permission' });
      return;
    }

    next();
  };
};
