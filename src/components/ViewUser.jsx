import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { CloseButton } from './common/Button';
import { StatusBadge, ROLE_CONFIG } from './common/StatusBadge';

export const ViewUser = ({ user, onClose }) => {
  return (
    <Modal title="Detalles del Usuario" onClose={onClose}>
      <ModalContent>
        <ContentGrid>
          <Section title="Información Personal">
            <InfoGrid>
              <InfoField label="Nombre" value={user.name} />
              <InfoField label="Cargo" value={user.position} />
              <InfoField label="Email" value={user.email} />
              <InfoField label="Teléfono" value={user.phone} />
            </InfoGrid>
          </Section>

          <Section title="Información de la Cuenta">
            <InfoGrid>
              <InfoField label="Usuario" value={user.username} />
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Rol:</span>
                <StatusBadge status={user.role} config={ROLE_CONFIG} />
              </div>
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Estado:</span>
                <StatusBadge status={user.status} />
              </div>
              <InfoField label="Creado" value={user.createdAt} />
            </InfoGrid>
          </Section>

          {user.permissions && (
            <Section title="Permisos">
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
            </Section>
          )}

          {user.recentActivity && (
            <Section title="Actividad Reciente">
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