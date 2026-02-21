import { test } from '@playwright/test'

import { Navbar } from '../support/components/Navbar'
import { generateOrderCode } from '../support/helpers'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderDetails, OrderLockupPage } from '../support/pages/OrderLockupPage'


test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)

    await new OrderLockupPage(page).assertPageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    const order: OrderDetails = {
      number: 'VLO-4D8XMN',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Augusto Teste Loja',
        email: 'testeloja@test.com',
      },
      payment: 'À Vista',
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    const order: OrderDetails = {
      number: 'VLO-D5F5FB',
      status: 'REPROVADO',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'rasras rasrar',
        email: 'rsara@test.com',
      },
      payment: 'À Vista',
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    const order: OrderDetails = {
      number: 'VLO-RNUT70',
      status: 'EM_ANALISE',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Teste analizando',
        email: 'analizando@google.com',
      },
      payment: 'Financiamento 12x',
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    await orderLockupPage.validateOrderNotFound()

  })

  test('deve exibir mensagem quando o pedidoem qualuer formato não é encontrado', async ({ page }) => {

    const orderCode = 'XYZ-999-INVALIDO'
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(orderCode)

    await orderLockupPage.validateOrderNotFound()

  })
})