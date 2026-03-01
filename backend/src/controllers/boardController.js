import * as boardService from '../services/boardService.js';

export const getBoard = async (req, res, next) => {
  try {
    const board = await boardService.getBoard(req.params.projectId, req.user.id);
    if (!board) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, data: board });
  } catch (error) {
    next(error);
  }
};

export const moveTask = async (req, res, next) => {
  try {
    const { statusId, order } = req.body;
    if (!statusId || typeof order !== 'number') {
      return res.status(400).json({ error: 'statusId and order (number) required' });
    }
    const result = await boardService.moveTask(req.params.taskId, req.user.id, {
      statusId,
      order,
    });
    res.json({ success: true, ...result });
  } catch (error) {
    if (error.message === 'Task not found' || error.message === 'Status not found') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};
