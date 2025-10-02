import { createRouter, createWebHashHistory } from 'vue-router'
import { profile } from '@/lib/storage/profile'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: () => {
        // Редирект в зависимости от статуса onboarding
        return profile.value.onboardingCompleted ? '/start-screen' : '/onboarding'
      }
    },
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
