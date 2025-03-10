import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUserRole from "./hooks/useUserRole";
import Layout from "./components/Layout";
import Login from "./pages/Authentication/Login";
import ProductGrid from "./components/Product/ProductGrid";
import Register from "./pages/Authentication/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import AppError from "./components/AppError";

// Wrapper to handle redirects based on role
const RoleBasedRedirect = ({ children }: { children: React.ReactNode }) => {
  const { user, error, isOffline } = useUserRole();

  if (user === undefined) {
    return <Loading message="Initializing authentication..." />;
  }

  if (error || isOffline) {
    return (
      <AppError
        error={error || new Error("No internet connection")}
        customTitle={isOffline ? "You’re Offline" : undefined}
        onRetry={() => window.location.reload()}
        retryText="Try Again"
      />
    );
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <RoleBasedRedirect>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProductGrid />} />
            <Route path="products" element={<ProductGrid />} />
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="admin" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </RoleBasedRedirect>
    </Router>
  );
}

export default App;
