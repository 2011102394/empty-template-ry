import {
  staticRouter,
  errorRouter,
  notFoundRouter
} from '@/router/modules/staticRouters'
import { exampleRouter } from '@/router/modules/exampleRouter'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter, ...exampleRouter, notFoundRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export default router
