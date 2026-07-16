import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

test('el dashboard muestra el título de la app', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Cris App de Tickets')).toBeVisible();

    // Mejor: por rol + texto accesible (funciona bien con Material)
    await page.getByRole('button', { name: 'Mostrar Todos' }).click();
    await page.getByRole('button', { name: 'Mostrar solo Abiertos' }).click();
    await page.getByRole('button', { name: 'Mostrar solo Cerrados' }).click();
});