import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { CloseButton } from './common/Button';
import { StatusBadge, ROLE_CONFIG } from './common/StatusBadge';

export const ViewUser = ({ user, onClose }) => {
  const permissionsArray = user.permissions ? [
    { name: 'Gestionar becas', granted: user.permissions.manageScholarships },
    { name: 'Evaluar solicitudes', granted: user.permissions.evaluateApplications },
    { name: 'Gestionar usuarios', granted: user.permissions.manageUsers },
    { name: 'Ver reportes', granted: user.permissions.viewReports },
    { name: 'Exportar datos', granted: user.permissions.exportData }
  ] : [];

  return (
    <Modal title="Detalles del Usuario" onClose={onClose}>
      <ModalContent>
        <ContentGrid>
          <Section title="Información Personal">
            <InfoGrid>
              <InfoField label="Nombre" value={user.name} />
              <InfoField label="Email" value={user.email} />
              <InfoField label="Teléfono" value={user.phone} />
            </InfoGrid>
          </Section>

          <Section title="Información de la Cuenta">
            <InfoGrid>
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Rol:</span>
                <StatusBadge status={user.role} config={ROLE_CONFIG} />
              </div>
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Estado:</span>
                <StatusBadge status={user.status} />
              </div>
              <InfoField label="Registro" value={user.registrationDate} />
              <InfoField label="Último acceso" value={user.lastAccess} />
            </InfoGrid>
          </Section>

          {permissionsArray.length > 0 && (
            <Section title="Permisos">
              <div className="grid grid-cols-2 gap-3">
                {permissionsArray.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon 
                      icon={permission.granted ? "fa-solid fa-check" : "fa-solid fa-times"}
                      className={permission.granted ? "text-green-500" : "text-red-500"}
                    />
                    <span>{permission.name}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {user.recentActivity && user.recentActivity.length > 0 && (
            <Section title="Actividad Reciente">
              <div className="space-y-3">
                {user.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-clock" className="text-blue-600" />
                    <div>
                      <div className="font-semibold">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </ContentGrid>
      </ModalContent>
      
      <ModalFooter>
        <CloseButton onClick={onClose} />
      </ModalFooter>
    </Modal>
  );
};