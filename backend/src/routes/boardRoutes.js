import { Router } from 'express';
import * as boardController from '../controllers/boardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/:projectId', boardController.getBoard);
router.patch('/tasks/:taskId/move', boardController.moveTask);

export default router;
