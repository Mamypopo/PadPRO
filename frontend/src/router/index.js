import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthView from '@/views/auth/Auth.vue'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    // ถ้า Login แล้ว ห้ามกลับมาหน้า Auth อีก (Redirect ไป Dashboard แทน)
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.token) next({ name: 'dashboard' })
      else next()
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // ใช้ Lazy Loading เพื่อความเร็วแบบ McLaren (โหลดเฉพาะตอนจะใช้)
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/auth'
  },
  // Catch-all route สำหรับหน้า 404
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