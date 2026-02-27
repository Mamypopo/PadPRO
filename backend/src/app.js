import express from 'express';
import cors from 'cors';
import compression from 'compression'; 
import morgan from 'morgan';        
import { ENV } from './config/env.js';

import apiRoutes from './routes/index.js';

const app = express();

if (ENV.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(compression());


const corsOptions = {
    origin: (origin, callback) => {
      // อนุญาตถ้าไม่มี origin (เช่น Postman) หรือ origin ตรงกับที่ระบุใน .env
      if (!origin || ENV.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS policy'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

export default app;