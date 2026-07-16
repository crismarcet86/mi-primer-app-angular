import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test('login exitoso permite acceder a nuevo ticket', async ({ page }) => {
  await page.goto('/login');

  const loginPage = new LoginPage(page);
  await loginPage.login('emilys', 'emilyspass');
  // await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page).toHaveURL('/');
  await page.goto('/nuevo-ticket');
  await expect(page).toHaveURL(/.*nuevo-ticket/);
});

test('sin sesión, intentar crear un ticket redirige a login', async ({ page }) => {
  await page.goto('/nuevo-ticket');
  await expect(page).toHaveURL(/.*login/);
});

