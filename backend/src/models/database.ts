import { User, Todo } from './types';

// In-memory database simulation
class Database {
  private users: User[] = [];
  private todos: Todo[] = [];

  // User operations
  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Todo operations
  createTodo(todo: Todo): Todo {
    this.todos.push(todo);
    return todo;
  }

  findTodosByUserId(userId: string): Todo[] {
    return this.todos.filter(todo => todo.userId === userId);
  }

  findTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | undefined {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return undefined;

    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updates, updatedAt: new Date() };
    return this.todos[todoIndex];
  }

  deleteTodo(id: string): boolean {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return false;

    this.todos.splice(todoIndex, 1);
    return true;
  }

  // Test utilities
  clear(): void {
    this.users = [];
    this.todos = [];
  }

  getAllUsers(): User[] {
    return [...this.users];
  }

  getAllTodos(): Todo[] {
    return [...this.todos];
  }
}

export const db = new Database();
