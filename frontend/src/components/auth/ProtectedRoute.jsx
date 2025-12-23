import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // You might want to add more robust token validation here later
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
