import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { db } from '../models/database';

export interface AuthRequest extends Request {
  user?: any;
}

const authService = new AuthService();

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = authService.verifyToken(token);
    const user = db.findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
