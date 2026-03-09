import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "customer" | "contractor">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, role } = useAuth();
  const [roleTimeout, setRoleTimeout] = useState(false);

  // If loading is done but role is still null after 5 seconds, stop waiting
  useEffect(() => {
    if (!loading && user && !role) {
      const timer = setTimeout(() => setRoleTimeout(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, user, role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role fetch failed or timed out — redirect to login
  if (allowedRoles && !role && roleTimeout) {
    return <Navigate to="/login" replace />;
  }

  // Still waiting for role to load (brief moment)
  if (allowedRoles && !role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    if (role === "contractor") return <Navigate to="/contractor/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
