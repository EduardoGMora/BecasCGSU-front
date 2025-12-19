import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    // No autenticado → al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Autenticado pero sin permiso → página de acceso denegado
    return <Navigate to="/unauthorized" replace />;
  }

  // Autorizado → renderizar el children
  return children;
}