import { useState } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { InfoField, Section, InfoGrid, ContentGrid } from './common/InfoComponents';
import { FormField, TextAreaField } from './common/FormFields';
import { CancelButton, Button } from './common/Button';

export const EvaluateApplication = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    academicScore: application.academicScore || '',
    economicScore: application.economicScore || '',
    motivationScore: application.motivationScore || '',
    comments: '',
    evaluator: 'Sistema' // TODO: Reemplazar con usuario actual del sistema
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
      academicScore: parseFloat(formData.academicScore),
      economicScore: parseFloat(formData.economicScore),
      motivationScore: parseFloat(formData.motivationScore)
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
                <InfoField label="Nombre" value={application.studentName} />
                <InfoField label="Beca" value={application.scholarship} />
                <InfoField label="ID" value={application.id} />
              </InfoGrid>
            </Section>

            <Section title="Criterios de Evaluación">
              <div className="space-y-4">
                <FormField
                  label="Desempeño Académico (0-10)"
                  name="academicScore"
                  type="number"
                  value={formData.academicScore}
                  onChange={handleChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                />
                <FormField
                  label="Situación Económica (0-10)"
                  name="economicScore"
                  type="number"
                  value={formData.economicScore}
                  onChange={handleChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                />
                <FormField
                  label="Carta de Motivación (0-10)"
                  name="motivationScore"
                  type="number"
                  value={formData.motivationScore}
                  onChange={handleChange}
                  required
                  min="0"
                  max="10"
                  step="0.1"
                />
                <TextAreaField
                  label="Comentarios"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese sus comentarios y observaciones sobre la solicitud..."
                  rows={4}
                />
              </div>
            </Section>

            <Section title="Ponderación">
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Desempeño Académico: 40%</li>
                  <li>Situación Económica: 35%</li>
                  <li>Carta de Motivación: 25%</li>
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