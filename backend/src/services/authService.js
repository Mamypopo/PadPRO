import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

export const registerUser = async ({ username, password, pattern }) => {
  const data = { username };

  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }

  if (pattern) {
    data.pattern = await bcrypt.hash(pattern, 12);
  }

  return await prisma.user.create({
    data,
    select: {
      id: true,
      username: true,
      level: true,
      currentXp: true,
      avatarUrl: true,
    },
  });
};

export const loginUser = async ({ username, password, pattern }) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      password: true,
      pattern: true,
      avatarUrl: true,
      level: true,
      currentXp: true,
      totalTasksCompleted: true,
    },
  });
  if (!user) return null;

  if (password && user.password) {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
  } else if (pattern && user.pattern) {
    const valid = await bcrypt.compare(pattern, user.pattern);
    if (!valid) return null;
  } else {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl,
    level: user.level,
    currentXp: user.currentXp,
    totalTasksCompleted: user.totalTasksCompleted,
  };
};