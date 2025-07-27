import request from 'supertest';
import app from '../index';

describe('Todo App - Basic Tests', () => {
  let authToken: string;

  // Test 1: Valid user registration
  it('should register a new user successfully (VALID)', async () => {
    const userData = {
      email: 'valid@example.com',
      password: 'password123',
      name: 'Valid User'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(userData.email);
    
    // Save token for next tests
    authToken = response.body.token;
  });

  // Test 2: Invalid user registration  
  it('should reject invalid user registration (INVALID)', async () => {
    const invalidUserData = {
      email: 'invalid-email', // Invalid email format
      password: '123', // Too short password
      name: ''  // Empty name
    };

    await request(app)
      .post('/api/auth/register')
      .send(invalidUserData)
      .expect(400);
  });

  // Test 3: Add todo
  it('should add a new todo successfully (ADD)', async () => {
    // First register a user to get auth token
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'todouser@example.com',
        password: 'password123',
        name: 'Todo User'
      });

    const token = registerResponse.body.token;

    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo'
    };

    const response = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(todoData)
      .expect(201);

    expect(response.body.title).toBe(todoData.title);
    expect(response.body.description).toBe(todoData.description);
    expect(response.body.completed).toBe(false);
  });

  // Test 4: Delete todo
  it('should delete a todo successfully (DELETE)', async () => {
    // First register a user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'deleteuser@example.com',
        password: 'password123',
        name: 'Delete User'
      });

    const token = registerResponse.body.token;

    // Create a todo first
    const createResponse = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Todo to Delete',
        description: 'This will be deleted'
      });

    const todoId = createResponse.body.id;

    // Now delete it
    await request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    // Verify it's deleted by trying to get it
    await request(app)
      .get(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});
