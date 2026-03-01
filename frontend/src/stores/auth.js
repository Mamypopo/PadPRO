import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'

const XP_PER_LEVEL = 1000

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    xpBarPulse: false,
  }),

  getters: {
    xpPercent(state) {
      if (!state.user) return 0
      return Math.min(100, (state.user.currentXp / XP_PER_LEVEL) * 100)
    },
  },

  actions: {
    async login(credentials) {
      const { data } = await authApi.login(credentials)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
      return data
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    setUser(partial) {
      if (this.user) this.user = { ...this.user, ...partial }
    },
    triggerXpPulse() {
      this.xpBarPulse = true
      setTimeout(() => {
        this.xpBarPulse = false
      }, 1200)
    },
  },
})