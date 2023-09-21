// Defining port server
const port = 5000;

// Initializing installed dependencies
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Listening on port 5000
app.listen(port, () => console.log(`Server is running on ${port}`));

// API request
app.get("/", (req, res) => {
  res.json(firebaseConfig);
});
