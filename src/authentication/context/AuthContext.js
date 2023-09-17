import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import * as fb from "firebase/auth";
//import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  // User Authentication Methods

  /*
  async function registration(email, password) {
    try {
      await fb.createUserWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;
      const userRef = doc(db, "users", currentUser.uid);

      await setDoc(userRef, {
        email: currentUser.email,
        password: currentUser.password,
      });
    } catch (err) {
      console.log("There is something wrong!", err.message);
    }
  }
  */

  async function signIn(email, password) {
    try {
      await fb.signInWithEmailAndPassword(fb.getAuth(), email, password);
      console.log("User Logged In");
    } catch (err) {
      console.log("There is something wrong!", err.message);
    }
  }

  async function signOut() {
    try {
      await fb.signOut(fb.getAuth());
      console.log("User Logged Out");
    } catch (err) {
      console.log("There is something wrong!", err.message);
    }
  }

  // Update everytime user changes state
  useEffect(() => {
    const unsubscribe = fb.onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
