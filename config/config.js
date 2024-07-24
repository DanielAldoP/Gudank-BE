module.exports = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'gudank',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3307',
  dialect: process.env.DB_DIALECT || 'mysql'
};