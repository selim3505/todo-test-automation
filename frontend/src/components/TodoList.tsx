import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/apiService';
import type { Todo } from '../services/apiService';
import './TodoList.css';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todoList = await apiService.getTodos();
      setTodos(todoList);
    } catch (err: any) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await apiService.createTodo({
        title: newTodoTitle,
        description: newTodoDescription,
      });
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
      setNewTodoDescription('');
      setError('');
    } catch (err: any) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await apiService.updateTodo(id, { completed: !completed });
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err: any) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await apiService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err: any) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="todo-container" data-testid="todo-list-container">
      <header className="todo-header">
        <h1 data-testid="todo-app-title">My Todo List</h1>
        <button 
          onClick={logout}
          className="logout-button"
          data-testid="logout-button"
        >
          Logout
        </button>
      </header>

      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateTodo} className="todo-form" data-testid="todo-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Todo title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="todo-input"
            data-testid="todo-title-input"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            className="todo-input"
            data-testid="todo-description-input"
          />
          <button 
            type="submit" 
            className="add-button"
            data-testid="add-todo-button"
          >
            Add Todo
          </button>
        </div>
      </form>

      <div className="todos-section">
        {loading ? (
          <div className="loading" data-testid="loading-indicator">
            Loading todos...
          </div>
        ) : (
          <div className="todos-list" data-testid="todos-list">
            {todos.length === 0 ? (
              <div className="empty-state" data-testid="empty-todos">
                No todos yet. Add your first todo above!
              </div>
            ) : (
              todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  data-testid={`todo-item-${todo.id}`}
                >
                  <div className="todo-content">
                    <div className="todo-main">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id, todo.completed)}
                        className="todo-checkbox"
                        data-testid={`todo-checkbox-${todo.id}`}
                      />
                      <div className="todo-text">
                        <h3 className="todo-title" data-testid={`todo-title-${todo.id}`}>
                          {todo.title}
                        </h3>
                        {todo.description && (
                          <p className="todo-description" data-testid={`todo-description-${todo.id}`}>
                            {todo.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="delete-button"
                      data-testid={`delete-todo-${todo.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
