import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router' // นำเข้า router เพื่อการเปลี่ยนหน้าแบบ SPA

const api = axios.create({
  // ปรับให้ตรงกับหลังบ้าน PadPRO (Port 5000 / v1)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout() // ปรับชื่อ function ตามที่มีใน store ใหม่
      
      // ใช้ router push จะไม่ทำให้หน้าเว็บกระพริบ (Apple Style)
      if (router.currentRoute.value.path !== '/auth') {
        router.push('/auth')
      }
    }
    return Promise.reject(error)
  }
)

export default api