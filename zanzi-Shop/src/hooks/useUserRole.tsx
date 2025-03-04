import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        // console.log(user) 
        const userDoc = await getDoc(doc(db, "users", user.uid));
        // console.log(userDoc.data()?.role)

        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      }
    };
    fetchRole();
  }, [user]);
  return { user, role};
};

export default useUserRole;
