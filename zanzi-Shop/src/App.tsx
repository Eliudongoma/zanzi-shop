import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useUserRole from "./hooks/useUserRole";
import Layout from "./components/Layout";
import Login from "./components/Login";
import ProductGrid from "./components/Product/ProductGrid";
import Register from "./components/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useUserRole();

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductGrid />} />
          <Route path="products" element={<ProductGrid />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/products" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/products" />}
        />

        {/* Protected User Route */}
        {/* <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route> */}

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
