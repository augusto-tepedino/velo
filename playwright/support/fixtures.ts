import { test as base } from '@playwright/test'

import { createCheckoutActions } from './actions/checkoutActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderLookupActions } from './actions/orderLookupActions'
import { createMockActions } from './actions/mockActions'
import { createHeroActions } from './actions/heroActions'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLookup: ReturnType<typeof createOrderLookupActions>
  mock: ReturnType<typeof createMockActions>
  hero: ReturnType<typeof createHeroActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      orderLookup: createOrderLookupActions(page),
      mock: createMockActions(page),
      hero: createHeroActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'
