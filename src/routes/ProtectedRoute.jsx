import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, user }) => {
  if (!user) {
    // No autenticado → redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Rol no autorizado → redirigir a página de error o home
    return <Navigate to="/unauthorized" replace />;
  }

  // Autorizado → renderizar las rutas hijas
  return <Outlet />;
};