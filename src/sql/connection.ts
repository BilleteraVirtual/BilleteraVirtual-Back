import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '@src/models/User.model';
import Category from '@src/models/Category.model';
import Entity from '@src/models/Entity.model';
import Company from '@src/models/Company.model';
import Reservation from '@src/models/Reservation.model';
import Transaction from '@src/models/Transaction.model';
// Importa todos tus modelos aquí

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql', 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  logging: console.log,
  models: [User, Category, Entity, Company, Reservation, Transaction], 
});

// Authenticate the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');


    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database and tables have been created.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
