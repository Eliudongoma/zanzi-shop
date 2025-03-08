// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../config/firebaseConfig";
import { Navigate, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  // const [userloading] = useAuthState(auth);
  const {role, user} = useUserRole();

  if (user && role === null) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />; // Redirect if role doesn't match

  return <Outlet />;
};
export default ProtectedRoute;
