import { Response } from 'express';
import { TodoService } from '../services/todoService';
import { createTodoSchema, updateTodoSchema } from '../utils/validation';
import { AuthRequest } from '../middleware/auth';

const todoService = new TodoService();

export class TodoController {
  async createTodo(req: AuthRequest, res: Response) {
    try {
      const { error, value } = createTodoSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const todo = todoService.createTodo(req.user!.id, value);
      res.status(201).json(todo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTodos(req: AuthRequest, res: Response) {
    try {
      const todos = todoService.getTodosByUserId(req.user!.id);
      res.status(200).json(todos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTodoById(req: AuthRequest, res: Response) {
    try {
      const todo = todoService.getTodoById(req.params.id, req.user!.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json(todo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTodo(req: AuthRequest, res: Response) {
    try {
      const { error, value } = updateTodoSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const todo = todoService.updateTodo(req.params.id, req.user!.id, value);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json(todo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTodo(req: AuthRequest, res: Response) {
    try {
      const success = todoService.deleteTodo(req.params.id, req.user!.id);
      if (!success) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
