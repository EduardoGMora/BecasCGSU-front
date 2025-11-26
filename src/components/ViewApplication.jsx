import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { CloseButton } from './common/Button';
import { StatusBadge } from './common/StatusBadge';

export const ViewApplication = ({ application, onClose }) => {
  const totalScore = application.academicScore && application.economicScore && application.motivationScore
    ? ((application.academicScore + application.economicScore + application.motivationScore) / 3).toFixed(1)
    : 'Sin evaluar';

  return (
    <Modal title="Detalles de la Solicitud" onClose={onClose}>
      <ModalContent>
        <ContentGrid>
          <Section title="Información del Solicitante">
            <InfoGrid>
              <InfoField label="Nombre" value={application.studentName} />
              <InfoField label="ID Solicitud" value={application.id} />
              <InfoField label="Institución" value={application.institution} />
            </InfoGrid>
          </Section>

          <Section title="Información de la Beca">
            <InfoGrid>
              <InfoField label="Beca" value={application.scholarship} />
              <InfoField label="Monto" value={application.amount} valueClass="text-green-600" />
            </InfoGrid>
          </Section>

          <Section title="Estado de la Solicitud">
            <InfoGrid>
              <InfoField label="Fecha" value={application.applicationDate} />
              <div className="flex items-start">
                <span className="text-gray-600 w-32">Estado:</span>
                <StatusBadge status={application.status} />
              </div>
              <InfoField label="Puntaje" value={typeof totalScore === 'number' ? `${totalScore}/10` : totalScore} />
            </InfoGrid>
          </Section>

          {application.comments && (
            <Section title="Comentarios">
              <p className="text-gray-700">{application.comments}</p>
            </Section>
          )}

            {/* Documentos */}
            {application.documents?.length > 0 && (
              <Section title="Documentos Enviados">
                <div className="space-y-3">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-900" />
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label="Descargar documento"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-download" />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label="Ver documento"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-eye" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

          {application.evaluationHistory?.length > 0 && (
            <Section title="Historial de Evaluaciones">
              <div className="space-y-4">
                {application.evaluationHistory.map((evaluation, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{evaluation.evaluator}</span>
                        <span className="text-gray-600 text-sm ml-2">{evaluation.date}</span>
                      </div>
                      <span className="font-medium text-blue-600">{evaluation.action}</span>
                    </div>
                    <p className="text-gray-700">{evaluation.comments}</p>
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