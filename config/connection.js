const Sequelize = require('sequelize');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tech_db');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;