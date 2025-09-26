import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'onboarding',
      path: '/onboarding',
      component: () => import('@/pages/onboarding/index.vue'),
    }
  ],
})

export default router
