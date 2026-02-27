import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

export const registerUser = async ({ username, password, pattern }) => {
  const data = { username };

  if (password) {
    data.password = await bcrypt.hash(password, 12);
  }
  
  if (pattern) {
    // Pattern ลากเส้นเราจะส่งมาเป็นชุดตัวเลข เช่น "0125"
    data.pattern = await bcrypt.hash(pattern, 12);
  }

  return await prisma.user.create({
    data,
    select: { id: true, username: true }
  });
};