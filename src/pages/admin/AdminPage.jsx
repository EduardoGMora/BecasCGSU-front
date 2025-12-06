import { useState } from 'react';
import { StatCard } from '../../components/StatCard';
import { Modal } from '../../components/Modal';
import { FormField } from '../../components/FormField';
import { DetailCard, DetailSection, DetailHeader } from '../../components/DetailCard';
import scholarshipsData from '../../utils/scholarshipsAdmin.json';
import applicationsData from '../../utils/applicationsAdmin.json';
import usersData from '../../utils/usersAdmin.json';

// Componente AdminPage
export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scholarships, setScholarships] = useState(scholarshipsData);
  const [applications, setApplications] = useState(applicationsData);
  const [users, setUsers] = useState(usersData);
  const [modalType, setModalType] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});

  const openModal = (type, scholarship = null) => {
    setModalType(type);
    setSelectedScholarship(scholarship);
    setFormData(scholarship || { nombre: '', institucion: '', tipo: '', monto: '', estado: 'Activa', solicitudes: 0, descripcion: '', requisitos: '', duracion: '', fechaInicio: '', fechaFin: '' });
  };

  const openApplicationModal = (type, application = null) => {
    setModalType(type);
    setSelectedApplication(application);
    setFormData(application || { estado: '', puntaje: '', comentarios: '' });
  };

  const openUserModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setFormData(user || { nombre: '', cargo: '', email: '', telefono: '', rol: 'Revisor', estado: 'Activo', departamento: '', fechaIngreso: '', permisos: '' });
  };

  const closeModal = () => { 
    setModalType(null); 
    setSelectedScholarship(null); 
    setSelectedApplication(null); 
    setSelectedUser(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'create') {
      setScholarships([...scholarships, { ...formData, id: scholarships.length + 1 }]);
    } else if (modalType === 'edit') {
      setScholarships(scholarships.map(s => s.id === selectedScholarship.id ? { ...formData, id: s.id } : s));
    } else if (modalType === 'evaluate') {
      setApplications(applications.map(a => a.id === selectedApplication.id ? { ...selectedApplication, estado: formData.estado, puntaje: formData.puntaje, comentarios: formData.comentarios } : a));
    } else if (modalType === 'createUser') {
      setUsers([...users, { ...formData, id: users.length + 1 }]);
    } else if (modalType === 'editUser') {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...formData, id: u.id } : u));
    }
    closeModal();
  };

  const getStatusColor = (estado) => {
    const colors = { 'Aprobada': 'bg-green-500', 'En Proceso': 'bg-yellow-500', 'Rechazada': 'bg-red-500', 'Activo': 'bg-green-500', 'Inactivo': 'bg-gray-500' };
    return colors[estado] || 'bg-gray-500';
  };

  const getRoleColor = (rol) => {
    const colors = { 'Administrador': 'bg-red-500', 'Subadministrador': 'bg-blue-500', 'Revisor': 'bg-purple-500' };
    return colors[rol] || 'bg-gray-500';
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg px-8 py-16 md:px-16 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          <i className="fas fa-cog mr-3"></i>Panel de Administración
        </h1>
        <p className="text-lg opacity-90">Gestión integral del sistema de becas</p>
      </section>

      <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'overview'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-chart-line mr-2"></i>Resumen
        </button>
        <button
          onClick={() => setActiveSection('scholarships')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'scholarships'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-award mr-2"></i>Gestión de Becas
        </button>
        <button
          onClick={() => setActiveSection('applications')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'applications'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-file-alt mr-2"></i>Solicitudes
        </button>
        <button
          onClick={() => setActiveSection('users')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'users'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-users mr-2"></i>Usuarios
        </button>
      </nav>

      {activeSection === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fas fa-award" number="127" label="Total de Becas" />
            <StatCard icon="fas fa-file-alt" number="2,847" label="Solicitudes Recibidas" />
            <StatCard icon="fas fa-check-circle" number="1,235" label="Becas Otorgadas" />
            <StatCard icon="fas fa-dollar-sign" number="$15.2M" label="Presupuesto Ejercido" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Solicitudes por Estado</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>En Proceso</span>
                    <span>856 (30%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 transition-all" style={{width: '30%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Aprobadas</span>
                    <span>1,235 (43%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{width: '43%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Rechazadas</span>
                    <span>756 (27%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all" style={{width: '27%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 border-l-4 border-green-500">
                  <i className="fas fa-check-circle text-green-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Beca aprobada</div>
                    <div className="text-sm text-gray-600">Juan Pérez - Excelencia Académica</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-l-4 border-blue-500">
                  <i className="fas fa-file-alt text-blue-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Nueva solicitud</div>
                    <div className="text-sm text-gray-600">María González - Apoyo Socioeconómico</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-l-4 border-yellow-500">
                  <i className="fas fa-clock text-yellow-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Documentación pendiente</div>
                    <div className="text-sm text-gray-600">Carlos Ruiz - Innovación Tecnológica</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'scholarships' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Gestión de Becas</h3>
            <button onClick={() => openModal('create')} className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
              <i className="fas fa-plus mr-2"></i>Nueva Beca
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Nombre de la Beca</th>
                  <th className="px-6 py-4 text-left font-semibold">Institución</th>
                  <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                  <th className="px-6 py-4 text-left font-semibold">Monto</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Solicitudes</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map(s => (
                  <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{s.nombre}</td>
                    <td className="px-6 py-4">{s.institucion}</td>
                    <td className="px-6 py-4">{s.tipo}</td>
                    <td className="px-6 py-4">${s.monto.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">{s.estado}</span>
                    </td>
                    <td className="px-6 py-4">{s.solicitudes}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openModal('view', s)} className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                        <button onClick={() => openModal('edit', s)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Editar</button>
                        <button onClick={() => setScholarships(scholarships.filter(sc => sc.id !== s.id))} className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalType === 'view'} onClose={closeModal} title="Detalles de la Beca">
        {selectedScholarship && (
          <div className="space-y-4">
            <div className="bg-blue-900 text-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-1">{selectedScholarship.nombre}</h2>
              <p className="text-blue-100">{selectedScholarship.institucion}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-xs text-gray-600 mb-1">Monto</div>
                <div className="text-2xl font-bold text-green-600">${selectedScholarship.monto.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-xs text-gray-600 mb-1">Estado</div>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">{selectedScholarship.estado}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Tipo</div>
                <div className="font-semibold">{selectedScholarship.tipo}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Duración</div>
                <div className="font-semibold">{selectedScholarship.duracion}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Solicitudes</div>
                <div className="font-semibold text-blue-900">{selectedScholarship.solicitudes}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="text-sm font-semibold text-gray-700 mb-2">Descripción</div>
              <p className="text-gray-700">{selectedScholarship.descripcion}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <div className="text-sm font-semibold text-gray-700 mb-2">Requisitos</div>
              <p className="text-gray-700">{selectedScholarship.requisitos}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Fecha Inicio</div>
                <div className="font-semibold">{selectedScholarship.fechaInicio}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Fecha Fin</div>
                <div className="font-semibold">{selectedScholarship.fechaFin}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={modalType === 'create' || modalType === 'edit'} onClose={closeModal} title={modalType === 'create' ? 'Nueva Beca' : 'Editar Beca'}>
        <form onSubmit={handleSubmit}>
          <FormField label="Nombre de la Beca" name="nombre" value={formData.nombre || ''} onChange={handleChange} />
          <FormField label="Institución" name="institucion" value={formData.institucion || ''} onChange={handleChange} />
          <FormField label="Tipo" name="tipo" value={formData.tipo || ''} onChange={handleChange} />
          <FormField label="Monto" name="monto" type="number" value={formData.monto || ''} onChange={handleChange} />
          <FormField label="Descripción" name="descripcion" type="textarea" value={formData.descripcion || ''} onChange={handleChange} />
          <FormField label="Requisitos" name="requisitos" type="textarea" value={formData.requisitos || ''} onChange={handleChange} />
          <FormField label="Duración" name="duracion" value={formData.duracion || ''} onChange={handleChange} />
          <FormField label="Fecha Inicio" name="fechaInicio" type="date" value={formData.fechaInicio || ''} onChange={handleChange} />
          <FormField label="Fecha Fin" name="fechaFin" type="date" value={formData.fechaFin || ''} onChange={handleChange} />
          <div className="flex gap-3 mt-6">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800">
              {modalType === 'create' ? 'Crear' : 'Guardar'}
            </button>
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      {activeSection === 'applications' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Solicitudes de Beca</h3>
            <select className="px-4 py-2 rounded-lg text-gray-900">
              <option>Todas las solicitudes</option>
              <option>En proceso</option>
              <option>Aprobadas</option>
              <option>Rechazadas</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Solicitante</th>
                  <th className="px-6 py-4 text-left font-semibold">Beca</th>
                  <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Puntaje</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{app.solicitante}</div>
                      <div className="text-sm text-gray-600">{app.email}</div>
                    </td>
                    <td className="px-6 py-4">{app.beca}</td>
                    <td className="px-6 py-4">{new Date(app.fecha).toLocaleDateString('es-MX')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 ${getStatusColor(app.estado)} text-white rounded-full text-xs font-semibold`}>{app.estado}</span>
                    </td>
                    <td className="px-6 py-4">{app.puntaje}/100</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openApplicationModal('viewApp', app)} className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                        <button onClick={() => openApplicationModal('evaluate', app)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Evaluar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalType === 'viewApp'} onClose={closeModal} title="Detalles de la Solicitud">
        {selectedApplication && (
          <div className="space-y-4">
            <div className="bg-blue-900 text-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-1">{selectedApplication.solicitante}</h2>
              <p className="text-blue-100">{selectedApplication.beca}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold text-sm">{selectedApplication.email}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Teléfono</div>
                <div className="font-semibold">{selectedApplication.telefono}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Carrera</div>
                <div className="font-semibold text-sm">{selectedApplication.carrera}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Semestre</div>
                <div className="font-semibold">{selectedApplication.semestre}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Promedio</div>
                <div className="font-semibold text-blue-900">{selectedApplication.promedio}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Estado</div>
                <span className={`px-3 py-1 ${getStatusColor(selectedApplication.estado)} text-white rounded-full text-xs font-semibold`}>{selectedApplication.estado}</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Puntaje</div>
                <div className="font-semibold text-green-600">{selectedApplication.puntaje}/100</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Fecha</div>
                <div className="font-semibold text-sm">{new Date(selectedApplication.fecha).toLocaleDateString('es-MX')}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="text-sm font-semibold text-gray-700 mb-2">Motivación</div>
              <p className="text-gray-700">{selectedApplication.motivacion}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Documentos</div>
                <div className="font-semibold">{selectedApplication.documentos}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Comentarios</div>
                <div className="font-semibold text-sm">{selectedApplication.comentarios}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={modalType === 'evaluate'} onClose={closeModal} title="Evaluar Solicitud">
        {selectedApplication && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-blue-900 text-white p-4 rounded-lg">
              <div className="font-bold text-lg">{selectedApplication.solicitante}</div>
              <div className="text-sm text-blue-100">{selectedApplication.beca}</div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">Estado</label>
              <select name="estado" value={formData.estado || selectedApplication.estado} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                <option value="En Proceso">En Proceso</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <FormField label="Puntaje (0-100)" name="puntaje" type="number" value={formData.puntaje || selectedApplication.puntaje} onChange={handleChange} />
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <FormField label="Comentarios de Evaluación" name="comentarios" type="textarea" value={formData.comentarios || selectedApplication.comentarios} onChange={handleChange} />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
                Cancelar
              </button>
              <button type="submit" className="flex-1 px-4 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-lg">
                Guardar Evaluación
              </button>
            </div>
          </form>
        )}
      </Modal>

      {activeSection === 'users' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
            <button onClick={() => openUserModal('createUser')} className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
              <i className="fas fa-plus mr-2"></i>Nuevo Usuario
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Usuario</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Rol</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{user.nombre}</div>
                      <div className="text-sm text-gray-600">{user.cargo}</div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 ${getRoleColor(user.rol)} text-white rounded-full text-xs font-semibold`}>{user.rol}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 ${getStatusColor(user.estado)} text-white rounded-full text-xs font-semibold`}>{user.estado}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openUserModal('viewUser', user)} className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                        <button onClick={() => openUserModal('editUser', user)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Editar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalType === 'viewUser'} onClose={closeModal} title="Detalles del Usuario">
        {selectedUser && (
          <div className="space-y-4">
            <div className="bg-blue-900 text-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-1">{selectedUser.nombre}</h2>
              <p className="text-blue-100">{selectedUser.cargo}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Email</div>
                <div className="font-semibold text-sm">{selectedUser.email}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Teléfono</div>
                <div className="font-semibold">{selectedUser.telefono}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-xs text-gray-600 mb-1">Rol</div>
                <span className={`px-3 py-1 ${getRoleColor(selectedUser.rol)} text-white rounded-full text-xs font-semibold`}>{selectedUser.rol}</span>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="text-xs text-gray-600 mb-1">Estado</div>
                <span className={`px-3 py-1 ${getStatusColor(selectedUser.estado)} text-white rounded-full text-xs font-semibold`}>{selectedUser.estado}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Departamento</div>
                <div className="font-semibold">{selectedUser.departamento}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Fecha de Ingreso</div>
                <div className="font-semibold">{new Date(selectedUser.fechaIngreso).toLocaleDateString('es-MX')}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="text-sm font-semibold text-gray-700 mb-2">Permisos</div>
              <p className="text-gray-700">{selectedUser.permisos}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={modalType === 'createUser' || modalType === 'editUser'} onClose={closeModal} title={modalType === 'createUser' ? 'Nuevo Usuario' : 'Editar Usuario'}>
        <form onSubmit={handleSubmit}>
          <FormField label="Nombre Completo" name="nombre" value={formData.nombre || ''} onChange={handleChange} />
          <FormField label="Cargo" name="cargo" value={formData.cargo || ''} onChange={handleChange} />
          <FormField label="Email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
          <FormField label="Teléfono" name="telefono" value={formData.telefono || ''} onChange={handleChange} />
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Rol</label>
            <select name="rol" value={formData.rol || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
              <option value="Revisor">Revisor</option>
              <option value="Subadministrador">Subadministrador</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Estado</label>
            <select name="estado" value={formData.estado || ''} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <FormField label="Departamento" name="departamento" value={formData.departamento || ''} onChange={handleChange} />
          <FormField label="Fecha de Ingreso" name="fechaIngreso" type="date" value={formData.fechaIngreso || ''} onChange={handleChange} />
          <FormField label="Permisos" name="permisos" type="textarea" value={formData.permisos || ''} onChange={handleChange} />
          <div className="flex gap-3 mt-6">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800">
              {modalType === 'createUser' ? 'Crear' : 'Guardar'}
            </button>
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
