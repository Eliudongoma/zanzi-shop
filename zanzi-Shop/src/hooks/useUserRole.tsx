import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const useUserRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const hasFetchedRole = useRef(false); // Prevent overrides

  useEffect(() => {
    let unsubscribe: () => void;

    const cleanup = () => {
      if (unsubscribe) unsubscribe();
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };

    if (user) {
      hasFetchedRole.current = false; // Reset for new user
      const userDocRef = doc(db, "users", user.uid);

      timeoutIdRef.current = setTimeout(() => {
        if (!hasFetchedRole.current) {
          console.log("Timeout triggered, setting role to 'user'");
          setError(new Error("Unable to connect to the server"));
          setIsOffline(true);
          setRole("user");
          hasFetchedRole.current = true;
        }
      }, 5000);

      unsubscribe = onSnapshot(
        userDocRef,
        (userDoc) => {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          if (userDoc.exists() && !hasFetchedRole.current) {
            const fetchedRole = userDoc.data().role;
            setRole(fetchedRole || "user");
            console.log("Set role to:", fetchedRole || "user");
            hasFetchedRole.current = true;
          } else if (!hasFetchedRole.current) {
            setRole("user");
            hasFetchedRole.current = true;
          }
          setError(null);
          setIsOffline(false);
        },
        (err) => {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          if (!hasFetchedRole.current) {
            console.error("Firestore error:", err);
            setError(err);
            setRole("user");
            if (err.message.includes("network") || err.code === "unavailable") {
              setIsOffline(true);
            }
            hasFetchedRole.current = true;
          }
        }
      );
    } else {
      setRole(null);
      setError(null);
      setIsOffline(false);
      hasFetchedRole.current = false;
    }

    return cleanup;
  }, [user]);

  useEffect(() => {
    console.log("Role state updated to:", role);
  }, [role]);

  return { user, role, error, isOffline };
};
export default useUserRole;