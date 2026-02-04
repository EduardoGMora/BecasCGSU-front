import { useState, useEffect } from 'react';
import { StatCard } from '../../components/StatCard';
import { Modal } from '../../components/Modal';
import { data, useOutletContext } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { ProgressBar } from '../../components/ProgressBar';
import { ActivityCard } from '../../components/ActivityCard';
import scholarshipsData from '../../mocks/scholarshipsAdmin.json';
import usersData from '../../mocks/usersAdmin.json';
import NewUserForm from "../admin/NewUserForm"
import applications from "./../../utils/applicationsAdmin.json"
import SeeDataUser from "../admin/SeeDataUser"
// Componente AdminPage
export default function AdminPage() {
  const {selectedOption} = useOutletContext()
  const [scholarships, setScholarships] = useState(scholarshipsData);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    codigo: '',
    password: '',
    rol: 'admin',
      permisos: {
      dashboard: true,
      usuarios: true,
      becarios: true,
      solicitudes: true,
      reportes: true
    }
  });
const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const result = await response.json();

      if (result.status === "success") {
        setUsuarios(result.data); 
        console.log(result.data)
      }
    } catch (error) {
      console.error("Error al cargar becas:", error);
    }
  };

  useEffect(() => {
  /*
  const fetchScholarships = async () => {
    try {
      const response = await fetch("http://localhost:8000/scholarships");
      const result = await response.json();

      if (result.status === "success") {
        setScholarships(result.data); // 👈 SOLO el arreglo
      }
    } catch (error) {
      console.error("Error al cargar becas:", error);
    }
  };
  */
  fetchUsers()
  //fetchScholarships();
}, []);
const handleCreateUser = async () => {
  try {
    const resUser = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: newUser.nombre,
        email: newUser.email,
        codigo: newUser.codigo,
        password: newUser.password, 
        role: newUser.rol            
      })
    });

    const userResult = await resUser.json();
    console.log(userResult);
    
    const userId = userResult.data?.id || userResult.id;
    
    // Mapeo de nombres a IDs de permisos
    const permissionMap = {
      dashboard: 1,
      usuarios: 2,
      becarios: 3,
      solicitudes: 4,
      reportes: 5
    };
    
    for (const [permissionName, allowed] of Object.entries(newUser.permisos)) {
      if (allowed) {
        const permissionId = permissionMap[permissionName];
        
        console.log(`Asignando permiso: ${permissionName} (ID: ${permissionId})`);
        
        await fetch("http://localhost:8000/user-permissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: String(userId),
            permission_id: String(permissionId)
          })
        });
      }
    }
    setShowUserModal(false);
  } catch (error) {
    console.error("Error creando usuario", error);
  }
};

  const openModal = (type, scholarship = null) => {
    setModalType(type);
    setSelectedScholarship(scholarship);
    setFormData(scholarship || { nombre: '', institucion: '', tipo: '', monto: '', estado: 'Activa', solicitudes: 0, descripcion: '', requisitos: '', duracion: '', fechaInicio: '', fechaFin: '' });
  };

  const handleViewUser = (user) => {
    const userSelect = usuarios.find(
      p => p.id === user
    );
    setSelectedUser(userSelect);
    setShowViewModal(true);
  };

  const closeModal = () => { 
    setModalType(null); 
    setSelectedScholarship(null); 
    setSelectedUser(null);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'create') {
      setScholarships([...scholarships, { ...formData, id: scholarships.length + 1 }]);
    } else if (modalType === 'edit') {
      setScholarships(scholarships.map(s => s.id === selectedScholarship.id ? { ...formData, id: s.id } : s));
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
        <h1 className="text-4xl font-bold mb-2 text-white">
          <i className="fas fa-cog mr-3"></i>Panel de Administración
        </h1>
        <p className="text-lg opacity-90">Gestión integral del sistema de becas</p>
      </section>
      {selectedOption === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fas fa-award" number="127" label="Total de Becas" />
            <StatCard icon="fas fa-file-alt" number="2,847" label="Solicitudes Recibidas" />
            <StatCard icon="fas fa-check-circle" number="1,235" label="Becas Otorgadas" />
            <StatCard icon="fas fa-dollar-sign" number="$15.2M" label="Presupuesto Ejercido" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-primary-purple mb-4">Solicitudes por Estado</h3>
              <div className="space-y-4">
                <ProgressBar 
                  label="En Proceso" 
                  value={856} 
                  total={2847} 
                  color="blue" 
                />
                <ProgressBar 
                  label="Aprobadas" 
                  value={1235} 
                  total={2847} 
                  color="green" 
                />
                <ProgressBar 
                  label="Rechazadas" 
                  value={756} 
                  total={2847} 
                  color="red" 
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-primary-purple mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <ActivityCard
                  icon="fa-check-circle"
                  iconColor="green-500"
                  borderColor="green-500"
                  title="Beca aprobada"
                  description="Juan Pérez - Excelencia Académica"
                  variant="success"
                />
                <ActivityCard
                  icon="fa-file-alt"
                  iconColor='blue-500'
                  borderColor="blue-500"
                  title="Nueva solicitud"
                  description="María González - Apoyo Socioeconómico"
                  variant="info"
                />
                <ActivityCard
                  icon="fa-clock"
                  iconColor='yellow-500'
                  borderColor="yellow-500"
                  title="Documentación pendiente"
                  description="Carlos Ruiz - Innovación Tecnológica"
                  variant="warning"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {console.log(selectedOption)}
      {selectedOption === 'scholarships' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-primary-purple text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Gestión de Becas</h3>
            <button onClick={() => openModal('create')} className="px-4 py-2 bg-primary-mint rounded-lg font-semibold hover:bg-primary-cyan transition-all">
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
                      <span className="px-3 py-1 bg-primary-mint text-white rounded-full text-xs font-semibold">{s.estado}</span>
                    </td>
                    <td className="px-6 py-4">{s.solicitudes}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openModal('view', s)} className="px-3 py-1 bg-primary-cyan text-white rounded text-sm font-semibold">Ver</button>
                        <button onClick={() => openModal('edit', s)} className="px-3 py-1 bg-primary-purple text-white rounded text-sm font-semibold">Editar</button>
                        <button onClick={() => setScholarships(scholarships.filter(sc => sc.id !== s.id))} className="px-3 py-1 bg-primary-pink text-white rounded text-sm font-semibold">Eliminar</button>
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
            <div className="bg-primary-purple text-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-1">{selectedScholarship.nombre}</h2>
              <p className="text-purple-100">{selectedScholarship.institucion}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-primary-mint">
                <div className="text-xs text-gray-700 mb-1">Monto</div>
                <div className="text-2xl font-bold text-primary-mint">${selectedScholarship.monto.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary-cyan">
                <div className="text-xs text-gray-700 mb-1">Estado</div>
                <span className="px-3 py-1 bg-primary-mint text-white rounded-full text-xs font-semibold">{selectedScholarship.estado}</span>
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
                <div className="font-semibold text-primary-purple">{selectedScholarship.solicitudes}</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-primary-purple">
              <div className="text-sm font-semibold text-gray-700 mb-2">Descripción</div>
              <p className="text-gray-700">{selectedScholarship.descripcion}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-primary-cyan">
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
            <button type="submit" className="flex-1 px-4 py-2 bg-primary-purple text-white rounded-lg font-semibold hover:bg-primary-pink">
              {modalType === 'create' ? 'Crear' : 'Guardar'}
            </button>
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      {selectedOption === 'applications' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-primary-purple text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Solicitudes de Beca</h3>
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
                      <span className={`px-3 py-1 ${getStatusColor(app.estado)} whitespace-nowrap text-white rounded-full text-xs font-semibold`}>{app.estado}</span>
                    </td>
                    <td className="px-6 py-4">{app.puntaje}/100</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openApplicationModal('viewApp', app)} className="px-3 py-1 bg-primary-cyan text-white rounded text-sm font-semibold">Ver</button>
                        <button onClick={() => openApplicationModal('evaluate', app)} className="px-3 py-1 bg-primary-purple text-white rounded text-sm font-semibold">Evaluar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedOption === 'users' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-primary-purple text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Gestión de Usuarios</h3>
            <button 
              onClick={() => setShowUserModal(true)}
              className="px-4 py-2 bg-primary-mint rounded-lg font-semibold hover:bg-primary-cyan transition-all">
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
                {usuarios.map((u, index) =>(
                  <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{u.nombre}</div>
                      <div className="text-sm text-gray-600">Coordinador de Becas</div>
                    </td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      {u.role == "admin"&&<span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">Administrador</span>}
                      {u.role == "subadmin"&&<span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">Sub-Admin</span>}
                      {u.role == "student"&&<span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-semibold">Estudiante</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary-mint text-white rounded-full text-xs font-semibold">Activo</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button  onClick={() => handleViewUser(u.id)} className="px-3 py-1  bg-primary-cyan text-white rounded text-sm font-semibold">Ver</button>
                        <button className="px-3 py-1 bg-primary-purple text-white rounded text-sm font-semibold">Editar</button>
                        <button className="px-3 py-1 bg-primary-pink text-white rounded text-sm font-semibold">Eliminar</button>
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
            <div className="bg-primary-purple text-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-1">{selectedUser.nombre}</h2>
              <p className="text-purple-100">{selectedUser.cargo}</p>
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
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary-cyan">
                <div className="text-xs text-gray-700 mb-1">Rol</div>
                <span className={`px-3 py-1 ${getRoleColor(selectedUser.rol)} text-white rounded-full text-xs font-semibold`}>{selectedUser.rol}</span>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-primary-mint">
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

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-primary-purple">
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
            <button type="submit" className="flex-1 px-4 py-2 bg-primary-purple text-white rounded-lg font-semibold hover:bg-primary-pink">
              {modalType === 'createUser' ? 'Crear' : 'Guardar'}
            </button>
            <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      </Modal>
      {showUserModal && (
        <NewUserForm newUser={newUser} setNewUser={setNewUser} handleCreateUser = {handleCreateUser} setShowUserModal={setShowUserModal}></NewUserForm>
      )}
      {showViewModal && (
        <SeeDataUser selectedUser={selectedUser} setShowViewModal={setShowViewModal}></SeeDataUser>
      )}
    </>
  );
};
