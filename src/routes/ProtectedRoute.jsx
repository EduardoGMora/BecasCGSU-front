import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
+ * ProtectedRoute component to restrict access based on user roles
+ * @param {Object} props - Component props
+ * @param {string[]} props.allowedRoles - Array of roles allowed to access the route
+ * @param {JSX.Element} props.children - Child components to render if authorized
+ * @returns {JSX.Element} ProtectedRoute component
+ */
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