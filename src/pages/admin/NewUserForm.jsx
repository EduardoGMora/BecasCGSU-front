import React from 'react'

export default function NewUserForm({newUser, setNewUser, handleCreateUser, setShowUserModal}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-xl font-bold text-white">
                <i className="fas fa-user-plus mr-2 text-white"></i>Nuevo Usuario
              </h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-2xl hover:text-gray-300 transition-colors">
                <i className="fas fa-times">x</i>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Información básica */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-user mr-2 text-blue-900"></i>Nombre 
                </label>
                <input 
                  type="text"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-envelope mr-2 text-blue-900"></i>Email
                </label>
                <input 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="usuario@alumnos.udg.mx"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-id-card mr-2 text-blue-900"></i>Código de Usuario
                  </label>
                  <input 
                    type="text"
                    value={newUser.codigo}
                    onChange={(e) => setNewUser({...newUser, codigo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="217471988"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-lock mr-2 text-blue-900"></i>Contraseña
                  </label>
                  <input 
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Rol */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-user-shield mr-2 text-blue-900"></i>Rol del Usuario
                </label>
                <select 
                  value={newUser.rol}
                  onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="admin">Administrador</option>
                  <option value="subadmin">Sub-Administrador</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {newUser.rol === 'admin' 
                    ? 'Acceso completo a todas las funcionalidades del sistema' 
                    : 'Acceso limitado según los permisos asignados'}
                </p>
              </div>

              {newUser.rol === 'subadmin' && (
                <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <i className="fas fa-key mr-2 text-blue-900"></i>
                    Permisos de Acceso
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Selecciona las áreas a las que este usuario tendrá acceso
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input 
                        type="checkbox"
                        checked={newUser.permisos.dashboard}
                        onChange={(e) => setNewUser({
                          ...newUser, 
                          permisos: {...newUser.permisos, dashboard: e.target.checked}
                        })}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          <i className="fas fa-chart-line mr-2 text-blue-900"></i>
                          Dashboard / Panel Principal
                        </div>
                        <div className="text-xs text-gray-600">Ver estadísticas y resúmenes generales</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input 
                        type="checkbox"
                        checked={newUser.permisos.usuarios}
                        onChange={(e) => setNewUser({
                          ...newUser, 
                          permisos: {...newUser.permisos, usuarios: e.target.checked}
                        })}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          <i className="fas fa-users mr-2 text-blue-900"></i>
                          Gestión de Usuarios
                        </div>
                        <div className="text-xs text-gray-600">Crear, editar y eliminar usuarios del sistema</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input 
                        type="checkbox"
                        checked={newUser.permisos.becarios}
                        onChange={(e) => setNewUser({
                          ...newUser, 
                          permisos: {...newUser.permisos, becarios: e.target.checked}
                        })}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          <i className="fas fa-user-graduate mr-2 text-blue-900"></i>
                          Gestión de Becarios
                        </div>
                        <div className="text-xs text-gray-600">Administrar información de becarios activos</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input 
                        type="checkbox"
                        checked={newUser.permisos.solicitudes}
                        onChange={(e) => setNewUser({
                          ...newUser, 
                          permisos: {...newUser.permisos, solicitudes: e.target.checked}
                        })}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          <i className="fas fa-file-alt mr-2 text-blue-900"></i>
                          Solicitudes
                        </div>
                        <div className="text-xs text-gray-600">Revisar y aprobar solicitudes de becas</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer hover:bg-blue-100 p-2 rounded transition-colors">
                      <input 
                        type="checkbox"
                        checked={newUser.permisos.reportes}
                        onChange={(e) => setNewUser({
                          ...newUser, 
                          permisos: {...newUser.permisos, reportes: e.target.checked}
                        })}
                        className="w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 accent-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-sm">
                          <i className="fas fa-chart-bar mr-2 text-blue-900"></i>
                          Reportes y Estadísticas
                        </div>
                        <div className="text-xs text-gray-600">Generar y descargar reportes del sistema</div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={handleCreateUser}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg">
                  <i className="fas fa-check mr-2"></i>Crear Usuario
                </button>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md hover:shadow-lg">
                  <i className="fas fa-times mr-2"></i>Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}
