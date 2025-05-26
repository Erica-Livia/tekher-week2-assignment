import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authroutes';
import postsRoutes from './routes/postsroutes';
import sequelize from './config/db';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/posts', postsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('My Blog API is running...');
});

// Database connection
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Database connection error:', err);
});

export default app;