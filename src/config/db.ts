require('dotenv').config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  dialect: 'postgres',
  schema: process.env.DB_SCHEMA,
  logging: false
});

export default sequelize;
