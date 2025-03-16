import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Spinner from "./Spinner";

interface RouteType {
  requiredRole?: string;
  children?: React.ReactNode;
}
const EXEMPT_PATHS = ['/login', '/register', '/cart'];
const ProtectedRoute = ({ requiredRole, children }: RouteType) => {
  const { role, user, loading} = useUserRole();
  const location = useLocation();

  if ((user && role === null) || loading) return <Spinner />;

  const getRedirectPath = () => {
    const normalizePath = (path: string) => path.replace(/\/+$/, "");
    const currentPath = normalizePath(location.pathname);
    const exemptPaths = EXEMPT_PATHS.map(normalizePath);

    if (!user) {
      if (exemptPaths.includes(currentPath)) return currentPath;
      return "/products";
    }
    // Logged in: redirect based on role
    const defaultPath = role === "admin" ? "/admin" : "/products";

    // If a specific role is required and doesn't match, redirect to default
    if (requiredRole && role !== requiredRole) {
      return defaultPath;
    }
    // If no requiredRole or role matches, stay on current path unless it’s exempt
    if (currentPath !== defaultPath && !exemptPaths.includes(currentPath)) {
      return defaultPath;
    }
    return currentPath; // Stay on current path if allowed
  };

  const targetPath = getRedirectPath();

  if (location.pathname !== targetPath) {
    return <Navigate to={targetPath} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};
export default ProtectedRoute;
