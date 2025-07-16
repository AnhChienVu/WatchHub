// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const provider = new GoogleAuthProvider();

// Force account selection every time
provider.setCustomParameters({
  prompt: 'select_account'
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "watchhub-699a0.firebaseapp.com",
  projectId: "watchhub-699a0",
  storageBucket: "watchhub-699a0.firebasestorage.app",
  messagingSenderId: "571075323026",
  appId: "1:571075323026:web:92ef3b05bd25e538bdb24b",
  measurementId: "G-BWPJYPNCDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await updateProfile(user, { displayName: name });

    // await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name: name,
    //   authProvider: "local",
    //   email: email,
    // });
    // Use setDoc with UID as document ID for secure rules
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: name,
      authProvider: "local",
      email: email,
    });
  } catch (error) {
    console.log(error);
    toast.error("Error signing up: " + error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    console.log("User signed in: ", user);
    return user;
  } catch (error) {
    console.log("Sign in error:", error);
    toast.error("Error signing in: " + error);
    return null; // Explicitly return null instead of undefined
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
    toast.error("Error signing out: " + error);
  }
};

export const handleGoogleSignIn = async () => {
  try {
    console.log("Attempting Google sign-in...");
    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    console.log("User signed in: ", user);

    // Store user in localStorage immediately after successful authentication
    localStorage.setItem("user", JSON.stringify(user));

    // Try to add user to database, but don't fail the sign-in if this fails
    try {
      const result = await fetch("/api/user/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          googleUser: true,
        }),
      });
      const resultData = await result.json();
      if (!resultData.success) {
        console.warn("Failed to create user in database:", resultData.error);
        // Don't throw error here, just log it
      }
    } catch (apiError) {
      console.warn("API call failed, but user is still signed in:", apiError);
      // Continue with sign-in even if API fails
    }

    window.location.href = "/profiles";
    return user;
  } catch (error) {
    console.log(error);
    toast.error("Error signing in with Google: " + (error as Error).message);
    return null;
  }
};
