import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Redirect to login if not authenticated
export const PrivateRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="text-slate-400">Loading…</span></div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

// Redirect to dashboard if already logged in
export const PublicRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="text-slate-400">Loading…</span></div>;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// Admin-only route
export const AdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><span className="text-slate-400">Loading…</span></div>;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
