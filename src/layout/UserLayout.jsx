import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChatBot } from "../components/Chatbot";
import { ApplicationModal } from "../components/ApplicationModal";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function UserLayout() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleApply = (scholarship) => {
    setSelectedScholarship(scholarship);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header role={user.role} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <Outlet context={{ handleApply }} />
      </main>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        scholarship={selectedScholarship}
      />

      <ChatBot />
      <Footer />
    </div>
  );
}
