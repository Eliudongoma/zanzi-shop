import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";
import { Navigate, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const [loading] = useAuthState(auth);
  const {role, user} = useUserRole();
  console.log({loading, role})
  //if (loading || role === null) return <p>Loading...</p>; // Show loading

  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />; // Redirect if role doesn't match

  return <Outlet />;
};
export default ProtectedRoute;
