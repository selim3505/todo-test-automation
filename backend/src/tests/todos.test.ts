import request from 'supertest';
import app from '../index';

describe('Todo Endpoints', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Register and login a user before each test
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe('POST /api/todos', () => {
    it('should create a new todo successfully', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(todoData)
        .expect(201);

      expect(response.body.title).toBe(todoData.title);
      expect(response.body.description).toBe(todoData.description);
      expect(response.body.completed).toBe(false);
      expect(response.body.userId).toBe(userId);
    });

    it('should return 401 without authentication', async () => {
      const todoData = {
        title: 'Test Todo',
        description: 'Test Description'
      };

      await request(app)
        .post('/api/todos')
        .send(todoData)
        .expect(401);
    });

    it('should return 400 for invalid data', async () => {
      const todoData = {
        title: '', // Empty title should fail validation
        description: 'Test Description'
      };

      await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(todoData)
        .expect(400);
    });
  });

  describe('GET /api/todos', () => {
    beforeEach(async () => {
      // Create some todos for testing
      await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Todo 1', description: 'Description 1' });

      await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Todo 2', description: 'Description 2' });
    });

    it('should get all todos for authenticated user', async () => {
      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Todo 1');
      expect(response.body[1].title).toBe('Todo 2');
    });

    it('should return 401 without authentication', async () => {
      await request(app)
        .get('/api/todos')
        .expect(401);
    });
  });

  describe('PUT /api/todos/:id', () => {
    let todoId: string;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Todo', description: 'Test Description' });

      todoId = response.body.id;
    });

    it('should update a todo successfully', async () => {
      const updateData = {
        title: 'Updated Todo',
        completed: true
      };

      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe(updateData.title);
      expect(response.body.completed).toBe(true);
    });

    it('should return 404 for non-existent todo', async () => {
      await request(app)
        .put('/api/todos/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Todo' })
        .expect(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    let todoId: string;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Todo', description: 'Test Description' });

      todoId = response.body.id;
    });

    it('should delete a todo successfully', async () => {
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // Verify todo is deleted
      await request(app)
        .get(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 404 for non-existent todo', async () => {
      await request(app)
        .delete('/api/todos/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
