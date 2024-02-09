const express = require("express");
const router = express.Router();
const connection = require("../db/conn");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
function generateRandomNumber() {
  let randomNumber = "";
  for (let i = 0; i < 30; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

router.post("/", (req, res) => {
  // Extract data from request body
  const { email, password } = req.body;

  // SQL query to check if user exists
  const query = `SELECT * FROM ${process.env.DBTable} WHERE email = ? AND password = ?`;

  // Execute SQL query with user data
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    res.json({ message: "Login successful", token: generateRandomNumber() });
  });
});

module.exports = router;
