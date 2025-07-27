import { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly toggleModeButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('name-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('submit-button');
    this.toggleModeButton = page.getByText('Register here');
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/auth');
  }

  async switchToRegister() {
    await this.toggleModeButton.click();
  }

  async registerUser(name: string, email: string, password: string) {
    await this.switchToRegister();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}