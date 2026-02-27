import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  
  actions: {
    async login(credentials) {
      try {
        const { data } = await authApi.login(credentials)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', data.token)
        return data
      } catch (error) {
        throw error
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})