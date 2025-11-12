import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    // No autenticado → al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Autenticado pero sin permiso → página de acceso denegado
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-gray-700 mb-6">No tienes permiso para acceder a esta página.</p>
        <a
          href={user.role === "admin" ? "/admin" : "/user"}
          className="text-blue-600 underline"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  // Autorizado → renderizar la vista
  return children;
}