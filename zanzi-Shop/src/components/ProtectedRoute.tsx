import { Navigate, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import { Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const {role, user} = useUserRole();

  if (user && role === null) return <div><Spinner/></div>;
  if (!user) return <Navigate to="/login" />; // Redirect if not logged in
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />; // Redirect if role doesn't match

  return <Outlet />;
};
export default ProtectedRoute;
