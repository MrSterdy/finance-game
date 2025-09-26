import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'onboarding',
      path: '/onboarding',
      component: () => import('@/pages/onboarding/index.vue'),
    },
    {
      name: 'start-screen',
      path: '/start-screen',
      component: () => import('@/pages/startScreen/index.vue'),
    },
    {
      name: 'session',
      path: '/session',
      component: () => import('@/pages/session/index.vue'),
    }
  ],
})

export default router
