const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.SQLPORT,
});

module.exports = connection;
