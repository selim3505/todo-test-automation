import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { TodoPage } from './pages/TodoPage';

test.describe('Authentication Flow', () => {
  let authPage: AuthPage;
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    todoPage = new TodoPage(page);
    await authPage.goto();
  });

  test('should display login form by default', async () => {
    await expect(authPage.authForm).toBeVisible();
    await expect(authPage.authTitle).toHaveText('Login');
    await expect(authPage.nameInput).not.toBeVisible();
    await expect(authPage.emailInput).toBeVisible();
    await expect(authPage.passwordInput).toBeVisible();
    await expect(authPage.submitButton).toHaveText('Login');
  });

  test('should toggle between login and register modes', async () => {
    // Should start in login mode
    expect(await authPage.isLoginMode()).toBe(true);

    // Switch to register mode
    await authPage.toggleModeButton.click();
    expect(await authPage.isRegisterMode()).toBe(true);
    await expect(authPage.nameInput).toBeVisible();
    await expect(authPage.submitButton).toHaveText('Register');

    // Switch back to login mode
    await authPage.toggleModeButton.click();
    expect(await authPage.isLoginMode()).toBe(true);
    await expect(authPage.nameInput).not.toBeVisible();
  });

  test('should register a new user successfully', async () => {
    const testUser = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      password: 'password123'
    };

    await authPage.register(testUser.name, testUser.email, testUser.password);
    
    // Should redirect to todos page
    await authPage.waitForRedirectToTodos();
    await expect(todoPage.todoAppTitle).toHaveText('My Todo List');
  });

  test('should login existing user successfully', async () => {
    const testUser = {
      name: 'Login Test User',
      email: `login-test-${Date.now()}@example.com`,
      password: 'password123'
    };

    // First register the user
    await authPage.register(testUser.name, testUser.email, testUser.password);
    await authPage.waitForRedirectToTodos();

    // Logout
    await todoPage.logout();
    await todoPage.waitForRedirectToAuth();

    // Login with the same credentials
    await authPage.login(testUser.email, testUser.password);
    await authPage.waitForRedirectToTodos();
    await expect(todoPage.todoAppTitle).toHaveText('My Todo List');
  });

  test('should show error for invalid login credentials', async () => {
    await authPage.login('nonexistent@example.com', 'wrongpassword');
    
    // Should show error message
    await expect(authPage.errorMessage).toBeVisible();
    const errorText = await authPage.getErrorMessage();
    expect(errorText).toContain('fail'); // Error message should contain 'fail'
  });

  test('should show error for duplicate email registration', async () => {
    const testUser = {
      name: 'Duplicate Test User',
      email: `duplicate-test-${Date.now()}@example.com`,
      password: 'password123'
    };

    // Register user first time
    await authPage.register(testUser.name, testUser.email, testUser.password);
    await authPage.waitForRedirectToTodos();

    // Logout
    await todoPage.logout();
    await todoPage.waitForRedirectToAuth();

    // Try to register with same email
    await authPage.register('Another User', testUser.email, testUser.password);
    
    // Should show error message
    await expect(authPage.errorMessage).toBeVisible();
    const errorText = await authPage.getErrorMessage();
    expect(errorText).toContain('exist'); // Error message should contain 'exist'
  });

  test('should validate required fields', async () => {
    // Try to submit login without credentials
    await authPage.submitButton.click();
    
    // Form should not submit (browser validation)
    await expect(authPage.authForm).toBeVisible();
    
    // Switch to register and try to submit without name
    await authPage.toggleModeButton.click();
    await authPage.emailInput.fill('test@example.com');
    await authPage.passwordInput.fill('password123');
    // Don't fill name
    await authPage.submitButton.click();
    
    // Form should not submit
    await expect(authPage.authForm).toBeVisible();
  });

  test('should redirect authenticated user away from auth page', async () => {
    const testUser = {
      name: 'Redirect Test User',
      email: `redirect-test-${Date.now()}@example.com`,
      password: 'password123'
    };

    // Register and login
    await authPage.register(testUser.name, testUser.email, testUser.password);
    await authPage.waitForRedirectToTodos();

    // Try to navigate back to auth page
    await authPage.goto();
    
    // Should be redirected back to todos
    await expect(authPage.page).toHaveURL('/todos');
    await expect(todoPage.todoAppTitle).toBeVisible();
  });
});
