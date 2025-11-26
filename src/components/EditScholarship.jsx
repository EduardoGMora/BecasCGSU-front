import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { Section } from './common/InfoComponents';
import { FormField, SelectField } from './common/FormFields';
import { CancelButton, SaveButton } from './common/Button';

const TYPE_OPTIONS = [
  { value: '', label: 'Seleccione un tipo' },
  { value: 'academic', label: 'Excelencia Académica' },
  { value: 'economic', label: 'Apoyo Económico' },
  { value: 'research', label: 'Investigación' },
  { value: 'sports', label: 'Deportiva' },
  { value: 'cultural', label: 'Cultural' }
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Activa' },
  { value: 'inactive', label: 'Inactiva' }
];

export const EditScholarship = ({ scholarship, onClose, onSave }) => {
  const [formData, setFormData] = useState(scholarship || {
    name: '',
    institution: '',
    type: '',
    amount: '',
    status: 'active',
    requirements: [],
    requiredDocuments: [],
    startDate: '',
    endDate: '',
    resultsDate: ''
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newDocument, setNewDocument] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument.trim()]
      }));
      setNewDocument('');
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      title={scholarship ? 'Editar Beca' : 'Nueva Beca'}
      onClose={onClose}
      size="max-w-2xl"
    >
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <Section title="Información General">
            <div className="grid gap-4">
              <FormField
                label="Nombre de la Beca"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="Institución"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
              />
              <SelectField
                label="Tipo de Beca"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={TYPE_OPTIONS}
                required
              />
              <FormField
                label="Monto"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
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

          <Section title="Requisitos">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Nuevo requisito"
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Agregar
                </button>
              </div>
              {formData.requirements?.map((req, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-1">{req}</span>
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Documentación Requerida">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Nuevo documento"
                />
                <button
                  type="button"
                  onClick={addDocument}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Agregar
                </button>
              </div>
              {formData.requiredDocuments?.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-1">{doc}</span>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Fechas Importantes">
            <div className="grid gap-4">
              <FormField
                label="Fecha de Inicio"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="Fecha de Cierre"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              <FormField
                label="Fecha de Resultados"
                name="resultsDate"
                type="date"
                value={formData.resultsDate}
                onChange={handleChange}
                required
              />
            </div>
          </Section>
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose} />
          <SaveButton type="submit" />
        </ModalFooter>
      </form>
    </Modal>
  );
};