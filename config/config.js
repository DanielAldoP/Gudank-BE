const Sequelize = require("sequelize");

const config = {
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbUser: process.env.DB_USERNAME || 'root',
  dbName: process.env.DB_DATABASE || 'gudank',
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT || "mysql",
  pool: {
    max: process.env.DB_POOL_MAX ? +process.env.DB_POOL_MAX : 10,
    min: process.env.DB_POOL_MIN ? +process.env.DB_POOL_MIN : 0,
    acquire: process.env.DB_POOL_ACQUIRE || 120000,
    idle: process.env.DB_POOL_IDLE || 20000
  }
};
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: config.dbDialect,
  logging: false,
  omitNull: true,
  pool: config.pool,
  timezone: '+00:00'
});

module.exports = sequelize;

