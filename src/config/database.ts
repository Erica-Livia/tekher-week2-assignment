import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modals/User';
import { Post } from '../modals/Post';
import { Comment } from '../modals/Comment';
import { Like } from '../modals/Like';
import {Share} from "../modals/Share";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'blog_db',
  synchronize: true, 
  entities: [User, Post, Comment, Like, Share],

  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error during database initialization', error);
    throw error;
  }
};