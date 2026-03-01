<template>
  <div class="p-4 md:p-6 max-w-2xl mx-auto">
    <h1 class="text-xl font-semibold text-text-primary mb-4">Projects</h1>
    <div
      v-if="loading"
      class="text-text-secondary"
    >
      Loading...
    </div>
    <ul
      v-else
      class="space-y-3"
    >
      <li
        v-for="project in projects"
        :key="project.id"
        class="rounded-xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm p-4 transition-all duration-300 hover:shadow-md"
      >
        <router-link
          :to="{ name: 'board-project', params: { projectId: project.id } }"
          class="block text-text-primary font-medium"
        >
          {{ project.name }}
        </router-link>
        <p
          v-if="project.description"
          class="text-sm text-text-secondary mt-1"
        >
          {{ project.description }}
        </p>
      </li>
    </ul>
    <p
      v-if="!loading && projects.length === 0"
      class="text-text-secondary"
    >
      No projects yet.
    </p>
  </div>
</template>

<script>
import { projectsApi } from '@/api/projects'

export default {
  name: 'ProjectListView',

  data() {
    return {
      projects: [],
      loading: false,
    }
  },

  mounted() {
    this.fetchProjects()
  },

  methods: {
    async fetchProjects() {
      this.loading = true
      try {
        const { data } = await projectsApi.list()
        this.projects = data.data ?? []
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
