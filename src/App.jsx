import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

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
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Header isAdmin={isAdmin} />

                <main className="max-w-7xl mx-auto px-6 pb-12">
                    <Routes>
                        <Route path="/" element={<HomePage onApply={handleApply} />} />
                        <Route path="/becas" element={<ScholarshipsPage onApply={handleApply} />} />
                        <Route path="/mis-solicitudes" element={<ApplicationsPage />} />
                        <Route path="/contacto" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="*" element={<div className="pt-20">Página no encontrada</div>} />
                    </Routes>
                </main>

                <ApplicationModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                scholarship={selectedScholarship}
                />

                <Footer />
            </div>
        </Router>
    );
}
