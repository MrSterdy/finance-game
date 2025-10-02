import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'onboarding',
      path: '/onboarding',
      component: () => import('@/pages/onboarding/index.vue'),
    },
    {
      name: 'start-screen',
      path: '/start-screen',
      component: () => import('@/pages/start-screen/index.vue'),
    },
    {
      name: 'session',
      path: '/session',
      component: () => import('@/pages/session/index.vue'),
    },
    {
      name: 'statistics',
      path: '/statistics',
      component: () => import('@/pages/statistics/index.vue'),
    }
  ],
})

export default router
