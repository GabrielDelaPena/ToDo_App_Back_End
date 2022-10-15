const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const listRoutes = require("./routes/list");
const authRoutes = require("./routes/auth");

// Configuration
const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Route middleware
app.use("/api/list", listRoutes);
app.use("/api/auth", authRoutes);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT).then((response) => {
  console.log("CONNECTED");
  app.listen(8080);
});
