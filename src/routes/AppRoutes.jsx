import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/admin/AdminPage";
import RequestsPage from "../pages/RequestsPage";
import ContactPage from "../pages/ContactPage";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";

export default function AppRoutes( user ) {
  return (
    <AuthProvider>
      <Routes>
          {/* Pública */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          {/* Rutas exclusivas de STUDENT */}
          <Route
            path="mis-solicitudes"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="contacto"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ContactPage />
              </ProtectedRoute> 
            }
          />

            {/* Ruta exclusiva de ADMIN */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="subadmin"
            element={
              <ProtectedRoute allowedRoles={["subadmin"]}>
                <SubAdminPanel />
              </ProtectedRoute>
            }
          />

            {/* Página no encontrada */}
          <Route
            path="*"
            element={
              <div className="pt-20 text-center">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">404</h1>
                <p className="text-gray-600">Página no encontrada</p>
              </div>
            }
          />
      </Routes>
    </AuthProvider>
  );
};
