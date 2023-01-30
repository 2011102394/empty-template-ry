import { RouteRecordRaw } from 'vue-router'
/**
 * exampleRouter(示例路由)
 */
export const exampleRouter: RouteRecordRaw[] = [
  {
    name: '区域选择器',
    path: '/examples/ui/chooseArea',
    component: () => import('@/views/examples/ui/chooseArea/index.vue')
  },
  {
    name: '2d地图',
    path: '/examples/2d/map',
    component: () => import('@/views/examples/2d/map/index.vue')
  },
  {
    name: '地图小组件',
    path: '/examples/2d/widget',
    component: () => import('@/views/examples/2d/widget/index.vue')
  },
  {
    name: '3d地图',
    path: '/examples/3d/map',
    component: () => import('@/views/examples/3d/map/index.vue')
  }
]
