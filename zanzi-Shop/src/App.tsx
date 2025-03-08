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

function App() {
  const { user, role } = useUserRole();
  // console.log(role === "admin")

  // if (user === null) return <div>Loading...</div>;
  const getRedirectPath = () => {
    if (role === "admin") {
      return "/admin";
    }
    return "/products";
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<ProductGrid />} />
          <Route path="products" element={<ProductGrid />} />
          {/* Protected Admin Route */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="admin" element={<Dashboard />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={getRedirectPath()} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={getRedirectPath()} />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
