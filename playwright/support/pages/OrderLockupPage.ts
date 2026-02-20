import { Page, expect } from '@playwright/test'

export type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export interface OrderDetails {
    number: string
    status: OrderStatus
    color: string
    wheels: string
    interior?: string
    customer: {
        name: string
        email: string
        store?: string
    }
    payment: string
}

export class OrderLockupPage {

    constructor(private page: Page) { }

    async searchOrder(code: string) {
        await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }

    async validateStatusBadge(status: OrderStatus) {

        const statusClasses = {
            APROVADO: {
                background: 'bg-green-100',
                text: 'text-green-700',
                icon: 'lucide-circle-check-big'
            },
            REPROVADO: {
                background: 'bg-red-100',
                text: 'text-red-700',
                icon: 'lucide-circle-x'
            },
            EM_ANALISE: {
                background: 'bg-amber-100',
                text: 'text-amber-700',
                icon: 'lucide-clock'
            }
        }

        const classes = statusClasses[status]
        const statusBadge = this.page.getByRole('status').filter({ hasText: status })

        await expect(statusBadge).toHaveClass(new RegExp(classes.background))
        await expect(statusBadge).toHaveClass(new RegExp(classes.text))
        await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(classes.icon))
    }

    async validateOrderDetails(orderDetails: OrderDetails) {
        const interior = orderDetails.interior ?? 'cream'
        const orderCard = this.page.getByTestId(`order-result-${orderDetails.number}`)

        await expect(orderCard).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${orderDetails.number}
      - status:
        - img
        - text: ${orderDetails.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${orderDetails.color}
      - paragraph: Interior
      - paragraph: ${interior}
      - paragraph: Rodas
      - paragraph: ${orderDetails.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${orderDetails.customer.name}
      - paragraph: Email
      - paragraph: ${orderDetails.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${orderDetails.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

        await this.validateStatusBadge(orderDetails.status)
    }
}