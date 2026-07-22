// tests/tickets.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test.describe('Cerrar ticket', () => {
  test.beforeEach(async ({ page }) => {
    await login(page); // se loguea antes de cada test de este archivo
  });

  test('cerrar un ticket cambia su estado', async ({ page }) => {
    await page.goto('/');
    const filaAbierta = page.locator('tr', { hasText: 'Abierto' }).first();
    await filaAbierta.getByRole('button').click();
    await page.getByRole('button', { name: 'Cerrar Ticket' }).click();
    await expect(page.getByText('Ticket Cerrado con éxito')).toBeVisible();
  });
});