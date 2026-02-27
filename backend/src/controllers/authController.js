import * as authService from '../services/authService.js';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const handleRegister = async (req, res, next) => {
  try {
    const { username, password, pattern } = req.body;
    // ตรวจสอบว่าต้องมีอย่างใดอย่างหนึ่ง
    if (!password && !pattern) {
      return res.status(400).json({ error: 'Please provide either a password or a pattern' });
    }

    const user = await authService.registerUser({ username, password, pattern });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    const { username, password, pattern } = req.body;
    const user = await authService.loginUser({ username, password, pattern });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // สร้าง JWT Token
    const token = jwt.sign({ id: user.id }, ENV.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    next(error);
  }
};