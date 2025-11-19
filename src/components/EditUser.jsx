import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { Section, ContentGrid } from './common/InfoComponents';
import { FormField, SelectField } from './common/FormFields';
import { CancelButton, SaveButton } from './common/Button';

const ROLE_OPTIONS = [
  { value: 'user', label: 'Usuario' },
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
                  label="Cargo"
                  name="position"
                  value={formData.position}
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
                <FormField
                  label="Nombre de Usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
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