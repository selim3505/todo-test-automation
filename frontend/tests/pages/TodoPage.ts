import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoAppTitle: Locator;
  readonly todoTitleInput: Locator;
  readonly todoDescriptionInput: Locator;
  readonly addTodoButton: Locator;
  readonly emptyTodosMessage: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoAppTitle = page.getByTestId('todo-app-title');
    this.todoTitleInput = page.getByTestId('todo-title-input');
    this.todoDescriptionInput = page.getByTestId('todo-description-input');
    this.addTodoButton = page.getByTestId('add-todo-button');
    this.emptyTodosMessage = page.getByTestId('empty-todos');
    this.deleteButton = page.getByText('Delete');
  }

  async addTodo(title: string, description: string) {
    await this.todoTitleInput.fill(title);
    await this.todoDescriptionInput.fill(description);
    await this.addTodoButton.click();
  }

  async deleteTodo() {
    await this.deleteButton.click();
  }

  async waitForTodos() {
    await this.page.waitForURL(/.*todos/);
  }
}