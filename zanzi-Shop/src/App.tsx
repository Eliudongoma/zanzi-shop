import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUserRole from "./hooks/useUserRole";
import Layout, { ProductQuery } from "./components/Layout";
import Login from "./pages/Authentication/Login";
import ProductGrid from "./components/Product/ProductGrid";
import Register from "./pages/Authentication/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import AppError from "./components/AppError";
import { NotFound } from "./pages/NotFound";
import  Cart  from "./pages/CartPage";
import NavBar from "./components/NavBar";
import { useState } from "react";


// Wrapper to handle redirects based on role
const RoleBasedRedirect = ({ children }: { children: React.ReactNode }) => {
  const { error, isOffline, loading } = useUserRole();

  if (loading) {
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
  const [productQuery, setProductQuery] = useState<ProductQuery>(
    {} as ProductQuery
  );
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar
              onSearch={(search) => setProductQuery({ ...productQuery, search })}
            />
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
          <Route path="/cart" element={<Cart />} />
          {/* Moved outside ProtectedRoute */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RoleBasedRedirect>
    </Router>
  );
}

export default App;
