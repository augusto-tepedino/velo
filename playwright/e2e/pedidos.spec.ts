import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
// AAA - Arrange, Act, Assert


test.describe('Consulta de Pedido', () => {


    test.beforeEach(async ({ page }) => {
        const veloSprintText = page.getByTestId('hero-section').getByRole('heading');
        const consultarPedidoLink = page.getByRole('link', { name: 'Consultar Pedido' });
        const consultarPedidoHeading = page.getByRole('heading', { name: 'Consultar Pedido' });

        //Arrange
        await page.goto('');
        await expect(veloSprintText).toContainText('Velô Sprint');
        await consultarPedidoLink.click();
        await expect(consultarPedidoHeading).toBeVisible();

    })

    test('Deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        //const order = 'VLO-0K831N';
        const order = {
            number: 'VLO-0K831N',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Augusto Martins',
                email: 'test@test.com',
            },
            payment: 'À Vista',
            data: '30/01/2026',
        }

        //Locators
        const consultarPedidoTetxfield = page.getByTestId('search-order-id');
        const buscarPedidoButton = page.getByTestId('search-order-button');
        const numeroPedidoEncontradoText = page.getByTestId('order-result-id');
        const statusPedidoText = page.getByTestId('order-result-status');

        // Act
        await consultarPedidoTetxfield.fill(order.number);
        await buscarPedidoButton.click();

        //assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}

            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: ${order.data}
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
    });

    test('Deve consultar um pedido rejeitado', async ({ page }) => {

        // Test Data
        //const order = 'VLO-D5F5FB';
        const order = {
            number: 'VLO-D5F5FB',
            status: 'REJEITADO',
            color: 'Lunar White',
            wheels: 'sport Wheels',
            customer: {
                name: 'rasras rasrar',
                email: 'rsara@test.com',
            },
            payment: 'À Vista',
            data: '07/02/2026',
        }

        //Locators
        const consultarPedidoTetxfield = page.getByTestId('search-order-id');
        const buscarPedidoButton = page.getByTestId('search-order-button');
        const numeroPedidoEncontradoText = page.getByTestId('order-result-id');
        const statusPedidoText = page.getByTestId('order-result-status');

        // Act
        await consultarPedidoTetxfield.fill(order.number);
        await buscarPedidoButton.click();

        //assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}

            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: ${order.data}
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/

            `);
    });

    test('Deve consultar um pedido em analise', async ({ page }) => {

        // Test Data
        //const order = 'VLO-D5F5FB';
        const order = {
            number: 'VLO-RNUT70',
            status: 'EM_ANALISE',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Teste analizando',
                email: 'analizando@google.com',
            },
            payment: 'Financiamento 12x',
            data: '08/02/2026',
        }

        //Locators
        const consultarPedidoTetxfield = page.getByTestId('search-order-id');
        const buscarPedidoButton = page.getByTestId('search-order-button');
        const numeroPedidoEncontradoText = page.getByTestId('order-result-id');
        const statusPedidoText = page.getByTestId('order-result-status');

        // Act
        await consultarPedidoTetxfield.fill(order.number);
        await buscarPedidoButton.click();

        //assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - img
            - text: ${order.status}

            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: ${order.data}
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/

            `);
    });

    test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        // Test Data
        const order = generateOrderCode();

        //Locators
        const consultarPedidoTetxfield = page.getByTestId('search-order-id');
        const buscarPedidoButton = page.getByTestId('search-order-button');
        const titulo = page.getByRole('heading', { name: 'Pedido não encontrado' });
        const message = titulo.locator('..').getByText('Verifique o número do pedido');

        // Act
        await consultarPedidoTetxfield.fill(order);
        await buscarPedidoButton.click();

        //assert
        await expect(titulo).toBeVisible();
        await expect(message).toBeVisible();


        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    });

    /*
    test('Deve consultar um pedido aprovado - desafio', async ({ page }) => {
    
        // Test Data
        const order = 'VLO-0K831N';
        const statusEsperado = 'APROVADO';
    
        const numeroPedido = page.getByRole('paragraph').filter({ hasText: /^Pedido$/ }).locator('..');
        const statusPedido = page.locator('//div[starts-with(@class, "flex items-center gap-2")]');
    
        await page.goto('');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
    
        // Act 
        await page.getByLabel('Número do Pedido').fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();
    
        //assert
        await expect(numeroPedido).toBeVisible();
        await expect(numeroPedido).toContainText(order);
    
        await expect(statusPedido).toBeVisible();
        await expect(statusPedido).toContainText(statusEsperado);
    });
    */
});