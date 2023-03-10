import { RouteRecordRaw } from 'vue-router'
import { EXAMPLES_URL } from '@/config'

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    name: '根页面',
    path: '/',
    redirect: EXAMPLES_URL
  },
  {
    name: '首页',
    path: '/home',
    component: () => import('@/views/home/index.vue')
  },
  {
    name: '示例页面',
    path: '/examples',
    component: () => import('@/views/examples/index.vue')
  }
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面'
    }
  }
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: { name: '404' }
}
