import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthView from '@/views/auth/Auth.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.token) next({ name: 'board' })
      else next()
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    redirect: () => (useAuthStore().token ? { name: 'board' } : { name: 'auth' }),
    children: [
      {
        path: 'board',
        name: 'board',
        component: () => import('@/views/Board.vue'),
      },
      {
        path: 'board/:projectId',
        name: 'board-project',
        component: () => import('@/views/Board.vue'),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/ProjectList.vue'),
      },
      {
        path: 'stats',
        name: 'stats',
        component: () => import('@/views/Stats.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // เลื่อนขึ้นไปบนสุดทุกครั้งที่เปลี่ยนหน้า (Apple UX Style)
  scrollBehavior() {
    return { top: 0 }
  }
})

// --- Navigation Guard: ตัวตรวจบัตรคิว ---
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token

  // ถ้าหน้านั้นต้องใช้ Auth แต่ยังไม่ได้ Login ให้เด้งไปหน้า Auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'auth' })
  } else {
    next()
  }
})

export default router