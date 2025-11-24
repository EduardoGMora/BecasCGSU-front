import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { Section, ContentGrid } from './common/InfoComponents';
import { FormField, SelectField } from './common/FormFields';
import { CancelButton, SaveButton } from './common/Button';

const ROLE_OPTIONS = [
  { value: 'student', label: 'Estudiante' },
  { value: 'evaluator', label: 'Evaluador' },
  { value: 'admin', label: 'Administrador' }
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' }
];

export const EditUser = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    phone: '',
    role: 'student',
    status: 'active',
    permissions: {
      manageScholarships: false,
      evaluateApplications: false,
      manageUsers: false,
      viewReports: false,
      exportData: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionKey) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionKey]: !prev.permissions[permissionKey]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal title={user ? 'Editar Usuario' : 'Nuevo Usuario'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ContentGrid>
            <Section title="Información Personal">
              <div className="grid gap-4">
                <FormField
                  label="Nombre Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </Section>

            <Section title="Información de la Cuenta">
              <div className="grid gap-4">
                {!user && (
                  <FormField
                    label="Contraseña"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required={!user}
                  />
                )}
                <SelectField
                  label="Rol"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={ROLE_OPTIONS}
                  required
                />
                <SelectField
                  label="Estado"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={STATUS_OPTIONS}
                  required
                />
              </div>
            </Section>

            <Section title="Permisos">
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePermissionChange('manageScholarships')}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.manageScholarships}
                    onChange={() => handlePermissionChange('manageScholarships')}
                    className="w-4 h-4"
                  />
                  <span>Gestionar becas</span>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePermissionChange('evaluateApplications')}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.evaluateApplications}
                    onChange={() => handlePermissionChange('evaluateApplications')}
                    className="w-4 h-4"
                  />
                  <span>Evaluar solicitudes</span>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePermissionChange('manageUsers')}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.manageUsers}
                    onChange={() => handlePermissionChange('manageUsers')}
                    className="w-4 h-4"
                  />
                  <span>Gestionar usuarios</span>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePermissionChange('viewReports')}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.viewReports}
                    onChange={() => handlePermissionChange('viewReports')}
                    className="w-4 h-4"
                  />
                  <span>Ver reportes</span>
                </div>
                <div 
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handlePermissionChange('exportData')}
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.exportData}
                    onChange={() => handlePermissionChange('exportData')}
                    className="w-4 h-4"
                  />
                  <span>Exportar datos</span>
                </div>
              </div>
            </Section>
          </ContentGrid>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SaveButton type="submit" />
        </ModalFooter>
      </form>
    </Modal>
  );
};