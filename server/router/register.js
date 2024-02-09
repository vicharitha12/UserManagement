const express = require("express");
const router = express.Router();
const connection = require("../db/conn");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

router.post("/", (req, res) => {
  // Extract data from request body
  const { username, email, password, age, dob, contact } = req.body;

  // SQL query to insert new user into database
  const query = `INSERT INTO ${process.env.DBTable} (username, email, password,age,dob,contact) VALUES (?, ?, ?,?,?,?)`;

  // Execute SQL query with user data
  connection.query(
    query,
    [username, email, password, age, dob, contact],
    (err, results) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "User registered successfully" });
    }
  );
});

module.exports = router;
