const mysql = require('mysql2/promise');

// Parse DATABASE_URL and handle SSL for TiDB Cloud
let dbConfig;

if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    port: parseInt(url.port) || 4000,
    user: url.username,
    password: decodeURIComponent(url.password),
    database: url.pathname.replace('/', ''),
    ssl: {
      rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  };
} else {
  throw new Error('DATABASE_URL is not set');
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;
