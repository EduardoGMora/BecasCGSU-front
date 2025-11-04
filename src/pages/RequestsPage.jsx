import { StatCard } from '../components/StatCard';

// Componente ApplicationsPage
export function ApplicationsPage() {
    const applications = [
        { id: 1, scholarship: 'Beca de Excelencia Académica', institution: 'Universidad de Guadalajara', date: '15 Nov 2025', status: 'approved', amount: '$50,000' },
        { id: 2, scholarship: 'Programa de Apoyo Socioeconómico', institution: 'Fundación Telmex', date: '20 Nov 2025', status: 'pending', amount: '$25,000' },
        { id: 3, scholarship: 'Beca de Innovación Tecnológica', institution: 'Google México', date: '25 Nov 2025', status: 'pending', amount: '$75,000' },
        { id: 4, scholarship: 'Beca Deportiva', institution: 'Universidad de Guadalajara', date: '10 Oct 2025', status: 'rejected', amount: '$40,000' },
        { id: 5, scholarship: 'Beca de Intercambio', institution: 'Fundación BBVA', date: '05 Oct 2025', status: 'rejected', amount: '$200,000' }
    ];

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
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg px-8 py-16 md:px-16 mb-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Mis Solicitudes</h1>
            <p className="text-xl opacity-90">Administra y da seguimiento a tus aplicaciones de beca</p>
        </section>

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
                    <td className="px-6 py-4">{app.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                        {getStatusText(app.status)}
                        </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{app.amount}</td>
                    <td className="px-6 py-4">
                        <div className="flex gap-2">
                        <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold hover:bg-yellow-600 transition-all">
                            Ver
                        </button>
                        {app.status === 'pending' && (
                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-all">
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
        </div>
    );
};