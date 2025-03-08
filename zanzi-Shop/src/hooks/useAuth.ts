import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const registerUser = async (email: string, password: string, role: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Optional: Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      role: role
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
        case 'auth/operation-not-allowed':
          throw new Error('Email/password registration is not enabled');
        case 'auth/missing-email':
          throw new Error('Email is required');
        case 'auth/missing-password':
          throw new Error('Password is required');
        case 'auth/network-request-failed':
          throw new Error('Network error. Check your connection and try again');
        case 'auth/too-many-requests':
          throw new Error('Too many requests. Please try again later');
        default:
          throw new Error(`Registration failed: ${error.code}`);
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
        case 'auth/invalid-credential':
          throw new Error('Invalid credentials');
        case 'auth/invalid-login-credentials':
          throw new Error('Invalid login credentials');
        case 'auth/too-many-requests':
          throw new Error('Too many failed login attempts. Please try again later');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled');
        default:
          throw new Error(`Authentication error: ${error.code}`);
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