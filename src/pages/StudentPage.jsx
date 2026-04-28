import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { StatCard } from '../components/StatCard';
import { Modal } from '../components/Modal';
import { DetailCard, DetailSection, DetailHeader } from '../components/DetailCard'; 
import { FormField } from '../components/FormField';
import api from '../api/axios';

export function StudentPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await api.get('/applications', { signal: controller.signal });
        const data = response.data;
        const items = Array.isArray(data) ? data
          : Array.isArray(data?.data) ? data.data
          : Array.isArray(data?.items) ? data.items
          : [];
        setApplications(items);
        setError(null);
      } catch (err) {
        if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
        console.error('Error fetching applications:', err);
        setError('No se pudieron cargar las solicitudes. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
    return () => controller.abort();
  }, []);


  const openModal = (type, app) => {
    setModalType(type);
    setSelectedApp(app);
    if (type === 'edit') {
        setFormData({
            promedio: app.promedio,
            motivacion: app.motivacion
        });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedApp(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/applications/${selectedApp.id}`, formData);
      setApplications(prevApps => prevApps.map(app =>
        app.id === selectedApp.id ? { ...app, ...formData } : app
      ));
    } catch (err) {
      console.error('Error updating application:', err);
    }
    closeModal();
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-500 text-white';
      case 'review': return 'bg-yellow-500 text-gray-900';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Aprobada';
      case 'review': return 'En Revisión';
      case 'rejected': return 'Rechazada';
      default: return 'Pendiente';
    }
  };

  return (
    <div className="pt-20 pb-10">
        <HeroCard
            title="Mis Solicitudes"
            subtitle="Administra y da seguimiento a tus aplicaciones de beca"
        />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-4 md:px-0 max-w-7xl mx-auto">
            <StatCard icon="fas fa-paper-plane" number={applications.length} label="Enviadas" />
            <StatCard icon="fas fa-clock" number={applications.filter(a => a.status === 'review' || a.status === 'pending').length} label="En Proceso" />
            <StatCard icon="fas fa-check-circle" number={applications.filter(a => a.status === 'approved').length} label="Aprobadas" />
            <StatCard icon="fas fa-times-circle" number={applications.filter(a => a.status === 'rejected').length} label="Rechazadas" />
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-0 mb-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Historial de Solicitudes</h3>
                    <Link to="/becas" className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded transition flex items-center gap-2">
                        <i className="fas fa-plus"></i> <span className="hidden sm:inline">Nueva Solicitud</span>
                    </Link>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto mb-4"></div>
                            <p className="text-gray-600">Cargando solicitudes...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="px-6 py-10 text-center text-red-600">
                        <i className="fas fa-exclamation-triangle text-3xl mb-3 block"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && (
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
                            {applications.length > 0 ? (
                                applications.map(app => (
                                    <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-blue-900">
                                            {app.scholarship}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {app.institution}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {new Date(app.date).toLocaleDateString('es-MX')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                                                {getStatusText(app.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-700">
                                            {app.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => openModal('view', app)} 
                                                    className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold hover:bg-yellow-600 transition-all shadow-sm"
                                                >
                                                    Ver
                                                </button>
                                                {(app.status === 'review' || app.status === 'pending') && (
                                                    <button 
                                                        onClick={() => openModal('edit', app)} 
                                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No tienes solicitudes activas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </section>

        <Modal isOpen={modalType === 'view'} onClose={closeModal} title="Detalle de Solicitud">
            {selectedApp && (
                <div className="space-y-4">
                    <DetailHeader title={selectedApp.scholarship} subtitle={selectedApp.institution} />
                    
                    <div className="grid grid-cols-2 gap-4">
                         <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="text-xs text-gray-600 mb-1">Estado</div>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusStyle(selectedApp.status)}`}>
                                {getStatusText(selectedApp.status)}
                            </span>
                        </div>
                        <DetailCard label="Monto" value={selectedApp.amount} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <DetailCard label="Fecha" value={new Date(selectedApp.date).toLocaleDateString()} />
                        <DetailCard label="Promedio" value={selectedApp.promedio || 'N/A'} />
                    </div>

                    <DetailSection title="Motivación" color="blue">{selectedApp.motivacion || 'Sin motivación registrada'}</DetailSection>
                    
                    {selectedApp.comentarios && (
                         <DetailSection title="Comentarios" color="yellow">{selectedApp.comentarios}</DetailSection>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold">Cerrar</button>
                    </div>
                </div>
            )}
        </Modal>

        <Modal isOpen={modalType === 'edit'} onClose={closeModal} title="Editar Solicitud">
            {selectedApp && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DetailHeader title={selectedApp.scholarship} subtitle={selectedApp.institution} />
                    
                    <div className="bg-white border p-4 rounded-lg">
                        <FormField label="Promedio" name="promedio" type="number" step="0.1" value={formData.promedio} onChange={handleInputChange} />
                    </div>

                    <div className="bg-white border p-4 rounded-lg">
                         <FormField label="Motivación" name="motivacion" type="textarea" value={formData.motivacion} onChange={handleInputChange} />
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-gray-200 rounded-lg font-semibold">Cancelar</button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-blue-900 text-white rounded-lg font-semibold shadow-lg">Guardar</button>
                    </div>
                </form>
            )}
        </Modal>

    </div>
  );
}