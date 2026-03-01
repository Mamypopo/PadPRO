<template>
    <div class="p-10 bg-background min-h-screen text-text-primary">
      <h1 class="text-4xl font-black italic">DASHBOARD <span class="text-primary text-xl">CONNECTED</span></h1>
      <button @click="handleLogout" class="mt-4 px-6 py-2 bg-error text-surface rounded-xl">Logout</button>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth'
  
  export default {
    methods: {
      handleLogout() {
        const authStore = useAuthStore()
        authStore.logout()
        this.$router.push('/auth')
      }
    }
  }
  </script>