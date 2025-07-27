import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { registerSchema, loginSchema } from '../utils/validation';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await authService.register(value);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await authService.login(value);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
