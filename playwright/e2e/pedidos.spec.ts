import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
    const numeroDoPedido = 'VLO-0K831N';
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();

    // Act
    await page.getByTestId('search-order-id').fill(numeroDoPedido);
    await page.getByTestId('search-order-button').click();

    //assert
    await expect(page.getByTestId('order-result-id')).toBeVisible();
    await expect(page.getByTestId('order-result-id')).toContainText(numeroDoPedido);
    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});