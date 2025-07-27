import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo Management', () => {
  let authPage: AuthPage;
  let todoPage: TodoPage;
  let testUser = {
    name: 'Todo Test User',
    email: `todo-test-${Date.now()}@example.com`,
    password: 'password123'
  };

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    todoPage = new TodoPage(page);
    
    // Register and login user
    await authPage.goto();
    await authPage.register(testUser.name, testUser.email, testUser.password);
    await authPage.waitForRedirectToTodos();
  });

  test('should display empty todo list initially', async () => {
    await expect(todoPage.todoListContainer).toBeVisible();
    await expect(todoPage.todoAppTitle).toHaveText('My Todo List');
    
    const isEmpty = await todoPage.isEmptyState();
    expect(isEmpty).toBe(true);
  });

  test('should create a new todo successfully', async () => {
    const todoTitle = 'Test Todo';
    const todoDescription = 'This is a test todo description';

    await todoPage.addTodo(todoTitle, todoDescription);
    
    // Wait for todo to appear
    await todoPage.waitForTodoToAppear(todoTitle);
    
    // Verify todo count
    const todoCount = await todoPage.getTodoCount();
    expect(todoCount).toBe(1);

    // Verify todo content
    const todos = await todoPage.getAllTodoItems();
    await expect(todos[0]).toContainText(todoTitle);
    await expect(todos[0]).toContainText(todoDescription);
  });

  test('should create todo with title only', async () => {
    const todoTitle = 'Simple Todo';

    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);
    
    const todoCount = await todoPage.getTodoCount();
    expect(todoCount).toBe(1);
  });

  test('should not create todo with empty title', async () => {
    // Try to add todo with empty title
    await todoPage.addTodoButton.click();
    
    // Should still show empty state
    const isEmpty = await todoPage.isEmptyState();
    expect(isEmpty).toBe(true);
  });

  test('should mark todo as completed', async () => {
    const todoTitle = 'Complete Me Todo';
    
    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);
    
    // Get the first todo item
    const todos = await todoPage.getAllTodoItems();
    const firstTodo = todos[0];
    
    // Find checkbox and toggle it
    const checkbox = firstTodo.locator('[type="checkbox"]');
    await checkbox.check();
    
    // Verify todo is marked as completed
    await expect(firstTodo).toHaveClass(/completed/);
  });

  test('should delete todo successfully', async () => {
    const todoTitle = 'Delete Me Todo';
    
    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);
    
    // Get the first todo and delete it
    const todos = await todoPage.getAllTodoItems();
    const deleteButton = todos[0].locator('[data-testid^="delete-todo-"]');
    await deleteButton.click();
    
    // Wait for todo to disappear
    await todoPage.waitForTodoToDisappear(todoTitle);
    
    // Should be back to empty state
    const isEmpty = await todoPage.isEmptyState();
    expect(isEmpty).toBe(true);
  });

  test('should handle multiple todos', async () => {
    const todos = [
      { title: 'First Todo', description: 'First description' },
      { title: 'Second Todo', description: 'Second description' },
      { title: 'Third Todo', description: 'Third description' }
    ];

    // Add multiple todos
    for (const todo of todos) {
      await todoPage.addTodo(todo.title, todo.description);
      await todoPage.waitForTodoToAppear(todo.title);
    }

    // Verify all todos are present
    const todoCount = await todoPage.getTodoCount();
    expect(todoCount).toBe(3);

    // Verify each todo content
    for (const todo of todos) {
      await expect(todoPage.page.locator('text=' + todo.title)).toBeVisible();
      await expect(todoPage.page.locator('text=' + todo.description)).toBeVisible();
    }
  });

  test('should persist todos across page reload', async () => {
    const todoTitle = 'Persistent Todo';
    
    await todoPage.addTodo(todoTitle);
    await todoPage.waitForTodoToAppear(todoTitle);
    
    // Reload the page
    await todoPage.page.reload();
    
    // Verify todo is still there
    await expect(todoPage.page.locator('text=' + todoTitle)).toBeVisible();
    const todoCount = await todoPage.getTodoCount();
    expect(todoCount).toBe(1);
  });

  test('should logout successfully', async () => {
    await todoPage.logout();
    await todoPage.waitForRedirectToAuth();
    
    // Should be on auth page
    await expect(authPage.authForm).toBeVisible();
    await expect(authPage.authTitle).toHaveText('Login');
  });

  test('should require authentication to access todos', async () => {
    // Logout first
    await todoPage.logout();
    await todoPage.waitForRedirectToAuth();
    
    // Try to access todos directly
    await todoPage.goto();
    
    // Should redirect to auth
    await expect(authPage.authForm).toBeVisible();
  });

  test('should clear form after successful todo creation', async () => {
    const todoTitle = 'Form Clear Test';
    const todoDescription = 'This should clear after creation';

    await todoPage.addTodo(todoTitle, todoDescription);
    await todoPage.waitForTodoToAppear(todoTitle);
    
    // Verify form is cleared
    await expect(todoPage.todoTitleInput).toHaveValue('');
    await expect(todoPage.todoDescriptionInput).toHaveValue('');
  });
});
