const { Pool } = require("pg");

// Make sure dotenv is loaded BEFORE this file is used
// (usually loaded in server.js)

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
  process.exit(1);
});

module.exports = pool;