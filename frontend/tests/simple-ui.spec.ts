import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { TodoPage } from './pages/TodoPage';

test.describe('Todo App - Simple UI Tests', () => {

  // Test 1: Valid user registration UI
  test('should register new user through UI (VALID)', async ({ page }) => {
    const authPage = new AuthPage(page);
    const todoPage = new TodoPage(page);
    
    await authPage.goto();
    await authPage.registerUser('Test User', 'test@example.com', 'password123');
    
    // Should redirect to todos page
    await todoPage.waitForTodos();
    await expect(todoPage.todoAppTitle).toHaveText('My Todo List');
  });

  // Test 2: Invalid user registration UI
  test('should show error for invalid registration (INVALID)', async ({ page }) => {
    const authPage = new AuthPage(page);
    
    await authPage.goto();
    await authPage.registerUser('', 'invalid-email', '123'); // Invalid data
    
    // Should show error message
    await expect(authPage.errorMessage).toBeVisible();
  });

  // Test 3: Add todo through UI
  test('should add new todo through UI (ADD)', async ({ page }) => {
    const authPage = new AuthPage(page);
    const todoPage = new TodoPage(page);
    
    // Register and login
    await authPage.goto();
    await authPage.registerUser('Todo User', 'todouser@example.com', 'password123');
    await todoPage.waitForTodos();
    
    // Add a new todo
    await todoPage.addTodo('My Test Todo', 'This is a test todo');
    
    // Verify todo appears
    await expect(page.locator('text=My Test Todo')).toBeVisible();
    await expect(page.locator('text=This is a test todo')).toBeVisible();
  });

  // Test 4: Delete todo through UI
  test('should delete todo through UI (DELETE)', async ({ page }) => {
    const authPage = new AuthPage(page);
    const todoPage = new TodoPage(page);
    
    // Register and login
    await authPage.goto();
    await authPage.registerUser('Delete User', 'deleteuser@example.com', 'password123');
    await todoPage.waitForTodos();
    
    // Add a todo first
    await todoPage.addTodo('Todo to Delete', 'This will be deleted');
    await expect(page.locator('text=Todo to Delete')).toBeVisible();
    
    // Delete the todo
    await todoPage.deleteTodo();
    
    // Verify todo is deleted
    await expect(page.locator('text=Todo to Delete')).not.toBeVisible();
    await expect(todoPage.emptyTodosMessage).toBeVisible();
  });

});
