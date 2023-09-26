const functions = require("firebase-functions");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin:
    "https://daliasartwebsite.web.app" ||
    "https://daliasartwebsite.firebaseapp.com", // Update with your frontend URL
};
const app = express();
app.use(cors(corsOptions));

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

app.get("/getFirebaseConfig", (req, res) => {
  try {
    // Log incoming request
    console.log("Received request to /getFirebaseConfig");

    res.json(firebaseConfig);
  } catch (error) {
    // Log any errors
    console.error("Error in /getFirebaseConfig:", error);
    res.status(500).send("Internal Server Error");
  }
});

exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
  if (!req.path) {
    // prepending "/" keeps query params, path params intact
    req.url = `/${req.url}`;
  }

  return app(req, res);
});

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
