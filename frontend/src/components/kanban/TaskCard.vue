<template>
  <div
    class="rounded-xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left cursor-grab active:cursor-grabbing"
    :class="dragClass"
  >
    <h3 class="font-medium text-text-primary text-sm mb-2 line-clamp-2">
      {{ task.title }}
    </h3>
    <div
      v-if="hasTags"
      class="flex flex-wrap gap-1.5 mb-2"
    >
      <span
        v-for="tag in parsedTags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded-md bg-surface-light text-text-secondary"
      >
        {{ tag }}
      </span>
    </div>
    <div class="flex items-center justify-between mt-2 pt-2 border-t border-border-light">
      <span class="text-xs text-text-secondary">
        +{{ task.xpReward ?? 50 }} XP
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',

  props: {
    task: {
      type: Object,
      required: true,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dragClass() {
      return this.isDragging
        ? 'rotate-2 shadow-lg scale-[1.02]'
        : ''
    },
    parsedTags() {
      try {
        const t = this.task.tags
        if (typeof t === 'string') {
          const arr = JSON.parse(t)
          return Array.isArray(arr) ? arr.slice(0, 3) : []
        }
        return Array.isArray(t) ? t.slice(0, 3) : []
      } catch {
        return []
      }
    },
    hasTags() {
      return this.parsedTags.length > 0
    },
  },
}
</script>
