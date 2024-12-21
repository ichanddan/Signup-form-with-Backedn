const express = require("express");
const axios = require("axios");
const path = require("path");
const db = require("./db");
const fileUpload = require("express-fileupload");
const cloudinary = require("./claudnarry");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.static(path.join(__dirname, "Public")));
// Middleware to parse JSON
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Directory for storing temporary files
  })
);
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

app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.uploadedFile) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.uploadedFile;
  console.log("File received:", file);
  try {
    const upload = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      public_id: "image" + Date.now(),
    });
    res.json({
      message: "Image uploaded successfully",
      url: upload.secure_url,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "An error occurred while uploading image" });
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
