import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'


/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-4D8XMN',
      status: {
          value: 'APROVADO',
          backgroundColor: 'bg-green-100',
          textColor: 'text-green-700',
          icon: 'lucide-circle-check-big',
      },
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
          name: 'Augusto Teste Loja',
          email: 'testeloja@test.com',
      },
      payment: 'À Vista',
      store: 'Velô Paulista - Av. Paulista, 1000',
      data: '09/02/2026',
  }

    // Act
    const orderLockup = new OrderLockupPage(page)
    await orderLockup.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
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
      - paragraph: ${order.store}
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({ hasText: order.status.value })
      await expect(statusBadge).toContainClass(order.status.backgroundColor);
      await expect(statusBadge).toContainClass(order.status.textColor);

      const statusIcon = statusBadge.locator('svg');
      await expect(statusIcon).toContainClass(order.status.icon);

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-D5F5FB',
      status: {
          value: 'REJEITADO',
          backgroundColor: 'bg-red-100',
          textColor: 'text-red-700',
          icon: 'lucide-circle-x',
      },
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
          name: 'rasras rasrar',
          email: 'rsara@test.com',
      },
      payment: 'À Vista',
      store: 'Velô Faria Lima - Av. Faria Lima, 2500',
      data: '07/02/2026',
  }

    // Act
    const orderLockup = new OrderLockupPage(page)
    await orderLockup.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
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
      - paragraph: ${order.store}
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({ hasText: order.status.value })
      await expect(statusBadge).toContainClass(order.status.backgroundColor);
      await expect(statusBadge).toContainClass(order.status.textColor);

      const statusIcon = statusBadge.locator('svg');
      await expect(statusIcon).toContainClass(order.status.icon);
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order = {
      number: 'VLO-RNUT70',
      status: {
          value: 'EM_ANALISE',
          backgroundColor: 'bg-amber-100',
          textColor: 'text-amber-700',
          icon: 'lucide-clock-icon',
      },
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
          name: 'Teste analizando',
          email: 'analizando@google.com',
      },
      payment: 'Financiamento 12x',
      store: 'Velô Morumbi - Av. Morumbi, 1500',
      data: '08/02/2026',
  }

    // Act
    const orderLockup = new OrderLockupPage(page)
    await orderLockup.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
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
      - paragraph: ${order.store}
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({ hasText: order.status.value })
      await expect(statusBadge).toContainClass(order.status.backgroundColor);
      await expect(statusBadge).toContainClass(order.status.textColor);

      const statusIcon = statusBadge.locator('svg');
      await expect(statusIcon).toContainClass(order.status.icon);
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    // Act
    const orderLockup = new OrderLockupPage(page)
    await orderLockup.searchOrder(order)


    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)

  })
})