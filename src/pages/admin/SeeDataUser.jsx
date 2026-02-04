import React, { useState, useEffect } from 'react'
export default function SeeDataUser({selectedUser, setShowViewModal}) {
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const fetchPermisions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user-permissions/user/${selectedUser.id}`
        );
        const result = await response.json();

        if (result.status === "success") {
          const permissionNames = result.data
            .filter(p => p.allowed)
            .map(p => p.permissions.nombre);

          // 👇 AQUÍ se guarda en el useState
          setPermissions(permissionNames);

          console.log("Permisos guardados:", permissionNames);
        }
      } catch (error) {
        console.error("Error al cargar permisos:", error);
      }
    };
    fetchPermisions();
  }, [selectedUser.id]);
  
  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-purple text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-xl font-bold text-white">
                Informacion del Usuario
              </h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-2xl hover:text-gray-300 transition-colors">
                <i className="fas fa-times text-white"></i>
              </button>
            </div>
            
            <div className="p-6">
              {/* Información Personal */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center border-b pb-2">
                  <i className="fas fa-id-card mr-2"></i>
                  Información Personal
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Nombre Completo</label>
                    <p className="text-gray-900 font-medium">{selectedUser.nombre}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Cargo</label>
                    <p className="text-gray-900 font-medium">{selectedUser.role}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Email</label>
                    <p className="text-gray-900 font-medium">{selectedUser.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Código</label>
                    <p className="text-gray-900 font-medium">{selectedUser.codigo}</p>
                  </div>
                </div>
              </div>

              {/* Información del Sistema */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center border-b pb-2">
                  <i className="fas fa-cog mr-2"></i>
                  Información del Sistema
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Rol</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedUser.role === 'admin' ? 'bg-red-500 text-white' : 
                      selectedUser.role === 'subadmin' ? 'bg-blue-500 text-white' : 
                      'bg-purple-500 text-white'
                    }`}>
                      {selectedUser.role === 'admin' ? 'Administrador' : 
                       selectedUser.role === 'subadmin' ? 'Sub-Administrador' : 
                       'Estudiante'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Estado</label>
                    <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                      Activo
                    </span>
                  </div>
                </div>
              </div>

              {/* Permisos (solo para subadmin) */}
              {selectedUser.role === 'subadmin' && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center border-b pb-2">
                    <i className="fas fa-key mr-2"></i>
                    Permisos de Acceso
                  </h4>
                  {permissions? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg flex items-center gap-3 ${permissions.includes("overview") ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                        <i className={`fas ${permissions.includes("dashboard")  ? 'fa-check-circle text-green-600' : 'fa-times-circle text-gray-400'} text-xl`}></i>
                        <div>
                          <div className="font-semibold text-sm">Dashboard</div>
                          <div className="text-xs text-gray-600">Panel Principal</div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg flex items-center gap-3 ${permissions.includes("users") ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                        <i className={`fas ${permissions.includes("usuarios")? 'fa-check-circle text-green-600' : 'fa-times-circle text-gray-400'} text-xl`}></i>
                        <div>
                          <div className="font-semibold text-sm">Usuarios</div>
                          <div className="text-xs text-gray-600">Gestión de Usuarios</div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg flex items-center gap-3 ${permissions.includes("scholarships") ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                        <i className={`fas ${permissions.includes("becarios") ? 'fa-check-circle text-green-600' : 'fa-times-circle text-gray-400'} text-xl`}></i>
                        <div>
                          <div className="font-semibold text-sm">Becas</div>
                          <div className="text-xs text-gray-600">Gestión de Becas</div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg flex items-center gap-3 ${permissions.includes("applications") ? 'bg-green-100 border border-green-200' :'bg-red-100 border border-red-200'}`}>
                        <i className={`fas ${permissions.includes("solicitudes") ? 'fa-check-circle text-green-600' : 'fa-times-circle text-gray-400'} text-xl`}></i>
                        <div>
                          <div className="font-semibold text-sm">Solicitudes</div>
                          <div className="text-xs text-gray-600">Revisar Solicitudes</div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded-lg flex items-center gap-3 ${permissions.includes("reportes") ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                        <i className={`fas ${permissions.includes("reportes") ? 'fa-check-circle text-green-600' : 'fa-times-circle text-gray-400'} text-xl`}></i>
                        <div>
                          <div className="font-semibold text-sm">Reportes</div>
                          <div className="text-xs text-gray-600">Reportes y Estadísticas</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        No se han configurado permisos para este usuario.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-md hover:shadow-lg">
                  <i className="fas fa-times mr-2"></i>Cerrar
                </button>
                <button 
                  className="flex-1 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all shadow-md hover:shadow-lg">
                  <i className="fas fa-edit mr-2"></i>Editar Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}
