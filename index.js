const express = require("express");
const axios = require("axios");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, "Public")));
// Middleware to parse JSON
app.use(express.json());
db.sequelize.sync();
// Route to handle posting data
app.post("/post-data", async (req, res) => {
  try {
    const { password, email, fullName } = req.body;

    if (!email) {
      return res.status(400).send("email is required");
    } else if (!password) {
      return res.status(400).send("Password is required");
    } else if (!fullName) {
      return res.status(400).send("fullname is required");
    }
    const user = await db.User.create({ email, password, fullName });
    res.status(201).send({ message: "Data posted successfully", user });
  } catch (error) {
    console.error("Error posting data:", error.message);
    res.status(500).send("An error occurred while posting data");
  }
});

// Route to display the headers on a page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
