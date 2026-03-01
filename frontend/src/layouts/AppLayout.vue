<template>
  <div class="min-h-screen bg-pearl relative overflow-x-hidden">
    <!-- Ambient glow / mesh gradient -->
    <div
      class="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-border rounded-full blur-[120px] opacity-60"
      />
      <div
        class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-border rounded-full blur-[100px] opacity-40"
      />
    </div>

    <!-- Top Gamification Header -->
    <header
      class="sticky top-0 z-10 bg-surface-glass backdrop-blur-lg border-b border-border shadow-sm"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-surface shrink-0 overflow-hidden"
          >
            <img
              v-if="user?.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="w-full h-full object-cover"
            >
            <span
              v-else
              class="text-sm font-medium"
            >{{ avatarInitial }}</span>
          </div>
          <div class="hidden sm:block">
            <p class="text-sm font-medium text-text-primary">{{ user?.username }}</p>
            <p class="text-xs text-text-secondary">Level {{ user?.level ?? 1 }}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 flex-1 max-w-xs md:max-w-sm ml-4">
          <div class="hidden sm:block text-right text-xs text-text-secondary shrink-0">
            {{ user?.currentXp ?? 0 }} / 1000 XP
          </div>
          <div class="flex-1 h-2.5 bg-surface-light rounded-full overflow-hidden">
            <div
              class="h-full bg-accent rounded-full transition-all duration-500 ease-out"
              :class="{ 'shadow-accent-glow animate-pulse': authStore.xpBarPulse }"
              :style="{ width: xpPercent + '%' }"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="relative z-10 pb-20 md:pb-8">
      <router-view />
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-surface-glass backdrop-blur-lg border-t border-border shadow-sm"
    >
      <div class="flex items-center justify-around h-16 px-2">
        <router-link
          to="/board"
          class="flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
          active-class="!text-accent"
        >
          <LayoutGrid class="w-6 h-6" />
          <span class="text-xs font-medium">Board</span>
        </router-link>
        <router-link
          to="/projects"
          class="flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
          active-class="!text-accent"
        >
          <Folder class="w-6 h-6" />
          <span class="text-xs font-medium">Projects</span>
        </router-link>
        <router-link
          to="/stats"
          class="flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
          active-class="!text-accent"
        >
          <Trophy class="w-6 h-6" />
          <span class="text-xs font-medium">Stats</span>
        </router-link>
        <router-link
          to="/profile"
          class="flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-lg transition-colors text-text-secondary hover:text-text-primary"
          active-class="!text-accent"
        >
          <User class="w-6 h-6" />
          <span class="text-xs font-medium">Profile</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { LayoutGrid, Folder, Trophy, User } from 'lucide-vue-next'

export default {
  name: 'AppLayout',
  components: { LayoutGrid, Folder, Trophy, User },

  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapGetters(useAuthStore, ['xpPercent']),
    authStore() {
      return useAuthStore()
    },
    avatarInitial() {
      const u = this.user?.username
      return u ? u.charAt(0).toUpperCase() : '?'
    },
  },
}
</script>
