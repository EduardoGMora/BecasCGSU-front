import { useState } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { FormField, TextAreaField } from './common/FormFields';
import { CancelButton, Button } from './common/Button';

export const EvaluateApplication = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    score: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      applicationId: application.id,
      date: new Date().toISOString()
    });
    onClose();
  };

  return (
    <Modal title="Evaluar Solicitud" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ContentGrid>
            <Section title="Información del Solicitante">
              <InfoGrid>
                <InfoField label="Nombre" value={application.name} />
                <InfoField label="Beca" value={application.scholarship} />
              </InfoGrid>
            </Section>

            <Section title="Evaluación">
              <div className="space-y-4">
                <FormField
                  label="Puntaje (0-100)"
                  name="score"
                  type="number"
                  value={formData.score}
                  onChange={handleChange}
                  required
                  className="min-0 max-100"
                />
                <TextAreaField
                  label="Comentarios"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese sus comentarios y observaciones sobre la solicitud..."
                  rows={6}
                />
              </div>
            </Section>

            <Section title="Criterios de Evaluación">
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>90-100: Cumple excepcionalmente con todos los requisitos</li>
                  <li>80-89: Cumple satisfactoriamente con los requisitos</li>
                  <li>70-79: Cumple con la mayoría de los requisitos</li>
                  <li>60-69: Cumple parcialmente con los requisitos</li>
                  <li>&lt;60: No cumple con los requisitos mínimos</li>
                </ul>
              </div>
            </Section>
          </ContentGrid>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose} />
          <Button type="submit" variant="primary">
            Guardar Evaluación
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};