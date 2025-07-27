import { v4 as uuidv4 } from 'uuid';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../models/types';
import { db } from '../models/database';

export class TodoService {
  createTodo(userId: string, todoData: CreateTodoRequest): Todo {
    const todo: Todo = {
      id: uuidv4(),
      title: todoData.title,
      description: todoData.description,
      completed: false,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return db.createTodo(todo);
  }

  getTodosByUserId(userId: string): Todo[] {
    return db.findTodosByUserId(userId);
  }

  getTodoById(id: string, userId: string): Todo | null {
    const todo = db.findTodoById(id);
    if (!todo || todo.userId !== userId) {
      return null;
    }
    return todo;
  }

  updateTodo(id: string, userId: string, updates: UpdateTodoRequest): Todo | null {
    const todo = db.findTodoById(id);
    if (!todo || todo.userId !== userId) {
      return null;
    }

    return db.updateTodo(id, updates) || null;
  }

  deleteTodo(id: string, userId: string): boolean {
    const todo = db.findTodoById(id);
    if (!todo || todo.userId !== userId) {
      return false;
    }

    return db.deleteTodo(id);
  }
}
