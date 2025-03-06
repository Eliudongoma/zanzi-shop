import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Optional: Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      role: "user"
    });
    
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('Email is already registered');
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/weak-password':
          throw new Error('Password is too weak');
        default:
          throw new Error('Registration failed');
      }
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No user found with this email');
        case 'auth/wrong-password':
          throw new Error('Incorrect password');
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        default:
          throw new Error('Login failed Please try again');
      }
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed', error);
    throw new Error('Logout failed');
  }
};