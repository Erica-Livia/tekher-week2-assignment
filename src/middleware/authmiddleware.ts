import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  userId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const authorize = (req: Request, res: Response, next: NextFunction): void => {
  const { userId } = (req as any).user;
  const requestedUserId = parseInt(req.params.userId);

  if (userId !== requestedUserId) {
    res.status(403).json({ message: 'Not authorized to access this resource' });
    return;
  }

  next();
};