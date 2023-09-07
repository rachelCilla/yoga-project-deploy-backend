require("dotenv").config();
const { Pool } = require("pg");

console.log("User:", process.env.db_USERNAME);
console.log("Host:", process.env.db_HOST);
console.log("Port:", process.env.db_DBPORT);
console.log("Database:", process.env.db_DATABASE);

// For many RDS configurations, especially those publicly accessible, AWS requires or recommends the use of SSL.
const pool = new Pool({
  password: process.env.db_PASSWORD,
  host: process.env.db_HOST,
  port: process.env.db_DBPORT,
  database: process.env.db_DATABASE,
  user: process.env.db_USERNAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
