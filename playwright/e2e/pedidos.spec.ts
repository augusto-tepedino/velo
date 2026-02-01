import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Deve consultar um pedido aprovado', async ({ page }) => {
    // Arrange
    const numeroDoPedido = 'VLO-0K831N';
    await page.goto('');
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

test('Deve consultar um pedido aprovado - desafio', async ({ page }) => {

    // Arrange
    const idPedido = 'VLO-0K831N';
    const statusEsperado = 'APROVADO';
    const numeroPedido = page.getByText(idPedido, { exact: true });
    const statusPedido = page.locator('//div[starts-with(@class, "flex items-center gap-2")]');

    await page.goto('');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();

    // Act 
    await page.getByLabel('Número do Pedido').fill(idPedido);
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //assert
    await expect(numeroPedido).toBeVisible();
    await expect(numeroPedido).toContainText(idPedido);

    await expect(statusPedido).toBeVisible();
    await expect(statusPedido).toContainText(statusEsperado);
});