import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";

// pages
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import AdminPage from "./pages/admin/AdminPage";
import { SubAdminPanel } from "./pages/subAdminPage";
import { ScholarshipsPage } from "./pages/ScholarshipsPage";
import { ApplicationsPage } from "./pages/RequestsPage";

// layout
import { UserLayout } from "./layout/UserLayout";

export function App() {
  return (
    <AuthProvider>
        <Routes>
          {/* Página de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* --- LAYOUT GENERAL --- */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["student", "admin", "subadmin"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            {/* Rutas compartidas */}
            <Route index element={<HomePage />} />
            <Route path="becas" element={<ScholarshipsPage />} />

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
          </Route>
        </Routes>
    </AuthProvider>
  );
}
