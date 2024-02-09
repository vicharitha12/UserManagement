const express = require("express");
const router = express.Router();
const connection = require("../db/conn");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// API endpoint to get all users
router.get("/", (req, res) => {
  // SQL query to fetch all users
  const query = `SELECT * FROM ${process.env.DBTable}`;

  // Execute SQL query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to update user data
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { username, email, age, dob, contact } = req.body;

  let updates = []; // Array to store field updates
  let values = []; // Array to store corresponding values for the updates

  // Construct the updates array and values array based on the fields present in the request body
  if (username) {
    updates.push("username = ?");
    values.push(username);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (age) {
    updates.push("age = ?");
    values.push(age);
  }
  if (dob) {
    updates.push("dob = ?");
    values.push(dob);
  }
  if (contact) {
    updates.push("contact = ?");
    values.push(contact);
  }

  // SQL query to update user data
  const query = `UPDATE ${process.env.DBTable} SET ${updates.join(
    ", "
  )} WHERE user_id = ?`;

  // Add userId to the values array
  values.push(userId);

  // Execute SQL query with user data
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json({ message: "User data updated successfully" });
  });
});

module.exports = router;
