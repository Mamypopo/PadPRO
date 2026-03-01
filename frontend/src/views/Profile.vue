<template>
  <div class="p-4 md:p-6 max-w-2xl mx-auto">
    <h1 class="text-xl font-semibold text-text-primary mb-4">Profile</h1>
    <div class="rounded-xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm p-6">
      <div class="flex items-center gap-4 mb-6">
        <div
          class="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-surface text-2xl font-medium overflow-hidden"
        >
          <img
            v-if="user?.avatarUrl"
            :src="user.avatarUrl"
            alt="Avatar"
            class="w-full h-full object-cover"
          >
          <span v-else>{{ avatarInitial }}</span>
        </div>
        <div>
          <p class="font-medium text-text-primary">{{ user?.username }}</p>
          <p class="text-sm text-text-secondary">Level {{ user?.level ?? 1 }}</p>
        </div>
      </div>
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-accent text-surface text-sm font-medium hover:bg-accent-hover transition-colors"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

export default {
  name: 'ProfileView',

  computed: {
    ...mapState(useAuthStore, ['user']),
    avatarInitial() {
      const u = this.user?.username
      return u ? u.charAt(0).toUpperCase() : '?'
    },
  },

  methods: {
    logout() {
      useAuthStore().logout()
      router.push('/auth')
    },
  },
}
</script>
