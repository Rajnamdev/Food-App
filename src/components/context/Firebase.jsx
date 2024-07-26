import React from 'react'
import { createContext,useContext } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { getDatabase,set,ref } from 'firebase/database';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfOeE52L8F9slsrRSJ_8kbkRsKbz1B43I",
    authDomain: "zomato-76e3f.firebaseapp.com",
    databaseURL: "https://zomato-76e3f-default-rtdb.firebaseio.com",
    projectId: "zomato-76e3f",
    storageBucket: "zomato-76e3f.appspot.com",
    messagingSenderId: "782210523854",
    appId: "1:782210523854:web:1793a9508d46645c65269f",
    measurementId: "G-0818PKC490",
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase authentication instance
const auth = getAuth(firebaseApp);

// Get Firebase database instance
const database = getDatabase(firebaseApp);

// Create Firebase context
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const putData = async (key, data) => {
    try {
      await set(ref(database, key), data);
    } catch (error) {
      console.error("Error putting data:", error.message);
      throw error;
    }
  };

    // Function to log in with email and password
    const loginWithEmailAndPassword = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
      }
    };
      // Function to sign out
  const signOutUser = async () => {
   try {
     await signOut(auth);
   } catch (error) {
     console.error("Error signing out:", error.message);
     throw error;
   }
 };
 // Function to check if the user is signed in
 const isUserSignedIn = () => {
   const auth = getAuth();
   return !!auth.currentUser;
 };
  return (
    <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, putData,loginWithEmailAndPassword,signOutUser,isUserSignedIn,}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};