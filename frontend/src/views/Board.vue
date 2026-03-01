<template>
  <div>
    <div
      v-if="loading"
      class="flex items-center justify-center py-20"
    >
      <p class="text-text-secondary">Loading...</p>
    </div>
    <div
      v-else-if="error"
      class="py-20 text-center text-error"
    >
      {{ error }}
    </div>
    <div
      v-else-if="projectId"
      class="min-h-[60vh]"
    >
      <KanbanBoard
        :project-id="projectId"
      />
    </div>
    <div
      v-else
      class="py-20 text-center text-text-secondary"
    >
      <p>No project selected.</p>
      <router-link
        to="/projects"
        class="text-accent hover:underline mt-2 inline-block"
      >
        Choose a project
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { projectsApi } from '@/api/projects'
import KanbanBoard from '@/components/kanban/KanbanBoard.vue'

export default {
  name: 'BoardView',

  components: { KanbanBoard },

  data() {
    return {
      loading: false,
      error: null,
      defaultProjectId: null,
    }
  },

  computed: {
    ...mapState(useAuthStore, ['user']),
    projectId() {
      return this.$route.params.projectId || this.defaultProjectId
    },
  },

  mounted() {
    if (!this.$route.params.projectId) this.loadDefaultProject()
  },

  methods: {
    async loadDefaultProject() {
      this.loading = true
      this.error = null
      try {
        const { data } = await projectsApi.list()
        const list = data.data ?? []
        if (list.length > 0) {
          this.defaultProjectId = list[0].id
        }
      } catch (err) {
        this.error = err.response?.data?.error ?? 'Failed to load projects'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
