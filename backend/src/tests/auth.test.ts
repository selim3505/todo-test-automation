import request from 'supertest';
import app from '../index';

describe('Auth Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
    });

    it('should return 400 for short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
    });

    it('should return 400 for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Try to register with same email
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a user for login tests
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should return 401 for invalid email', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123'
        })
        .expect(401);
    });

    it('should return 401 for invalid password', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);
    });
  });
});
