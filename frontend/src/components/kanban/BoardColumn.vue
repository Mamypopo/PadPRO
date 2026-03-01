<template>
  <div
    class="flex-shrink-0 w-72 snap-center md:snap-align-none rounded-2xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm overflow-hidden flex flex-col"
  >
    <div class="px-4 py-3 border-b border-border">
      <h3 class="font-semibold text-text-primary text-sm">
        {{ status.name }}
      </h3>
    </div>
    <div class="flex-1 overflow-y-auto p-3 min-h-[120px]">
      <draggable
        :model-value="status.tasks"
        item-key="id"
        :group="{ name: 'tasks', pull: true, put: true }"
        class="space-y-3"
        ghost-class="opacity-50"
        @update:model-value="onListUpdate"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

export default {
  name: 'BoardColumn',

  components: { draggable, TaskCard },

  props: {
    status: {
      type: Object,
      required: true,
    },
  },

  emits: ['move-task', 'update-tasks'],

  methods: {
    onListUpdate(tasks) {
      this.$emit('update-tasks', { statusId: this.status.id, tasks })
    },
    onDragEnd(evt) {
      const { to, newIndex } = evt
      if (!to || newIndex === undefined) return
      const list = this.status.tasks
      const task = list[newIndex]
      if (task && task.id) {
        this.$emit('move-task', {
          taskId: task.id,
          statusId: this.status.id,
          order: newIndex,
        })
      }
    },
  },
}
</script>
