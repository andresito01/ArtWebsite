// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import axios from "axios";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Function to fetch firebaseConfig from backend
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch(
      "https://us-central1-daliasartwebsite.cloudfunctions.net/getFirebaseConfig"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
    // const response = await axios.get(
    //   "https://us-central1-daliasartwebsite.cloudfunctions.net/getFirebaseConfig"
    // );
    // return response.data;
  } catch (error) {
    console.log("Error fetching firebaseConfig:", error);
    throw error;
  }
};

// Fetch and intialize Firebase configuration
const initializeFirebase = async () => {
  try {
    const firebaseConfig = await fetchFirebaseConfig();

    // Initialize Firebase App
    const app = initializeApp(firebaseConfig);

    // Return the initialized Firebase app
    return app;
  } catch (error) {
    console.log("Error initializing Firebase App:", error);
  }
};

const firebaseApp = await initializeFirebase();

// Initializing auth, db, and storage using initialized Firebase App
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
