import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await signOut(auth);
        console.log("User signed out successfully.");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    signOutUser();
  }, []);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = "admin"; // Initialize the role variable
      await setDoc(doc(db, "users", user.uid), { email, role });
      toast.success("Registered successfully!");
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
