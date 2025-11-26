import { useState, useEffect } from 'react';
import { 
  getScholarships, 
  createScholarship, 
  updateScholarship,
  getApplications,
  updateApplication,
  evaluateApplication,
  getUsers,
  createUser,
  updateUser,
  getEvaluationCriteria
} from '../../services/dataService';

// Componente AdminPanel
export function AdminPage() {
  // Estados para datos
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [evaluationCriteria, setEvaluationCriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para modales de becas
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [editScholarship, setEditScholarship] = useState(null);

  // Estados para la gestión de solicitudes
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [evaluatingApplication, setEvaluatingApplication] = useState(null);

  // Estados para la gestión de usuarios
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleCreateUser = (user) => {
    // TODO: Implementar la lógica para crear un usuario
    console.log('Crear usuario:', user);
  };

  const handleUpdateUser = (user) => {
    // TODO: Implementar la lógica para actualizar un usuario
    console.log('Actualizar usuario:', user);
  };


// Componente AdminPage
function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [scholarshipsData, applicationsData, usersData, criteriaData] = await Promise.all([
        getScholarships(),
        getApplications(),
        getUsers(),
        getEvaluationCriteria()
      ]);
      setScholarships(scholarshipsData);
      setApplications(applicationsData);
      setUsers(usersData);
      setEvaluationCriteria(criteriaData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateScholarship = async (scholarship) => {
    try {
      const newScholarship = await createScholarship(scholarship);
      setScholarships([...scholarships, newScholarship]);
    } catch (error) {
      console.error('Error al crear beca:', error);
    }
  };

  const handleUpdateScholarship = async (scholarship) => {
    try {
      const updated = await updateScholarship(scholarship.id, scholarship);
      setScholarships(scholarships.map(s => s.id === updated.id ? updated : s));
    } catch (error) {
      console.error('Error al actualizar beca:', error);
    }
  };

  const handleEvaluateApplication = async (evaluation) => {
    try {
      const updated = await evaluateApplication(evaluatingApplication.id, evaluation);
      setApplications(applications.map(a => a.id === updated.id ? updated : a));
    } catch (error) {
      console.error('Error al evaluar solicitud:', error);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      const newUser = await createUser(user);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const updated = await updateUser(user.id, user);
      setUsers(users.map(u => u.id === updated.id ? updated : u));
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div className="pt-20">
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
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
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
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      <i className="fas fa-spinner fa-spin mr-2"></i>Cargando becas...
                    </td>
                  </tr>
                ) : scholarships.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No hay becas registradas
                    </td>
                  </tr>
                ) : (
                  scholarships.map((scholarship) => (
                    <tr key={scholarship.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">{scholarship.name}</td>
                      <td className="px-6 py-4">{scholarship.institution}</td>
                      <td className="px-6 py-4">{scholarship.type}</td>
                      <td className="px-6 py-4">{scholarship.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scholarship.status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {scholarship.status === 'active' ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {applications.filter(app => app.scholarship === scholarship.name).length}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedScholarship(scholarship)}
                            className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                          >
                            Ver
                          </button>
                          <button 
                            onClick={() => setEditScholarship(scholarship)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('¿Estás seguro de que deseas eliminar esta beca?')) {
                                // TODO: Implementar deleteScholarship
                                console.log('Eliminar beca:', scholarship.id);
                              }
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modales */}
          {showCreateModal && (
            <CreateScholarship
              onClose={() => setShowCreateModal(false)}
              onSave={handleCreateScholarship}
            />
          )}

          {selectedScholarship && (
            <ScholarshipDetails
              scholarship={selectedScholarship}
              onClose={() => setSelectedScholarship(null)}
            />
          )}

          {editScholarship && (
            <EditScholarship
              scholarship={editScholarship}
              onClose={() => setEditScholarship(null)}
              onSave={handleUpdateScholarship}
            />
          )}
        </div>
      )}

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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      <i className="fas fa-spinner fa-spin mr-2"></i>Cargando solicitudes...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No hay solicitudes registradas
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => {
                    const totalScore = (
                      (application.academicScore || 0) + 
                      (application.economicScore || 0) + 
                      (application.motivationScore || 0)
                    ) / 3;
                    
                    return (
                      <tr key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold">{application.studentName}</div>
                          <div className="text-sm text-gray-600">{application.id}</div>
                        </td>
                        <td className="px-6 py-4">{application.scholarship}</td>
                        <td className="px-6 py-4">{application.applicationDate}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            application.status === 'approved' ? 'bg-green-500 text-white' :
                            application.status === 'pending' ? 'bg-yellow-500 text-gray-900' :
                            'bg-red-500 text-white'
                          }`}>
                            {application.status === 'approved' ? 'Aprobada' :
                             application.status === 'pending' ? 'Pendiente' :
                             'Rechazada'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {totalScore > 0 ? `${totalScore.toFixed(1)}/10` : 'Sin evaluar'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSelectedApplication(application)}
                              className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                            >
                              Ver
                            </button>
                            <button 
                              onClick={() => setEvaluatingApplication(application)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                            >
                              Evaluar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Modales de Solicitudes */}
          {selectedApplication && (
            <ViewApplication
              application={selectedApplication}
              onClose={() => setSelectedApplication(null)}
            />
          )}

          {evaluatingApplication && (
            <EvaluateApplication
              application={evaluatingApplication}
              onClose={() => setEvaluatingApplication(null)}
              onSave={handleEvaluateApplication}
            />
          )}
        </div>
      )}

      {activeSection === 'users' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
            <button 
              onClick={() => setShowCreateUserModal(true)}
              className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      <i className="fas fa-spinner fa-spin mr-2"></i>Cargando usuarios...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-red-500 text-white' :
                          user.role === 'evaluator' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {user.role === 'admin' ? 'Administrador' :
                           user.role === 'evaluator' ? 'Evaluador' :
                           'Estudiante'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                        }`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                          >
                            Ver
                          </button>
                          <button 
                            onClick={() => setEditUser(user)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                          >
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modales de Usuarios */}
          {showCreateUserModal && (
            <CreateUser
              onClose={() => setShowCreateUserModal(false)}
              onSave={handleCreateUser}
            />
          )}

          {selectedUser && (
            <ViewUser
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}

          {editUser && (
            <EditUser
              user={editUser}
              onClose={() => setEditUser(null)}
              onSave={handleUpdateUser}
            />
          )}
        </div>
      )}
    </div>
  );
};
}
