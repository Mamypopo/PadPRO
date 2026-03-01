import prisma from '../config/prisma.js';

export const getProjectsByUser = async (userId) => {
  return await prisma.project.findMany({
    where: { userId, isDeleted: false },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
  });
};

export const getProjectById = async (projectId, userId) => {
  return await prisma.project.findFirst({
    where: { id: projectId, userId, isDeleted: false },
    include: {
      statuses: {
        where: { isDeleted: false },
        orderBy: { order: 'asc' },
      },
    },
  });
};

export const createProject = async (userId, { name, description }) => {
  const project = await prisma.project.create({
    data: {
      name: name || 'New Project',
      description: description || null,
      userId,
    },
  });
  await prisma.status.createMany({
    data: [
      { name: 'To Do', order: 0, projectId: project.id },
      { name: 'In Progress', order: 1, projectId: project.id },
      { name: 'Done', order: 2, isCompletion: true, projectId: project.id },
    ],
  });
  return getProjectById(project.id, userId);
};

export const updateProject = async (projectId, userId, data) => {
  await prisma.project.updateMany({
    where: { id: projectId, userId },
    data: { name: data.name, description: data.description },
  });
  return getProjectById(projectId, userId);
};

export const deleteProject = async (projectId, userId) => {
  await prisma.project.updateMany({
    where: { id: projectId, userId },
    data: { isDeleted: true },
  });
};
