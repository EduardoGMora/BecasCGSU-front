import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import {LoginPage} from "./pages/LoginPage";
// pages
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPanel } from './pages/AdminPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { ApplicationsPage } from './pages/RequestsPage';

// components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { ChatBot } from './components/Chatbot';

// Componente principal de la App
export function App() {
    const isAdmin = true; // cambiar a false para usuario normal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    const handleApply = (scholarship) => {
        setSelectedScholarship(scholarship);
        setModalOpen(true);
    };

    return (
        <AuthProvider>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/admin"
                element={
                <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminPanel />
                </ProtectedRoute>
                }
            />

            <Route
                path="/user"
                element={
                <ProtectedRoute allowedRoles={["student"]}>
                    <HomePage />
                </ProtectedRoute>
                }
            />
            </Routes>
        </AuthProvider>
    );
}