import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const EditUser = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    position: '',
    email: '',
    phone: '',
    username: '',
    role: 'user',
    status: 'active',
    permissions: [
      { name: 'Gestionar becas', granted: false },
      { name: 'Evaluar solicitudes', granted: false },
      { name: 'Gestionar usuarios', granted: false },
      { name: 'Ver reportes', granted: false }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (index) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.map((permission, i) => 
        i === index ? { ...permission, granted: !permission.granted } : permission
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {user ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            <button
              type="button"
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
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Nombre Completo
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Cargo
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Información de la cuenta */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Información de la Cuenta</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Nombre de Usuario
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  {!user && (
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Contraseña
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required={!user}
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Rol
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="user">Usuario</option>
                      <option value="evaluator">Evaluador</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Estado
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Permisos */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Permisos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {formData.permissions.map((permission, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => handlePermissionChange(index)}
                    >
                      <input
                        type="checkbox"
                        checked={permission.granted}
                        onChange={() => handlePermissionChange(index)}
                        className="w-4 h-4"
                      />
                      <span>{permission.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};