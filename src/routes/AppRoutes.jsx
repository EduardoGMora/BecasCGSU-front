import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import AdminPage from "../pages/admin/AdminPage";
import { ApplicationsPage } from "../pages/ApplicationsPage";
import { ContactPage } from "../pages/ContactPage";
import { ScholarshipsPage } from "../pages/ScholarshipsPage";
import { SubAdminPanel } from "../pages/SubAdminPage";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { UserLayout } from "../layout/UserLayout";
import { StudentPage } from "../pages/StudentPage";

/**
 * AppRoutes component to define application routes
 * @returns {JSX.Element} AppRoutes component
 */
export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes with Layout */}
        <Route element={<UserLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/becas" element={<ScholarshipsPage />} />
          <Route path="/contacto" element={<ContactPage />} />

          {/* Protected Student Routes */}
          <Route
            path="/mis-solicitudes"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subadmin"
            element={
              <ProtectedRoute allowedRoles={["subadmin"]}>
                <SubAdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback Routes */}
        <Route path="/unauthorized" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
              <p className="text-gray-700 mb-6">No tienes permiso para acceder a esta página.</p>
              <a href="/" className="text-blue-600 underline">
                Volver al inicio de sesión
              </a>
            </div>
          </div>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}