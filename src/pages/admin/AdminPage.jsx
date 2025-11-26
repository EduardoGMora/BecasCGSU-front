import { useState } from 'react';
import { StatCard } from '../components/StatCard';
import { CreateScholarship } from '../components/CreateScholarship';
import { EditScholarship } from '../components/EditScholarship';
import { ScholarshipDetails } from '../components/ScholarshipDetails';
import { ViewApplication } from '../components/ViewApplication';
import { EvaluateApplication } from '../components/EvaluateApplication';
import { CreateUser } from '../components/CreateUser';
import { EditUser } from '../components/EditUser';
import { ViewUser } from '../components/ViewUser';

// Componente AdminPanel
export function AdminPanel() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [editScholarship, setEditScholarship] = useState(null);

  const handleCreateScholarship = (scholarship) => {
    // TODO: Implementar la lógica para crear una beca
    console.log('Crear beca:', scholarship);
  };

  const handleUpdateScholarship = (scholarship) => {
    // TODO: Implementar la lógica para actualizar una beca
    console.log('Actualizar beca:', scholarship);
  };

  // Estados para la gestión de solicitudes
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [evaluatingApplication, setEvaluatingApplication] = useState(null);

  const handleEvaluateApplication = (evaluation) => {
    // TODO: Implementar la lógica para guardar la evaluación
    console.log('Guardar evaluación:', evaluation);
  };

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
export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');

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
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">Beca de Excelencia Académica 2025</td>
                  <td className="px-6 py-4">Universidad de Guadalajara</td>
                  <td className="px-6 py-4">Excelencia</td>
                  <td className="px-6 py-4">$50,000</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Activa</span>
                  </td>
                  <td className="px-6 py-4">234</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedScholarship({
                          name: 'Beca de Excelencia Académica 2025',
                          institution: 'Universidad de Guadalajara',
                          type: 'Excelencia',
                          amount: '$50,000',
                          status: 'active',
                          requirements: [
                            'Promedio mínimo de 9.0',
                            'Ser alumno regular',
                            'No tener materias reprobadas'
                          ],
                          requiredDocuments: [
                            'Kardex actualizado',
                            'Identificación oficial',
                            'Comprobante de domicilio'
                          ],
                          startDate: '2025-01-01',
                          endDate: '2025-12-31',
                          resultsDate: '2026-01-15'
                        })}
                        className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                      >
                        Ver
                      </button>
                      <button 
                        onClick={() => setEditScholarship({
                          name: 'Beca de Excelencia Académica 2025',
                          institution: 'Universidad de Guadalajara',
                          type: 'academic',
                          amount: '50000',
                          status: 'active',
                          requirements: [
                            'Promedio mínimo de 9.0',
                            'Ser alumno regular',
                            'No tener materias reprobadas'
                          ],
                          requiredDocuments: [
                            'Kardex actualizado',
                            'Identificación oficial',
                            'Comprobante de domicilio'
                          ],
                          startDate: '2025-01-01',
                          endDate: '2025-12-31',
                          resultsDate: '2026-01-15'
                        })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de que deseas eliminar esta beca?')) {
                            // TODO: Implementar la lógica para eliminar la beca
                            console.log('Eliminar beca');
                          }
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
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
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">Juan Pérez García</div>
                    <div className="text-sm text-gray-600">juan.perez@alumnos.udg.mx</div>
                  </td>
                  <td className="px-6 py-4">Excelencia Académica</td>
                  <td className="px-6 py-4">15 Nov 2025</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Aprobada</span>
                  </td>
                  <td className="px-6 py-4">95/100</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedApplication({
                          name: 'Juan Pérez García',
                          email: 'juan.perez@alumnos.udg.mx',
                          studentId: '215784362',
                          major: 'Ingeniería en Computación',
                          scholarship: 'Beca de Excelencia Académica',
                          type: 'Excelencia',
                          amount: '$50,000',
                          date: '15 Nov 2025',
                          status: 'approved',
                          score: '95',
                          documents: [
                            { name: 'Kardex actualizado' },
                            { name: 'Identificación oficial' },
                            { name: 'Comprobante de domicilio' }
                          ],
                          evaluations: [
                            {
                              evaluator: 'Dr. Roberto Mendoza',
                              date: '14 Nov 2025',
                              score: 95,
                              comments: 'Excelente expediente académico. Cumple con todos los requisitos.'
                            }
                          ]
                        })}
                        className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                      >
                        Ver
                      </button>
                      <button 
                        onClick={() => setEvaluatingApplication({
                          id: '1',
                          name: 'Juan Pérez García',
                          scholarship: 'Beca de Excelencia Académica'
                        })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                      >
                        Evaluar
                      </button>
                    </div>
                  </td>
                </tr>
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
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">Dr. Roberto Mendoza</div>
                    <div className="text-sm text-gray-600">Coordinador de Becas</div>
                  </td>
                  <td className="px-6 py-4">r.mendoza@udg.mx</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">Administrador</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Activo</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedUser({
                          name: 'Dr. Roberto Mendoza',
                          position: 'Coordinador de Becas',
                          email: 'r.mendoza@udg.mx',
                          phone: '33-1234-5678',
                          username: 'rmendoza',
                          role: 'admin',
                          status: 'active',
                          createdAt: '01 Oct 2025',
                          permissions: [
                            { name: 'Gestionar becas', granted: true },
                            { name: 'Evaluar solicitudes', granted: true },
                            { name: 'Gestionar usuarios', granted: true },
                            { name: 'Ver reportes', granted: true }
                          ],
                          recentActivity: [
                            {
                              icon: 'fa-solid fa-check-circle',
                              color: 'green-500',
                              action: 'Aprobó una solicitud',
                              date: '4 Nov 2025'
                            },
                            {
                              icon: 'fa-solid fa-edit',
                              color: 'blue-500',
                              action: 'Modificó una beca',
                              date: '3 Nov 2025'
                            }
                          ]
                        })}
                        className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold"
                      >
                        Ver
                      </button>
                      <button 
                        onClick={() => setEditUser({
                          name: 'Dr. Roberto Mendoza',
                          position: 'Coordinador de Becas',
                          email: 'r.mendoza@udg.mx',
                          phone: '33-1234-5678',
                          username: 'rmendoza',
                          role: 'admin',
                          status: 'active',
                          permissions: [
                            { name: 'Gestionar becas', granted: true },
                            { name: 'Evaluar solicitudes', granted: true },
                            { name: 'Gestionar usuarios', granted: true },
                            { name: 'Ver reportes', granted: true }
                          ]
                        })}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold"
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
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
