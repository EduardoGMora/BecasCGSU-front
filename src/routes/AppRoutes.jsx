import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import AdminPage from "../pages/admin/AdminPage";
import { ApplicationsPage } from "../pages/RequestsPage";
import { ContactPage } from "../pages/ContactPage";
import { ScholarshipsPage } from "../pages/ScholarshipsPage";
import { SubAdminPanel } from "../pages/SubAdminPage";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { UserLayout } from "../layout/UserLayout";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes with Layout */}
        <Route element={<UserLayout />}>
          {/* Student Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/becas"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ScholarshipsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-solicitudes"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacto"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ContactPage />
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
                <AdminPage />
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