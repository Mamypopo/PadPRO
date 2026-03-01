import prisma from '../config/prisma.js';

const XP_PER_LEVEL = 1000;

export const getBoard = async (projectId, userId) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId, isDeleted: false },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
  if (!project) return null;

  const statuses = await prisma.status.findMany({
    where: { projectId, isDeleted: false },
    orderBy: { order: 'asc' },
    include: {
      tasks: {
        where: { isDeleted: false },
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          content: true,
          priority: true,
          order: true,
          tags: true,
          xpReward: true,
          dueDate: true,
          statusId: true,
          createdAt: true,
        },
      },
    },
  });

  return { project, statuses };
};

export const moveTask = async (taskId, userId, { statusId, order }) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.findFirst({
      where: { id: taskId, userId, isDeleted: false },
      include: { status: true },
    });
    if (!task) throw new Error('Task not found');

    const newStatus = await tx.status.findFirst({
      where: { id: statusId, projectId: task.projectId, isDeleted: false },
    });
    if (!newStatus) throw new Error('Status not found');

    const updatedTask = await tx.task.update({
      where: { id: taskId },
      data: { statusId, order },
      select: {
        id: true,
        title: true,
        statusId: true,
        order: true,
        xpReward: true,
      },
    });

    let userUpdate = null;
    if (newStatus.isCompletion) {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { level: true, currentXp: true },
      });
      let newXp = user.currentXp + task.xpReward;
      let newLevel = user.level;
      while (newXp >= XP_PER_LEVEL) {
        newXp -= XP_PER_LEVEL;
        newLevel += 1;
      }
      await tx.user.update({
        where: { id: userId },
        data: {
          currentXp: newXp,
          level: newLevel,
          totalTasksCompleted: { increment: 1 },
        },
      });
      userUpdate = { level: newLevel, currentXp: newXp };
    }

    return { task: updatedTask, user: userUpdate };
  });
};
