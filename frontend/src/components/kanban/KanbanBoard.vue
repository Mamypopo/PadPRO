<template>
  <div class="p-4 md:p-6">
    <h1 class="text-xl font-semibold text-text-primary mb-4">
      {{ boardData?.project?.name ?? 'Board' }}
    </h1>
    <div
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0"
      style="min-height: 400px;"
    >
      <BoardColumn
        v-for="status in boardData?.statuses ?? []"
        :key="status.id"
        :status="status"
        @move-task="onMoveTask"
        @update-tasks="onUpdateTasks"
      />
    </div>
  </div>
</template>

<script>
import BoardColumn from './BoardColumn.vue'
import { boardApi } from '@/api/board'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'KanbanBoard',

  components: { BoardColumn },

  props: {
    projectId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      boardData: null,
      loading: false,
      error: null,
    }
  },

  watch: {
    projectId: {
      immediate: true,
      handler(id) {
        if (id) this.fetchBoard()
      },
    },
  },

  methods: {
    async fetchBoard() {
      if (!this.projectId) return
      this.loading = true
      this.error = null
      try {
        const { data } = await boardApi.getBoard(this.projectId)
        this.boardData = data.data
      } catch (err) {
        this.error = err.response?.data?.error ?? 'Failed to load board'
      } finally {
        this.loading = false
      }
    },

    onUpdateTasks({ statusId, tasks }) {
      const s = this.boardData?.statuses?.find((st) => st.id === statusId)
      if (s) s.tasks = tasks
    },

    async onMoveTask({ taskId, statusId, order }) {
      try {
        const { data } = await boardApi.moveTask(taskId, { statusId, order })
        if (data.user) {
          useAuthStore().setUser(data.user)
          useAuthStore().triggerXpPulse()
        }
      } catch (err) {
        this.fetchBoard()
      }
    },
  },
}
</script>
