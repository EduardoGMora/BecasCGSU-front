import { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { HeroCard } from '../components/HeroCard';
import { Modal } from '../components/Modal';
import { FormField } from '../components/FormField';
import { DetailCard, DetailSection, DetailHeader } from '../components/DetailCard';
import applicationsData from '../utils/applicationsUser.json';

// Componente ApplicationsPage
export function ApplicationsPage() {
    const [applications, setApplications] = useState(applicationsData);
    const [modalType, setModalType] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);
    const [formData, setFormData] = useState({});

    const openModal = (type, app) => {
        setModalType(type);
        setSelectedApp(app);
        setFormData(app || {});
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedApp(null);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setApplications(applications.map(a => a.id === selectedApp.id ? { ...formData, id: a.id } : a));
        closeModal();
    };

    const getStatusStyle = (status) => {
        switch(status) {
        case 'approved': return 'bg-green-500 text-white';
        case 'pending': return 'bg-yellow-500 text-gray-900';
        case 'rejected': return 'bg-red-500 text-white';
        default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
        case 'approved': return 'Aprobada';
        case 'pending': return 'En Proceso';
        case 'rejected': return 'Rechazada';
        default: return 'Desconocido';
        }
    };

    return (
        <div className="pt-20">
            <HeroCard
                title="Mis Solicitudes"
                subtitle="Administra y da seguimiento a tus aplicaciones de beca"
            />

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon="fas fa-paper-plane" number="5" label="Solicitudes Enviadas" />
                <StatCard icon="fas fa-clock" number="2" label="En Proceso" />
                <StatCard icon="fas fa-check-circle" number="1" label="Aprobadas" />
                <StatCard icon="fas fa-times-circle" number="2" label="Rechazadas" />
            </section>

            <section className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-900 text-white px-6 py-4">
                <h3 className="text-xl font-bold">Solicitudes de Beca</h3>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left font-semibold">Beca</th>
                        <th className="px-6 py-4 text-left font-semibold">Institución</th>
                        <th className="px-6 py-4 text-left font-semibold">Fecha Aplicación</th>
                        <th className="px-6 py-4 text-left font-semibold">Estado</th>
                        <th className="px-6 py-4 text-left font-semibold">Monto</th>
                        <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map(app => (
                        <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">{app.scholarship}</td>
                        <td className="px-6 py-4">{app.institution}</td>
                        <td className="px-6 py-4">{new Date(app.date).toLocaleDateString('es-MX')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                            {getStatusText(app.status)}
                            </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">{app.amount}</td>
                        <td className="px-6 py-4">
                            <div className="flex gap-2">
                            <button onClick={() => openModal('view', app)} className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold hover:bg-yellow-600 transition-all">
                                Ver
                            </button>
                            {app.status === 'pending' && (
                                <button onClick={() => openModal('edit', app)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-all">
                                Editar
                                </button>
                            )}
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </section>

            <Modal isOpen={modalType === 'view'} onClose={closeModal} title="Detalles de la Solicitud">
                {selectedApp && (
                    <div className="space-y-4">
                        <div className="bg-blue-900 text-white p-4 rounded-lg">
                            <h2 className="text-2xl font-bold mb-1">{selectedApp.scholarship}</h2>
                            <p className="text-blue-100">{selectedApp.institution}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                <div className="text-xs text-gray-600 mb-1">Monto</div>
                                <div className="text-2xl font-bold text-green-600">{selectedApp.amount}</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <div className="text-xs text-gray-600 mb-1">Estado</div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(selectedApp.status)}`}>{getStatusText(selectedApp.status)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500 mb-1">Fecha</div>
                                <div className="font-semibold">{new Date(selectedApp.date).toLocaleDateString('es-MX', { dateStyle: 'long' })}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500 mb-1">Promedio</div>
                                <div className="font-semibold text-blue-900">{selectedApp.promedio}</div>
                            </div>
                        </div>

                        <DetailSection title="Descripción" color="purple">
                            {selectedApp.description}
                        </DetailSection>

                        <DetailSection title="Motivación" color="yellow">
                            {selectedApp.motivacion}
                        </DetailSection>

                        <div className="grid grid-cols-2 gap-4">
                            <DetailCard label="Documentos" value={selectedApp.documentos} />
                            <DetailCard label="Comentarios" value={selectedApp.comentarios} />
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={modalType === 'edit'} onClose={closeModal} title="Editar Solicitud">
                {selectedApp && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <DetailHeader title={selectedApp.scholarship} subtitle={selectedApp.institution} />

                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="text-sm text-gray-600">Solo puedes editar tu promedio y motivación mientras la solicitud está en proceso</div>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <FormField label="Promedio" name="promedio" type="number" step="0.1" value={formData.promedio || ''} onChange={handleChange} />
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <FormField label="Motivación" name="motivacion" type="textarea" value={formData.motivacion || ''} onChange={handleChange} />
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                                Cancelar
                            </button>
                            <button type="submit" className="flex-1 px-4 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-lg">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};