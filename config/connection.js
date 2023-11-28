const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // If DATABASE_URL is set (Heroku), use it
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
      socketPath: '/cloudsql/your-project-id:your-region:your-instance-name', // If using Google Cloud SQL
    },
  });
} else {
  // Use local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
    }
  );
}

module.exports = sequelize;
