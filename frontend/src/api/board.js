import api from '@/api/axios'

export const boardApi = {
  getBoard(projectId) {
    return api.get(`/board/${projectId}`)
  },

  moveTask(taskId, payload) {
    return api.patch(`/board/tasks/${taskId}/move`, payload)
  },
}
