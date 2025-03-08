import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const useUserRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        unsubscribe = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          }else{
            setRole(null)
          }
        })
        
      }
      return () => {
        if(unsubscribe) unsubscribe();
      }
  }, [user]);
  return { user, role};
};

export default useUserRole;
