import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserRequest, LoginRequest } from '../models/types';
import { db } from '../models/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  async register(userData: CreateUserRequest): Promise<{ user: Omit<User, 'password'>, token: string }> {
    // Check if user already exists
    const existingUser = db.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user: User = {
      id: uuidv4(),
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      createdAt: new Date()
    };

    const createdUser = db.createUser(user);
    
    // Generate token
    const token = jwt.sign({ userId: createdUser.id }, JWT_SECRET, { expiresIn: '24h' });

    // Return user without password
    const { password, ...userWithoutPassword } = createdUser;
    return { user: userWithoutPassword, token };
  }

  async login(loginData: LoginRequest): Promise<{ user: Omit<User, 'password'>, token: string }> {
    // Find user
    const user = db.findUserByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  verifyToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
