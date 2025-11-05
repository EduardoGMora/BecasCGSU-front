import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ViewUser = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Detalles del Usuario</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon="fa-solid fa-times" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6">
            {/* Información personal */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información Personal</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Nombre:</span>
                  <span className="font-medium flex-1">{user.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Cargo:</span>
                  <span className="font-medium flex-1">{user.position}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Email:</span>
                  <span className="font-medium flex-1">{user.email}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Teléfono:</span>
                  <span className="font-medium flex-1">{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Información de la cuenta */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información de la Cuenta</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Usuario:</span>
                  <span className="font-medium flex-1">{user.username}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Rol:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex ${
                    user.role === 'admin' ? 'bg-red-500 text-white' :
                    user.role === 'evaluator' ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {user.role === 'admin' ? 'Administrador' :
                     user.role === 'evaluator' ? 'Evaluador' :
                     'Usuario'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Estado:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex ${
                    user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Creado:</span>
                  <span className="font-medium">{user.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Permisos */}
            {user.permissions && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Permisos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {user.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <FontAwesomeIcon 
                        icon={permission.granted ? "fa-solid fa-check" : "fa-solid fa-times"}
                        className={permission.granted ? "text-green-500" : "text-red-500"}
                      />
                      <span>{permission.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actividad reciente */}
            {user.recentActivity && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FontAwesomeIcon icon={activity.icon} className={`text-${activity.color}`} />
                      <div>
                        <div className="font-semibold">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};