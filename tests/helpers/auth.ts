// tests/helpers/auth.ts
import { Page } from '@playwright/test';

export async function login(page: Page, username = 'emilys', password = 'emilyspass') {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Usuario' }).fill(username);
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForURL('/'); // espera a que el login termine de redirigir
}