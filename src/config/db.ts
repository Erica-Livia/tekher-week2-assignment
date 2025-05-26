import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5433'),
  dialect: 'postgres',
  models: [path.join(__dirname, '../models')],
  logging: console.log,
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;