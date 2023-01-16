import { RouteRecordRaw } from 'vue-router'
/**
 * exampleRouter(示例路由)
 */
export const exampleRouter: RouteRecordRaw[] = [
  {
    name: '区域选择器',
    path: '/examples/ui/chooseArea',
    component: () => import('@/views/examples/ui/chooseArea/index.vue')
  }
]
