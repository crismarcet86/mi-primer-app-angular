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

test.describe('Verificación del botón Cerrar Ticket', () => {

    // Método 1: Verificar que el botón NO está disponible antes de iniciar sesión
    test('el dashboard NO muestra el botón cerrar antes de iniciar sesión', async ({ page }) => {
        // 1. Navegar a la página de inicio (sin sesión activa)
        await page.goto('/');

        // 2. Localizar la primera fila abierta
        const filaAbierta = page.locator('tr', { hasText: 'abierto' }).first();

        // 3. Verificar que el botón "Cerrar Ticket" no es visible o no existe
        const botonCerrar = filaAbierta.getByRole('button', { name: 'Cerrar Ticket' });
        await expect(botonCerrar).not.toBeVisible();
    });

    // Método 2: Verificar que el botón funciona después de iniciar sesión
    test('el dashboard muestra y permite usar el botón cerrar al iniciar sesión', async ({ page }) => {
        await login(page)

        // 2. Ir al dashboard y ejecutar tu flujo original
        await page.goto('/');
        const filaAbierta = page.locator('tr', { hasText: 'abierto' }).first();
        await filaAbierta.getByRole('button').click();
        await page.getByRole('button', { name: 'Cerrar Ticket' }).click();
        
        // 3. Confirmar la acción exitosa
        await expect(page.getByText('Ticket cerrado con éxito')).toBeVisible();
    });

});
