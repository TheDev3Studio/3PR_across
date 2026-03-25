import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAdminAuth();
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}
