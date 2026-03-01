<template>
  <div class="p-4 md:p-6 max-w-2xl mx-auto">
    <h1 class="text-xl font-semibold text-text-primary mb-4">Stats / XP</h1>
    <div class="rounded-xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <span class="text-text-secondary">Level</span>
        <span class="font-semibold text-text-primary">{{ user?.level ?? 1 }}</span>
      </div>
      <div class="mb-2">
        <div class="flex justify-between text-sm text-text-secondary mb-1">
          <span>XP</span>
          <span>{{ user?.currentXp ?? 0 }} / 1000</span>
        </div>
        <div class="h-3 bg-surface-light rounded-full overflow-hidden">
          <div
            class="h-full bg-accent rounded-full transition-all duration-500"
            :style="{ width: xpPercent + '%' }"
          />
        </div>
      </div>
      <p class="text-sm text-text-secondary mt-4">
        Tasks completed: {{ user?.totalTasksCompleted ?? 0 }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'StatsView',

  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapGetters(useAuthStore, ['xpPercent']),
  },
}
</script>
