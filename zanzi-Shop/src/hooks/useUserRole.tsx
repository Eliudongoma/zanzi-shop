import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserRole = () => {
  const [authState, loading] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [customError, setCustomError] = useState<Error | null>(null);

  // Listen for online/offline changes
  useEffect(() => {
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (authState) {
      if (!navigator.onLine) {
        if(mounted){
        setError(new Error("You’re offline. Please check your internet connection."));
        setIsOffline(true);
        setRole("user"); // Default role when offline
        }
        return;
      }


      const fetchRole = async () => {
        try {
          const userDocRef = doc(db, "users", authState.uid);
          const userDoc = await getDoc(userDocRef);
          if (mounted) {
            setRole(userDoc.exists() ? userDoc.data().role || "user" : "user");
            setCustomError(null);
            setIsOffline(false);
          }
        } catch (err) {
          if (mounted) {
            setCustomError(err as Error);
            setRole("user");
          }
        }
      };

      fetchRole();
    } else if (!loading) {
      // User is null (not logged in) and loading is complete
      if (mounted) {
        setRole(null);
        setCustomError(null);
        setIsOffline(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [authState, loading]);

  return { user: authState, role, error: customError || error, isOffline, loading };};
export default useUserRole;