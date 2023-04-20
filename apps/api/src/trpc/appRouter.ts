import { router } from '.'
// import { orderRouter } from '../order/router'

export const appRouter = router({
  // order: orderRouter
})

export type AppRouter = typeof appRouter
