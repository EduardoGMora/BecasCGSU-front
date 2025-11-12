import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/admin/AdminPage";
import RequestsPage from "../pages/RequestsPage";
import ContactPage from "../pages/ContactPage";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";

export const AppRoutes = ({ user }) => {
  return (
    <Routes>
        {/* Pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

        {/* Protegidas */}
        <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
            </ProtectedRoute>
            }
        />

        <Route element={<ProtectedRoute allowedRoles={["student", "admin"]} user={user} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
};
