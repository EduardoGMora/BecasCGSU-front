import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { CloseButton } from './common/Button';
import { StatusBadge } from './common/StatusBadge';

export const ScholarshipDetails = ({ scholarship, onClose }) => {
  return (
    <Modal title="Detalles de la Beca" onClose={onClose}>
      <ModalContent>
        <ContentGrid>
          <Section title="Información General">
            <InfoGrid>
              <InfoField label="Nombre" value={scholarship.name} />
              <InfoField label="Institución" value={scholarship.institution} />
              <InfoField label="Tipo" value={scholarship.type} />
              <InfoField label="Monto" value={scholarship.amount} className="text-green-600" />
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Estado:</span>
                <StatusBadge status={scholarship.status} />
              </div>
            </InfoGrid>
          </Section>

            {/* Requisitos */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Requisitos</h3>
              <div className="space-y-3">
                {scholarship.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-check" className="text-green-500" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentación requerida */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Documentación Requerida</h3>
              <div className="space-y-3">
                {scholarship.requiredDocuments?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-900" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

          <Section title="Fechas Importantes">
            <InfoGrid>
              <InfoField label="Inicio" value={scholarship.startDate} />
              <InfoField label="Cierre" value={scholarship.endDate} />
              <InfoField label="Resultados" value={scholarship.resultsDate} />
            </InfoGrid>
          </Section>
        </ContentGrid>
      </ModalContent>
      
      <ModalFooter>
        <CloseButton onClick={onClose} />
      </ModalFooter>
    </Modal>
  );
};