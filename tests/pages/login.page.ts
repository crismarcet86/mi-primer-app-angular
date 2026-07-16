// tests/pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Usuario');
    this.passwordInput = page.getByLabel('Contraseña', { exact: true });
    this.submitButton = page.getByRole('button', { name: 'Entrar' });
  }

  async login(username: string, password: string) {
    await this.page.goto('/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}